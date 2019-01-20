import axios from 'axios'
import { Dispatch } from 'redux'
import { get } from 'lodash-es'
import { API_URL } from '~constants'
import { patterns } from '~utils/regExp'
import { errorsMapCreator } from '~utils/testHelper'

export enum requestTypes {
  GET_REQUEST = 'GET_REQUEST',
  POST_REQUEST = 'POST_REQUEST',
  PUT_REQUEST = 'PUT_REQUEST',
  DELETE_REQUEST = 'DELETE_REQUEST',
  PATCH_REQUEST = 'PATCH_REQUEST',
}

export enum requestStatuses {
  REQUEST = '_REQUEST',
  SUCCESS = '_SUCCESS',
  FAIL = '_FAIL',
}

export function axiosInitialization({ token }) {
  axios.defaults.baseURL = API_URL
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

interface IAction {
  type: string
  requestType: requestTypes
  requestUrl: string
  headers?: object
  resultField?: string
  callbacks?: { successful?: ({ payload }) => any; unfortunate?: ({ errors }) => any }
  //TODO: the fields work with array, but it's incorrectly
  sendObject?: { [key: string]: any }
  meta?: object
}

export function requestCreator(dispatch: Dispatch, action: IAction) {
  const { type, requestType, requestUrl, resultField = 'data', headers = {}, sendObject, meta, callbacks = {} } = action
  const { getError } = requestCreator

  if (!type) throw new Error(getError({ type }))
  if (!Object.values(requestTypes).some(t => t === requestType)) throw new Error(getError({ requestType }))
  if (!patterns.url.test(requestUrl)) throw new Error(getError({ requestUrl }))
  if (callbacks.successful && typeof callbacks.successful !== 'function')
    throw new Error(getError({ 'callbacks.successful': callbacks.successful }))
  if (callbacks.unfortunate && typeof callbacks.unfortunate !== 'function')
    throw new Error(getError({ 'callbacks.unfortunate': callbacks.unfortunate }))

  dispatch({ type: type + requestStatuses.REQUEST, meta })
  let method: 'get' | 'post' | 'put' | 'delete' | 'patch', data, params
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
      throw new Error(`${requestType} is unknown request type`)
  }
  return axios({ method, url: requestUrl, data, params, headers })
    .then(result => {
      const payload = get(result, resultField, result)
      dispatch({ type: type + requestStatuses.SUCCESS, payload, meta })
      if (typeof callbacks.successful === 'function') callbacks.successful({ payload })
      return {result}
    })
    .catch(errors => {
      dispatch({ type: type + requestStatuses.FAIL, errors, meta })
      if (typeof callbacks.unfortunate === 'function') callbacks.unfortunate({ errors })
      return {errors }
    })
}

requestCreator.getError = errorsMapCreator([
  ['type', v => `${v} is incorrect action type`],
  ['requestType', v => `${v} is unknown request type`],
  ['requestUrl', v => `${v} is incorrect url`],
  ['callbacks.successful', v => `${v} is not function`],
  ['callbacks.unfortunate', v => `${v} is not function`],
])
