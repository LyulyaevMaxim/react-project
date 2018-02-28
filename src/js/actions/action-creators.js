import { REQUEST, SUCCESS, FAIL, GET_REQUEST, POST_REQUEST } from '../constants'
import agent from 'superagent'

export const requestCreator = (dispatch, action) => {
	const { type, requestType, API_URL, auth, sendObject, other } = action

	dispatch({
		type: type + REQUEST
	})

	if (requestType === POST_REQUEST)
		return agent
			.post(API_URL)
			.type('application/json')
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
					error: error.message
				})
			})

	if (requestType === GET_REQUEST)
		return agent
		.get(API_URL)
		.accept('application/json')
		.set('Authorization', auth)
		.query(sendObject)
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
				error: error.message
			})
		})

}
