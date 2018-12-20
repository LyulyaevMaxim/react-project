import produce from 'immer'
import { requestStatuses } from '~utils/request-creator'
import { normalizeEntity } from '~utils/normalize'
import { removeElement } from '~utils/immutable'

const { ROLES_GET, ROLE_CREATE, ROLE_DELETE, ROLE_UPDATE } = require('./constants').default
const initialState = {
  loadingRoles: null,
  data: {},
  list: [],
}

export default produce((state = initialState, { type, payload = {}, toReducer = {} }) => {
  switch (type) {
    case ROLES_GET + requestStatuses.REQUEST: {
      state.loadingRoles = true
      break
    }

    case ROLES_GET + requestStatuses.SUCCESS: {
      const { data, list } = normalizeEntity({ data: payload, key: 'roleId' })
      state.loadingRoles = false
      state.data = { ...state.data, ...data }
      state.list = list
      break
    }

    case ROLE_CREATE + requestStatuses.SUCCESS: {
      const roleId = payload
      state.list.push(roleId)
      state.data[roleId] = toReducer.role
      break
    }

    case ROLE_DELETE + requestStatuses.SUCCESS: {
      state.list = removeElement({ arr: state.list, value: toReducer.roleId })
      break
    }

    case ROLE_UPDATE + requestStatuses.SUCCESS: {
      const { role } = toReducer
      state.data[role.roleId] = { ...state.data[role.roleId], ...role }
      break
    }

    default:
      return state
  }
})
