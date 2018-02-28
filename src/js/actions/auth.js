import { API_URL, AUTH_SET, REQUEST, SUCCESS, FAIL } from '~constants'

export function setAuthorization({ token }) {
	if (!token.length)
		return {
			type: AUTH_SET + FAIL,
			error: 'Отсутствует токен авторизации'
		}

	return {
		type: AUTH_SET + SUCCESS,
		payload: { token }
	}
}
