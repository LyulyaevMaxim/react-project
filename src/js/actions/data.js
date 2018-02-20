import { requestCreator } from './action-creators'
import { API_URL } from '~constants'

export function getData({ token }) {
	return async dispatch => {
		return requestCreator(dispatch, {
			type: 'GET_DATA',
			requestType: 'get',
			API_URL: `${API_URL}/getData`,
			auth: `Bearer ${token}`
		})
	}
}
