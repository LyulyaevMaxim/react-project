import { REQUEST, SUCCESS, FAIL, CACHE } from '~constants'
import { ITEMS_GET_QUANTITY, ITEMS_GET } from './constants'
import { normalizeEntity } from '~utils/normalize'

const initialState = {
  data: {},
  intoShops: {},
  storeId: '',
}

export default (state = initialState, { type, payload = {}, other = {} }) => {
  // const { error } = payload

  switch (type) {
    case ITEMS_GET_QUANTITY + SUCCESS: {
      return { ...state, lastUpdate: payload.date, quantityItems: payload.res.count }
    }

    case ITEMS_GET + REQUEST: {
      const { storeId } = other
      return {
        ...state,
        storeId: storeId,
        intoShops: {
          ...state.intoShops,
          [storeId]: {
            ...state.intoShops[storeId],
            loadingItems: true,
          },
        },
      }
    }

    case ITEMS_GET + SUCCESS: {
      const { storeId } = other
      const { count, items, limit, offset } = payload.res
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

      return {
        ...state,
        data: { ...state.data, ...data },
        intoShops: {
          ...state.intoShops,
          [storeId]: {
            ...state.intoShops[storeId],
            loadingItems: false,
            quantityItems: count,
            list,
          },
        },
      }
    }

    default: {
      return state
    }
  }
}
