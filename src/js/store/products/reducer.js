import produce from 'immer'
import { REQUEST, SUCCESS, FAIL } from '~utils/request-creator'
import { paymentTypes, productGroups, productsData } from './fakeData'

const {
  PRODUCTS_FETCH,
  PRODUCT_ADD,
  PRODUCT_DELETE,
  PRODUCTS_SAVE,
  PRODUCTS_CREATE,
  PRODUCTS_UPDATE,
  PRODUCT_GROUPS_FETCH,
  PAYMENT_TYPES_FETCH,
} = require('./constants').default

const initialState = {
  isLoadProducts: null,
  isSaveRun: null,
  list: [],
  data: {},
  unsavedList: [],
  unsavedData: {},
  productGroups: { options: [], optionsMap: {}, isLoad: null },
  paymentTypes: { options: [], optionsMap: {}, isLoad: null },
}

const initialProduct = {
  active: { value: false },
  name: { value: '' },
  description: { value: '' },
  productGroups: { value: [] },
  paymentTypes: { value: [] },
}

export default produce((state = initialState, { type, payload = {}, meta = {} }) => {
  switch (type) {
    case PRODUCTS_FETCH + REQUEST: {
      state.isLoadProducts = true
      break
    }

    case PRODUCTS_FETCH + SUCCESS: {
      const normalizedProducts = productsNormalize({ products: payload })
      state.data = normalizedProducts.data
      state.list = normalizedProducts.list
      state.isLoadProducts = false
      break
    }

    case PRODUCTS_FETCH + FAIL: {
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

    case PRODUCTS_UPDATE + SUCCESS: {
      state.isSaveRun = false
      state.data = { ...state.data, ...productsNormalize({ products: payload }).data }
      break
    }

    case PRODUCTS_CREATE + SUCCESS: {
      const { savedProducts } = meta
      const normalizedProducts = productsNormalize({ products: payload })
      state.list = [...state.list, ...normalizedProducts.list]
      state.data = { ...state.data, ...normalizedProducts.data }
      state.unsavedList = state.unsavedList.filter(productId => !savedProducts.some(id => id === productId))
      savedProducts.forEach(productId => delete state.unsavedData[productId])
      state.isSaveRun = false
      break
    }

    case PRODUCTS_UPDATE + FAIL:
    case PRODUCTS_CREATE + FAIL: {
      state.isSaveRun = false
      break
    }

    case PRODUCT_GROUPS_FETCH + SUCCESS: {
      state.productGroups = payload.reduce(
        (acc, { groupId, name }) => {
          acc.options.push({ value: groupId, label: name })
          acc.optionsMap[groupId] = name
          return acc
        },
        { options: [], optionsMap: {}, isLoad: false }
      )
      break
    }

    case PRODUCT_GROUPS_FETCH + FAIL: {
      state.productGroups = { ...productGroups, isLoad: false }
      break
    }

    case PAYMENT_TYPES_FETCH + FAIL: {
      state.paymentTypes = { ...paymentTypes, isLoad: false }
      break
    }

    default:
      return state
  }
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
