import produce from 'immer'
import { requestStatuses } from '~utils/request-creator'
import { normalizeEntity } from '~utils/normalize'
import { removeElement } from '~utils/immutable'

const { USERS_GET, USER_DELETE, USER_CREATE } = require('./constants').default
const initialState = {
  data: {},
  list: [],
}

export default produce((state = initialState, { type, payload = {}, toReducer = {} }) => {
  switch (type) {
    case USERS_GET + requestStatuses.SUCCESS: {
      return { ...state, ...normalizeEntity({ data: payload.users, key: 'userId' }) }
    }

    case USER_DELETE + requestStatuses.SUCCESS: {
      const { userId } = toReducer
      const { [userId]: temp, ...data } = state.data
      return {
        ...state,
        data,
        list: removeElement({ arr: state.list, value: userId }),
      }
    }

    case USER_CREATE + requestStatuses.SUCCESS: {
      const id = payload
      state.data[id].meta = toReducer.user
      state.data[id].updated = Date.now()
      state.list.push(id)
      break
    }

    default:
      return state
  }
})
