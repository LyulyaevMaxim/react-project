import { AUTH_SET, AUTH_RESET, REQUEST, SUCCESS, FAIL, LOCAL_STORAGE_NAME } from '~constants'
import { axiosInitialization } from './action-creators'

export function setAuthorization({ token, extraToken }) {
	return dispatch => {
		dispatch({
			type: AUTH_SET + REQUEST
		})

		const localData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME))

		const obj = Object.is(localData, null)
			? { token, extraToken, isRegistered: false }
			: { ...localData }

		if (obj.token.length) {
			axiosInitialization({ ...obj })
			dispatch({
				type: AUTH_SET + SUCCESS,
				payload: obj
			})
		} else {
			dispatch({
				type: AUTH_SET + FAIL,
				error: 'Отсутствует токен авторизации'
			})
		}
	}
}

export function resetAuthorization() {
	return dispatch => {
		localStorage.setItem(
			LOCAL_STORAGE_NAME,
			JSON.stringify({ token: '', extraToken: '', isRegistered: false })
		)
		dispatch({ type: AUTH_RESET })
	}
}
