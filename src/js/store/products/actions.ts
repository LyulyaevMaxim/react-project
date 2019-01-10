import { Dispatch } from 'redux'
import * as IActions from './actions.d'
import { ActionTypes } from './reducer'
import { requestCreator, requestTypes } from '~utils/request-creator'
import { API_URL } from '~constants'

export const fetchProducts = (dispatch: Dispatch<IActions.IFetchProducts>) =>
  requestCreator(dispatch, {
    type: 'PRODUCTS_FETCH',
    requestType: requestTypes.GET_REQUEST,
    requestUrl: `${API_URL}/products`,
  })

export const updateProducts = ({ productsData = [] }) => (dispatch: Dispatch<IActions.IUpdateProducts>) => {
  if (!productsData.length) return dispatch({ type:ActionTypes.PRODUCTS_UPDATE_SUCCESS, payload: [] })
  return requestCreator(dispatch, {
    type: 'PRODUCTS_UPDATE',
    requestType: requestTypes.PATCH_REQUEST,
    requestUrl: `${API_URL}/products/`,
    sendObject: productsData,
  })
}

export const createProducts = ({ productsData = [] }) => (dispatch: Dispatch<IActions.ICreateProducts>) => {
  if (!productsData.length) return dispatch({ type: ActionTypes.PRODUCTS_CREATE_SUCCESS, payload: [] })
  return requestCreator(dispatch, {
    type: 'PRODUCTS_CREATE',
    requestType: requestTypes.PATCH_REQUEST,
    requestUrl: `${API_URL}/products/`,
    sendObject: productsData,
    meta: { savedProducts: productsData.map(({ productId }) => productId) },
  })
}

export const addProduct = () => (dispatch: Dispatch<IActions.IAddProduct>) =>
  dispatch({ type: ActionTypes.PRODUCT_ADD })

export const deleteProduct = ({ id, isUnsaved }: { id: string, isUnsaved: boolean }) =>
  (dispatch: Dispatch<IActions.IDeleteProductsAction>) =>
    dispatch({ type: ActionTypes.PRODUCT_DELETE, payload: { id, isUnsaved } })

export const saveProducts = () => (dispatch: Dispatch<IActions.ISaveProducts>) =>
  dispatch({ type: ActionTypes.PRODUCTS_SAVE })

export const fetchProductGroups = (dispatch: Dispatch<IActions.IFetchProductGroups>) =>
  requestCreator(dispatch, {
    type: 'PRODUCT_GROUPS_FETCH',
    requestType: requestTypes.GET_REQUEST,
    requestUrl: `${API_URL}/productGroupList/`,
  })

export const fetchPaymentTypes = (dispatch: Dispatch<IActions.IFetchPaymentTypes>) =>
  requestCreator(dispatch, {
    type: 'PAYMENT_TYPES_FETCH',
    requestType: requestTypes.GET_REQUEST,
    requestUrl: `${API_URL}/paymentTypes/`,
  })
