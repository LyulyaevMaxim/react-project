import { API_URL, AUTH_SET, REQUEST, SUCCESS, ERROR } from '~constants'

export function setAuthorization({token}) {
	return {
		type: AUTH_SET,
		payload: token
	}
}
