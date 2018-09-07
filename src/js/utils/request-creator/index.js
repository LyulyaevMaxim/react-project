import axios from 'axios'
import {
  REQUEST,
  SUCCESS,
  FAIL,
  GET_REQUEST,
  POST_REQUEST,
  PUT_REQUEST,
  DELETE_REQUEST,
  API_URL,
} from '~constants'

export function axiosInitialization({ token }) {
  axios.defaults.baseURL = API_URL
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export async function requestCreator(dispatch, action) {
  const {
    type,
    requestType,
    requestUrl: url,
    resultField = 'body',
    headers = {},
    sendObject,
    toReducer,
    callbacks = {},
  } = action

  dispatch({ type: type + REQUEST, toReducer })

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

    default: {
      throw new Error(`${requestType} is unknown request type`)
    }
  }

  return await axios({ method, url, data, params, headers })
    .then(result => {
      dispatch({ type: type + SUCCESS, payload: result[resultField], toReducer })
      typeof callbacks.successful === 'function' &&
        callbacks.successful({ payload: result[resultField] })
      return result || true
    })
    .catch(errors => {
      dispatch({ type: type + FAIL, errors, toReducer })
      typeof callbacks.unfortunate === 'function' && callbacks.unfortunate({ errors })
      return errors || false
    })
}
