import { requestCreator } from '~utils/request-creator'
import { GET_REQUEST, POST_REQUEST, CACHE } from '~constants'
import {USER_GET_DATA, USER_UPDATE} from './constants.json'

export function UserGetData({cache}) {
  if (cache) return { type: USER_GET_DATA + CACHE, payload: { uuid } }
	return (dispatch, getState) =>
		requestCreator(dispatch, {
			type: USER_GET_DATA,
			requestUrl: '/userapi/user/get',
			requestType: GET_REQUEST,
			headers: { 'X-Authorization': getState().auth.extraToken },
			resultField: 'data',
			sendObject: { mode: 'dev' }
		})
}

export function UserUpdate({ login, password }, {cache}) {
	return (dispatch, getState) =>
		requestCreator(dispatch, {
			type: USER_UPDATE,
			requestUrl: '/userapi/user/update',
			requestType: POST_REQUEST,
			sendObject: { login, password }
		})
}
