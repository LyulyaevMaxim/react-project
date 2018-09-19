import { SUCCESS } from '~constants'
import { USERS_GET, USER_DELETE, USER_CREATE } from './constants'
import { normalizeEntity } from '~utils/normalize'
import { removeElement } from '~utils/immutable'

const initialState = {
  data: {},
  list: [],
}

export default (state = initialState, { type, payload = {}, other = {} }) => {
  switch (type) {
    case USERS_GET + SUCCESS: {
      return { ...state, ...normalizeEntity({ data: payload.users, key: 'userId' }) }
    }

    case USER_DELETE + SUCCESS: {
      const { userId } = other
      const { [userId]: temp, ...data } = state.data
      return {
        ...state,
        data,
        list: removeElement({ arr: state.list, value: userId }),
      }
    }

    case USER_CREATE + SUCCESS: {
      const id = payload
      return {
        ...state,
        data: {
          ...state.data,
          [id]: {
            ...state.data[id],
            meta: {
              ...other.user,
            },
            updated: Date.now(),
          },
        },
        list: [...state.list, id],
      }
    }

    default: {
      return state
    }
  }
}
