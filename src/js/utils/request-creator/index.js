import axios from 'axios'
import { get, has } from 'lodash'
import { API_URL } from '~constants'
import { patterns } from '~utils/regExp'

export const requestTypes = {
  GET_REQUEST: 'GET_REQUEST',
  POST_REQUEST: 'POST_REQUEST',
  PUT_REQUEST: 'PUT_REQUEST',
  DELETE_REQUEST: 'DELETE_REQUEST',
  PATCH_REQUEST: 'PATCH_REQUEST',
}

export const requestStatuses = {
  REQUEST: '_REQUEST',
  SUCCESS: '_SUCCESS',
  FAIL: '_FAIL',
}

export const getError = (field = {}) =>
  [
    ['type', v => `${v} is incorrect action type`],
    ['requestType', v => `${v} is unknown request type`],
    ['requestUrl', v => `${v} is incorrect url`],
    ['callbacks.successful', v => `${v} is not function`],
    ['callbacks.unfortunate', v => `${v} is not function`],
  ].forEach((fieldName, getText) => has(field, fieldName) && getText(field[fieldName]))

export function axiosInitialization({ token }) {
  axios.defaults.baseURL = API_URL
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

export function requestCreator(dispatch, action) {
  const { type, requestType, requestUrl, resultField = 'data', headers = {}, sendObject, meta, callbacks = {} } = action

  if (!type) throw new Error(getError({ type }))
  if (!Object.values(requestTypes).some(type => type === requestType)) throw new Error(getError({ requestType }))
  if (!patterns.url.test(requestUrl)) throw new Error(getError({ requestUrl }))
  if (callbacks.successful && typeof callbacks.successful !== 'function')
    throw new Error(getError({ 'callbacks.successful': callbacks.successful }))
  if (callbacks.unfortunate && typeof callbacks.unfortunate !== 'function')
    throw new Error(getError({ 'callbacks.unfortunate': callbacks.unfortunate }))

  dispatch({ type: type + requestStatuses.REQUEST, meta })

  let method, data, params
  switch (requestType) {
    case requestTypes.GET_REQUEST: {
      method = 'get'
      params = sendObject
      break
    }
    case requestTypes.POST_REQUEST: {
      method = 'post'
      data = sendObject
      break
    }
    case requestTypes.PUT_REQUEST: {
      method = 'put'
      data = sendObject
      break
    }
    case requestTypes.DELETE_REQUEST: {
      method = 'delete'
      params = sendObject
      break
    }
    case requestTypes.PATCH_REQUEST: {
      method = 'patch'
      data = sendObject
      break
    }
    default:
      break
  }

  return axios({ method, url: requestUrl, data, params, headers })
    .then(result => {
      const payload = get(result, resultField, result)
      dispatch({ type: type + requestStatuses.SUCCESS, payload, meta })
      typeof callbacks.successful === 'function' && callbacks.successful({ payload })
      return result || true
    })
    .catch(errors => {
      dispatch({ type: type + requestStatuses.FAIL, errors, meta })
      typeof callbacks.unfortunate === 'function' && callbacks.unfortunate({ errors })
      return errors || false
    })
}
