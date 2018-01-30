import { AUTH_SET } from '../constants'

const initialState = {
	loadingToken: null,
	token: ''
}

export default (state = initialState, action) => {
	const { type, token } = action

	switch (type) {
		case AUTH_SET:
			return { ...state, loadingToken: false, token }

		default:
			return state
	}
}
