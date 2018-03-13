import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { REQUEST, SUCCESS, FAIL } from '~constants'

function fetchUser() {
	console.log('fetchUser')
}

// worker Saga: будет запускаться на экшены типа `USER_FETCH_REQUESTED`
function* fetchUser(action) {
	console.log('fetchUser: ', action)
	try {
		const user = yield call(fetchUser, action.payload.userId)
		yield put({ type: 'USER_FETCH' + SUCCESS, user })
	} catch (e) {
		yield put({ type: 'USER_FETCH' + FAIL, message: e.message })
	}
}

// Запускаем `fetchUser` на каждый задиспатченый экшен `USER_FETCH_REQUESTED`.
// Позволяет одновременно получать данные пользователей.
function* mySaga() {
	yield takeEvery('USER_FETCH' + REQUEST, fetchUser)

	// В качестве альтернативы можно использовать `takeLatest`.
	// Не допускает одновременное получение данных пользователей. Если `USER_FETCH_REQUESTED`
	// диспатчится в то время когда предыдущий запрос все еще находится в ожидании ответа,
	// то этот ожидающий ответа запрос отменяется и срабатывает только последний.
	/* yield takeLatest("USER_FETCH_REQUESTED", fetchUser) */
}

export default mySaga
