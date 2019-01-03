import produce from 'immer'
import * as Types from '~types/index'
/*import { requestStatuses } from '~utils/request-creator'*/
/*import { paymentTypes, productGroups, productsData } from './fakeData'*/

export interface IState {
  readonly isLoadProducts: Types.TLoadingFlag
  isSaveRun: Types.TLoadingFlag
  list: number[]
  data: object
  unsavedList: number[]
  unsavedData: object
  productGroups: { options: string[]; optionsMap: object; isLoad: Types.TLoadingFlag }
  paymentTypes: { options: string[]; optionsMap: object; isLoad: Types.TLoadingFlag }
}

enum ActionTypes {
  /* PRODUCTS_FETCH, PRODUCT_ADD, PRODUCT_DELETE, PRODUCTS_SAVE, PRODUCTS_CREATE, PRODUCTS_UPDATE, PRODUCT_GROUPS_FETCH, PAYMENT_TYPES_FETCH, */
  PRODUCTS_FETCH_REQUEST = 'PRODUCTS_FETCH_REQUEST',
  PRODUCTS_FETCH_SUCCESS = 'PRODUCTS_FETCH_SUCCESS',
}

interface IAction {
  readonly type: ActionTypes.PRODUCTS_FETCH_REQUEST | ActionTypes.PRODUCTS_FETCH_SUCCESS
  readonly payload?: object
  readonly meta?: object
}

const initialState: IState = {
  isLoadProducts: null,
  isSaveRun: null,
  list: [],
  data: {},
  unsavedList: [],
  unsavedData: {},
  productGroups: { options: [], optionsMap: {}, isLoad: null },
  paymentTypes: { options: [], optionsMap: {}, isLoad: null },
}

export default function(state: IState = initialState, action: IAction): IState {
  switch (action.type) {
    case ActionTypes.PRODUCTS_FETCH_REQUEST /* PRODUCTS_FETCH + requestStatuses.REQUEST */: {
      /*state.isLoadProducts = true check for immer */
      return { ...state, isLoadProducts: true }
    }

    case ActionTypes.PRODUCTS_FETCH_SUCCESS /* PRODUCTS_FETCH + requestStatuses.SUCCESS */: {
      /* const normalizedProducts = productsNormalize({ products: payload })
         state.data = normalizedProducts.data
         state.list = normalizedProducts.list */
      return { ...state, isLoadProducts: false }
    }

    default:
      return state
  }
}

/*const initialProduct = {
  active: { value: false },
  name: { value: '' },
  description: { value: '' },
  productGroups: { value: [] },
  paymentTypes: { value: [] },
}*/

/*   case PRODUCTS_FETCH + requestStatuses.FAIL: {
      const normalizedProducts = productsNormalize({ products: productsData })
      state.data = normalizedProducts.data
      state.list = normalizedProducts.list
      state.isLoadProducts = false
      break
    }

    case PRODUCT_ADD: {
      const productId = state.unsavedList.length + 1
      state.unsavedList.push(productId)
      state.unsavedData[productId] = { ...initialProduct, id: productId }
      break
    }

    case PRODUCT_DELETE: {
      const { id, isUnsaved } = payload,
        [listName, dataName] = isUnsaved ? ['unsavedList', 'unsavedData'] : ['list', 'data']
      state[listName] = state[listName].filter(productId => productId !== id)
      delete state[dataName][id]
      break
    }

    case PRODUCTS_SAVE: {
      state.isSaveRun = true
      break
    }

    case PRODUCTS_UPDATE + requestStatuses.SUCCESS: {
      state.isSaveRun = false
      state.data = { ...state.data, ...productsNormalize({ products: payload }).data }
      break
    }

    case PRODUCTS_CREATE + requestStatuses.SUCCESS: {
      const { savedProducts } = meta
      const normalizedProducts = productsNormalize({ products: payload })
      state.list = [...state.list, ...normalizedProducts.list]
      state.data = { ...state.data, ...normalizedProducts.data }
      state.unsavedList = state.unsavedList.filter(productId => !savedProducts.some(id => id === productId))
      savedProducts.forEach(productId => delete state.unsavedData[productId])
      state.isSaveRun = false
      break
    }

    case PRODUCTS_UPDATE + requestStatuses.FAIL:
    case PRODUCTS_CREATE + requestStatuses.FAIL: {
      state.isSaveRun = false
      break
    }

    case PRODUCT_GROUPS_FETCH + requestStatuses.SUCCESS: {
      state.productGrops = payload.reduce(
        (acc, { groupId, name }) => {
          acc.options.push({ value: groupId, label: name })
          acc.optionsMap[groupId] = name
          return acc
        },
        { options: [], optionsMap: {}, isLoad: false }
      )
      break
    }

    case PRODUCT_GROUPS_FETCH + requestStatuses.FAIL: {
      state.productGroups = { ...productGroups, isLoad: false }
      break
    }

    case PAYMENT_TYPES_FETCH + requestStatuses.FAIL: {
      state.paymentTypes = { ...paymentTypes, isLoad: false }
      break
    }*!/

    default:
      return state
  }
}*/

function productsNormalize({ products }) {
  return products.reduce(
    (accumulator, product) => {
      accumulator.list.push(product.productId)
      accumulator.data[product.productId] = product
      return accumulator
    },
    { list: [], data: {} }
  )
}
