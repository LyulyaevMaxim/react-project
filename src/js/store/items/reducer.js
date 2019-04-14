import produce from 'immer'
import { requestStatuses } from '~utils/request-creator'
import { normalizeEntity } from '~utils/normalize'

const { ITEMS_GET_QUANTITY, ITEMS_GET } = require('./constants').default

const initialState = {
  data: {},
  intoShops: {},
  storeId: '',
}

export default produce((state = initialState, { type, payload = {}, other = {} }) => {
  switch (type) {
    case ITEMS_GET_QUANTITY + requestStatuses.SUCCESS: {
      state.lastUpdate = payload.date
      state.quantityItems = payload.res.count
      break
    }

    case ITEMS_GET + requestStatuses.REQUEST: {
      const { storeId } = other
      state.storeId = storeId
      state.intoShops[storeId].loadingItems = true
      break
    }

    case ITEMS_GET + requestStatuses.SUCCESS: {
      const { storeId } = other
      const { count, items, offset } = payload.res
      const { data, list: normalizeList } = normalizeEntity({ data: items, key: 'articul' })

      let list
      if (!state.intoShops[storeId].list) {
        list = normalizeList
        list.length = count
      } else {
        list = [
          ...state.intoShops[storeId].list.slice(0, offset),
          ...normalizeList,
          ...state.intoShops[storeId].list.slice(offset + normalizeList.length, count),
        ]
      }

      state.data = { ...state.data, ...data }
      state.intoShops[storeId].loadingItems = false
      state.intoShops[storeId].quantityItems = count
      state.intoShops[storeId].list = list
      break
    }

    default:
      return state
  }
})
