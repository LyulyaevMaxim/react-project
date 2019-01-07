import produce from 'immer'
import * as Types from '~types/index'
/*import { requestStatuses } from '~utils/request-creator'*/
import { paymentTypes, productGroups, productsData } from './fakeData'

const initialProduct = {
  active: { value: false },
  name: { value: '' },
  description: { value: '' },
  productGroups: { value: [] },
  paymentTypes: { value: [] },
}

export interface IState {
  readonly isLoadProducts: Types.TLoadingFlag
  readonly isSaveRun: Types.TLoadingFlag
  readonly list: number[]
  readonly data: object
  readonly unsavedList: number[]
  readonly unsavedData: object
  readonly productGroups: { options: string[]; optionsMap: object; isLoad: Types.TLoadingFlag }
  readonly paymentTypes: { options: string[]; optionsMap: object; isLoad: Types.TLoadingFlag }
}

enum ActionTypes {
  PRODUCTS_FETCH_REQUEST = 'PRODUCTS_FETCH_REQUEST',
  PRODUCTS_FETCH_SUCCESS = 'PRODUCTS_FETCH_SUCCESS',
  PRODUCTS_FETCH_FAIL = 'PRODUCTS_FETCH_FAIL',

  PRODUCTS_CREATE_REQUEST = 'PRODUCTS_CREATE_REQUEST',
  PRODUCTS_CREATE_SUCCESS = 'PRODUCTS_CREATE_SUCCESS',
  PRODUCTS_CREATE_FAIL = 'PRODUCTS_CREATE_FAIL',

  PRODUCTS_UPDATE_REQUEST = 'PRODUCTS_UPDATE_REQUEST',
  PRODUCTS_UPDATE_SUCCESS = 'PRODUCTS_UPDATE_SUCCESS',
  PRODUCTS_UPDATE_FAIL = 'PRODUCTS_UPDATE_FAIL',

  PRODUCT_GROUPS_FETCH_REQUEST = 'PRODUCT_GROUPS_FETCH_REQUEST',
  PRODUCT_GROUPS_FETCH_SUCCESS = 'PRODUCT_GROUPS_FETCH_SUCCESS',
  PRODUCT_GROUPS_FETCH_FAIL = 'PRODUCT_GROUPS_FETCH_FAIL',

  PAYMENT_TYPES_FETCH_REQUEST = 'PAYMENT_TYPES_FETCH_REQUEST',
  PAYMENT_TYPES_FETCH_SUCCESS = 'PAYMENT_TYPES_FETCH_SUCCESS',
  PAYMENT_TYPES_FETCH_FAIL = 'PAYMENT_TYPES_FETCH_FAIL',

  PRODUCT_ADD = 'PRODUCT_ADD',
  PRODUCT_DELETE = 'PRODUCT_DELETE',
  PRODUCTS_SAVE = 'PRODUCTS_SAVE',
}

interface IAction {
  readonly type: ActionTypes
  readonly payload?: any //object
  readonly meta?: any //object
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

export default (state: IState = initialState, action: IAction) =>
  produce<IState>(state, draft => {
    switch (action.type) {
      case ActionTypes.PRODUCTS_FETCH_REQUEST: {
        draft.isLoadProducts = true
        break
      }

      case ActionTypes.PRODUCTS_FETCH_SUCCESS: {
        const normalizedProducts = productsNormalize({ products: action.payload })
        draft.data = normalizedProducts.data
        draft.list = normalizedProducts.list
        draft.isLoadProducts = false
        break
      }

      case ActionTypes.PRODUCTS_FETCH_FAIL: {
        const normalizedProducts = productsNormalize({ products: productsData })
        draft.data = normalizedProducts.data
        draft.list = normalizedProducts.list
        draft.isLoadProducts = false
        break
      }

      case ActionTypes.PRODUCT_GROUPS_FETCH_SUCCESS: {
        draft.productGroups = (action.payload as any[]).reduce(
          (acc, { groupId, name }) => {
            acc.options.push({ value: groupId, label: name })
            acc.optionsMap[groupId] = name
            return acc
          },
          { options: [], optionsMap: {}, isLoad: false }
        )
        break
      }

      case ActionTypes.PRODUCT_GROUPS_FETCH_FAIL: {
        draft.productGroups = { ...productGroups, isLoad: false }
        break
      }

      case ActionTypes.PAYMENT_TYPES_FETCH_FAIL: {
        draft.paymentTypes = { ...paymentTypes, isLoad: false }
        break
      }

      case ActionTypes.PRODUCT_ADD: {
        const productId = state.unsavedList.length + 1
        draft.unsavedList.push(productId)
        draft.unsavedData[productId] = { ...initialProduct, id: productId }
        break
      }

      case ActionTypes.PRODUCT_DELETE: {
        const { id, isUnsaved } = action.payload,
          [listName, dataName] = isUnsaved ? ['unsavedList', 'unsavedData'] : ['list', 'data']
        draft[listName] = state[listName].filter(productId => productId !== id)
        delete draft[dataName][id]
        break
      }

      case ActionTypes.PRODUCTS_SAVE: {
        draft.isSaveRun = true
        break
      }

      case ActionTypes.PRODUCTS_UPDATE_SUCCESS: {
        draft.isSaveRun = false
        draft.data = { ...state.data, ...productsNormalize({ products: action.payload }).data }
        break
      }

      case ActionTypes.PRODUCTS_CREATE_SUCCESS: {
        const { savedProducts } = action.meta
        const normalizedProducts = productsNormalize({ products: action.payload })
        draft.list = [...state.list, ...normalizedProducts.list]
        draft.data = { ...state.data, ...normalizedProducts.data }
        draft.unsavedList = state.unsavedList.filter(productId => !savedProducts.some(id => id === productId))
        savedProducts.forEach(productId => delete draft.unsavedData[productId])
        draft.isSaveRun = false
        break
      }

      case ActionTypes.PRODUCTS_CREATE_FAIL:
      case ActionTypes.PRODUCTS_UPDATE_FAIL: {
        draft.isSaveRun = false
        break
      }
    }

    return draft
  })

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
