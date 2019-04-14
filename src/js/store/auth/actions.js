import { LOCAL_STORAGE_NAME } from '~constants'
import { axiosInitialization, requestStatuses } from '~utils/request-creator'

const { AUTH_SET, AUTH_RESET } = require('./constants').default

export function setAuthorization({ token = '', extraToken = '' }) {
  return dispatch => {
    dispatch({ type: AUTH_SET + requestStatuses.REQUEST })

    const localData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME))
    let object = { token, extraToken }
    if ((!token.length || !extraToken.length) && !Object.is(localData, null)) {
      object = { ...localData }
    }

    if (object.token.length) {
      axiosInitialization({ ...object })
      dispatch({ type: AUTH_SET + requestStatuses.SUCCESS, payload: object })
    } else {
      dispatch({ type: AUTH_SET + requestStatuses.FAIL, error: 'Отсутствует токен авторизации' })
    }
  }
}

export function resetAuthorization() {
  return dispatch => {
    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify({ token: '', extraToken: '', isRegistered: false }))
    dispatch({ type: AUTH_RESET })
  }
}
