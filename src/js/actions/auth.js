import { AUTH_SET, REQUEST, SUCCESS, FAIL } from '~constants'
import { axiosInitialization } from './action-creators'

export function setAuthorization({ token }) {
	return dispatch => {
		if (!token.length)
			dispatch({
				type: AUTH_SET + FAIL,
				error: 'Отсутствует токен авторизации'
			})

		axiosInitialization({ token })
		dispatch({
			type: AUTH_SET + SUCCESS,
			payload: { token }
		})
	}
}