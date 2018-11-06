import { requestCreator, requestTypes, requestStatuses } from '~utils/request-creator'
import { API_URL } from '~constants'
const {
  PRODUCTS_FETCH,
  PRODUCTS_UPDATE,
  PRODUCTS_CREATE,
  PRODUCT_ADD,
  PRODUCTS_SAVE,
  PRODUCT_GROUPS_FETCH,
} = require('./constants').default

export const fetchProducts = () => dispatch =>
  requestCreator(dispatch, {
    type: PRODUCTS_FETCH,
    requestType: requestTypes.GET_REQUEST,
    requestUrl: `${API_URL}/products`,
  })

export const updateProducts = ({ productsData = [] }) => dispatch => {
  if (!productsData.length) return dispatch({ type: PRODUCTS_UPDATE + requestStatuses.SUCCESS, payload: [] })
  return requestCreator(dispatch, {
    type: PRODUCTS_UPDATE,
    requestType: requestTypes.PATCH_REQUEST,
    requestUrl: `${API_URL}/products/`,
    sendObject: productsData,
  })
}

export const createProducts = ({ productsData = [] }) => dispatch => {
  if (!productsData.length) return dispatch({ type: PRODUCTS_CREATE + requestStatuses.SUCCESS, payload: [] })
  return requestCreator(dispatch, {
    type: PRODUCTS_CREATE,
    requestType: requestTypes.PATCH_REQUEST,
    requestUrl: `${API_URL}/products/`,
    sendObject: productsData,
    meta: { savedProducts: productsData.map(({ productId }) => productId) },
  })
}

export const addProduct = () => dispath => dispath({ type: PRODUCT_ADD })

export const saveProducts = () => dispath => dispath({ type: PRODUCTS_SAVE })

export const fetchProductGroups = () => dispatch =>
  requestCreator(dispatch, {
    type: PRODUCT_GROUPS_FETCH,
    requestType: requestTypes.GET_REQUEST,
    requestUrl: `${API_URL}/productGroupList/`,
  })
