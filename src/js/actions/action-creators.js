import { REQUEST, SUCCESS, FAIL } from '../constants'
import agent from 'superagent'

export const requestCreator = (dispatch, action) => {
	const { type, requestType, API_URL, auth, sendObject, other } = action

	dispatch({
		type: type + REQUEST
	})

	if (requestType === 'post')
		return agent
		.post(API_URL)
		.set('Authorization', auth)
		.send(sendObject)
		.then(result => {
			if (result.error) throw new Error(result.error.msg)
			return new Promise(function(resolve, reject) {
				dispatch({
					type: type + SUCCESS,
					payload: result.body,
					other
				})
				resolve(result.body)
			})
		})
		.catch(error => {
			dispatch({
				type: type + FAIL,
				errorMessage: error.message
			})
		})

	if (requestType === 'get')
		return agent
		.get(API_URL)
		.set('Authorization', auth)
		.then(result => {
			if (result.error) throw new Error(result.error.msg)
			return new Promise(function(resolve, reject) {
				dispatch({
					type: type + SUCCESS,
					payload: result.body,
					other
				})
				resolve(result.body)
			})
		})
		.catch(error => {
			dispatch({
				type: type + FAIL,
				errorMessage: error.message
			})
		})
}
