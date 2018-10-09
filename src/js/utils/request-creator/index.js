import axios from 'axios'
import { get } from 'lodash'
import { API_URL } from '~constants'

export const REQUEST = '_REQUEST'
export const SUCCESS = '_SUCCESS'
export const FAIL = '_FAIL'

export const GET_REQUEST = 'GET_REQUEST'
export const POST_REQUEST = 'POST_REQUEST'
export const PUT_REQUEST = 'PUT_REQUEST'
export const DELETE_REQUEST = 'DELETE_REQUEST'
export const PATCH_REQUEST = 'PATCH_REQUEST'

export function axiosInitialization({ token }) {
  axios.defaults.baseURL = API_URL
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

export function requestCreator(dispatch, action) {
  const {
    type,
    requestType,
    requestUrl: url,
    resultField = 'data',
    headers = {},
    sendObject,
    meta,
    callbacks = {},
  } = action

  dispatch({ type: type + REQUEST, meta })

  let method, data, params
  switch (requestType) {
    case GET_REQUEST: {
      method = 'get'
      params = sendObject
      break
    }
    case POST_REQUEST: {
      method = 'post'
      data = sendObject
      break
    }
    case PUT_REQUEST: {
      method = 'put'
      data = sendObject
      break
    }
    case DELETE_REQUEST: {
      method = 'delete'
      params = sendObject
      break
    }
    case PATCH_REQUEST: {
      method = 'patch'
      data = sendObject
      break
    }

    default: {
      throw new Error(`${requestType} is unknown request type`)
    }
  }

  return axios({ method, url, data, params, headers })
    .then(result => {
      const payload = get(result, resultField, result)
      dispatch({ type: type + SUCCESS, payload, meta })
      typeof callbacks.successful === 'function' && callbacks.successful({ payload })
      return result || true
    })
    .catch(errors => {
      dispatch({ type: type + FAIL, errors, meta })
      typeof callbacks.unfortunate === 'function' && callbacks.unfortunate({ errors })
      return errors || false
    })
}
