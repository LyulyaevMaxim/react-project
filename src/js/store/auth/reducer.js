import { LOCAL_STORAGE_NAME } from '~constants'
import { requestStatuses } from '~utils/request-creator'
const { AUTH_SET } = require('./constants').default

const initialState = {
  loadingToken: null,
  isRegistered: null,
  token: '',
  extraToken: '',
  error: '',
}

export default (state = initialState, { type, payload = {} }) => {
  const { token, extraToken, isRegistered, error } = payload

  switch (type) {
    case AUTH_SET + requestStatuses.REQUEST: {
      return { ...state, loadingToken: true }
    }

    case AUTH_SET + requestStatuses.SUCCESS: {
      localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify({ token, extraToken, isRegistered }))

      return { ...state, loadingToken: false, token, extraToken, isRegistered, error: '' }
    }

    case AUTH_SET + requestStatuses.FAIL: {
      return { ...state, loadingToken: null, token: '', extraToken: '', error }
    }

    default:
      return state
  }
}
