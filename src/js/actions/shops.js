import { requestCreator } from './action-creators'
import { API_URL, GET_REQUEST, CACHE, GET_SHOPS, GET_PRODUCTS } from '~constants'

export function getShops({ token }) {
	return async dispatch => {
		return requestCreator(dispatch, {
			type: GET_SHOPS,
			requestType: GET_REQUEST,
			API_URL: `${API_URL}/cloud/getShops`,
			auth: `Bearer ${token}`
		})
	}
}

export function getPositions({ token, uuid, cache }) {
	if (cache) return { type: GET_PRODUCTS + CACHE, payload: { uuid } }
	return async dispatch => {
		return requestCreator(dispatch, {
			type: GET_PRODUCTS,
			requestType: GET_REQUEST,
			API_URL: `${API_URL}/cloud/getPositions`,
			sendObject: { store: uuid },
			other: { shopUuid: uuid },
			auth: `Bearer ${token}`
		})
	}
}
