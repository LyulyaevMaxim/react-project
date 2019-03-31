import produce from 'immer'
import IActions from './actions.d'
import { IProduct, IState } from './reducer.d'
import { paymentTypes, productGroups, productsData } from './fakeData'

const initialProduct: IProduct = {
  productId: '',
  active: { value: false },
  name: { value: '' },
  description: { value: '' },
  productGroups: { value: [] },
  paymentTypes: { value: [] },
  picture: { value: '' },
}

export enum ActionTypes {
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

export const productsReducer = (state: IState = initialState, action: IActions) =>
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
        draft.productGroups = action.payload.reduce(
          (acc, { groupId, name }) => {
            acc.options.push({ value: groupId, label: name })
            acc.optionsMap[groupId] = name
            return acc
          },
          { options: [], optionsMap: {}, isLoad: false } as IState['productGroups']
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
        const productId = String(state.unsavedList.length + 1)
        draft.unsavedList.push(productId)
        draft.unsavedData[productId] = { ...initialProduct, productId }
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
        const normalizedProducts = productsNormalize({ products: action.payload })
        draft.list = [...state.list, ...normalizedProducts.list]
        draft.data = { ...state.data, ...normalizedProducts.data }
        if (action.meta && action.meta.savedProducts) {
          const { savedProducts } = action.meta
          draft.unsavedList = state.unsavedList.filter(productId => !savedProducts.some(id => id === productId))
          savedProducts.forEach(productId => delete draft.unsavedData[productId])
        }
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

function productsNormalize({ products }: { products: Array<IProduct> }) {
  return products.reduce(
    (accumulator, product) => {
      accumulator.list.push(product.productId)
      accumulator.data[product.productId] = product
      return accumulator
    },
    { list: [], data: {} } as { list: Array<IProduct['productId']>; data: { [key: string]: IProduct } }
  )
}
