import { REQUEST, SUCCESS, FAIL, GET_REQUEST, POST_REQUEST, API_URL } from '../constants'
import axios from 'axios'

export function axiosInitialization({ token }) {
	axios.defaults.baseURL = API_URL
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export async function requestCreator(dispatch, action) {
	const { type, requestType, requestUrl: url, sendObject, other } = action

	dispatch({ type: type + REQUEST })

	let method, data, params
	switch (requestType) {
		case GET_REQUEST: {
			method = 'get'
			params = { ...sendObject }
			break
		}
		case POST_REQUEST: {
			method = 'post'
			data = { ...sendObject }
			break
		}

		default: {
			console.log('Неизвестный тип запроса')
			return
		}
	}

	await axios({ method, url, data, params })
		.then(result => dispatch({ type: type + SUCCESS, payload: result.body, other }))
		.catch(error => dispatch({ type: type + FAIL, error: error.message }))
}
