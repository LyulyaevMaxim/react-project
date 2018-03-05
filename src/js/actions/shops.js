import { requestCreator } from './action-creators'
import { API_URL, GET_REQUEST, CACHE, GET_SHOPS, GET_PRODUCTS } from '~constants'

export function getShops() {
	return dispatch =>
		requestCreator(dispatch, {
			type: GET_SHOPS,
			requestType: GET_REQUEST,
			requestUrl: '/cloud/getShops'
		})
}

export function getPositions({ uuid, cache }) {
	if (cache) return { type: GET_PRODUCTS + CACHE, payload: { uuid } }
	return dispatch =>
		requestCreator(dispatch, {
			type: GET_PRODUCTS,
			requestType: GET_REQUEST,
			requestUrl: '/cloud/getPositions',
			sendObject: { store: uuid },
			other: { shopUuid: uuid }
		})
}
