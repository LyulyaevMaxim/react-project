import produce from 'immer'
import { requestStatuses } from '~utils/request-creator'
import { normalizeEntity } from '~utils/normalize'
import { removeElement } from '~utils/immutable'

const { PROMOTION_GET, PROMOTION_CREATE, PROMOTION_DELETE } = require('./constants').default

const initialState = { data: {}, list: [] }

export default produce((state = initialState, { type, payload = {}, toReducer = {} }) => {
  switch (type) {
    case PROMOTION_GET + requestStatuses.SUCCESS: {
      const { data, list } = normalizeEntity({ data: payload.promotions, key: 'promotionId' })
      list.forEach(promotionId => {
        if (promotionId in state.data) {
          state.data[promotionId] = { ...state.data[promotionId], ...data[promotionId] }
        } else {
          state.list.push(promotionId)
          state.data[promotionId] = data[promotionId]
        }
      })
      break
    }

    case PROMOTION_CREATE + requestStatuses.SUCCESS: {
      const promotionId = payload
      state.list.push(promotionId)
      state.data[promotionId] = toReducer.promotion
      break
    }

    case PROMOTION_DELETE + requestStatuses.SUCCESS: {
      state.list = removeElement({ arr: state.list, value: toReducer.promotionId })
      break
    }

    default: {
      return state
    }
  }
})
