import { AUTH_SET, REQUEST, SUCCESS, FAIL } from '~constants'

const initialState = {
	loadingToken: null,
	token: '',
	extraToken: '',
	error: ''
}

export default (state = initialState, { type, payload = {} }) => {
	const { token, extraToken,  error } = payload

	switch (type) {
		case AUTH_SET + SUCCESS: {
			return { ...state, loadingToken: false, token, extraToken, error: '' }
		}

		case AUTH_SET + FAIL: {
			return { ...state, loadingToken: null, token: '', extraToken: '', error }
		}

		default: {
			return state
		}
	}
}
