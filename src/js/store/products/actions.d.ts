import { ActionTypes } from './reducer'
import { IProduct, IProductGroups } from './reducer.d'

export default IActions
type IActions =
  //--------------------
  IFetchProducts
  | IAddProduct
  | ICreateProducts
  | ISaveProducts
  | IUpdateProducts
  | IDeleteProductsAction
  //--------------------
  | IFetchProductGroups
  | IFetchPaymentTypes

export type IFetchProducts = { type: ActionTypes.PRODUCTS_FETCH_REQUEST }
  | { type: ActionTypes.PRODUCTS_FETCH_FAIL }
  | {
  type: ActionTypes.PRODUCTS_FETCH_SUCCESS,
  payload: Array<IProduct>,
}

export interface IAddProduct { type: ActionTypes.PRODUCT_ADD }

export type ICreateProducts = { type: ActionTypes.PRODUCTS_CREATE_REQUEST }
  | { type: ActionTypes.PRODUCTS_CREATE_FAIL }
  | {
  type: ActionTypes.PRODUCTS_CREATE_SUCCESS,
  payload: Array<IProduct>,
  meta?: { savedProducts: Array<IProduct['productId']> }
}

export interface ISaveProducts { type: ActionTypes.PRODUCTS_SAVE }

export type IUpdateProducts = { type: ActionTypes.PRODUCTS_UPDATE_REQUEST }
  | { type: ActionTypes.PRODUCTS_UPDATE_FAIL }
  | { type: ActionTypes.PRODUCTS_UPDATE_SUCCESS, payload: Array<IProduct> }

export interface IDeleteProductsAction {
  type: ActionTypes.PRODUCT_DELETE
  payload: { id: string, isUnsaved: boolean }
}

export type IFetchProductGroups = { type: ActionTypes.PRODUCT_GROUPS_FETCH_REQUEST }
  | { type: ActionTypes.PRODUCT_GROUPS_FETCH_FAIL }
  | { type: ActionTypes.PRODUCT_GROUPS_FETCH_SUCCESS, payload: Array<{ groupId: number, name: string }> }

export type IFetchPaymentTypes = { type: ActionTypes.PAYMENT_TYPES_FETCH_REQUEST }
  | { type: ActionTypes.PAYMENT_TYPES_FETCH_FAIL }
  | { type: ActionTypes.PAYMENT_TYPES_FETCH_SUCCESS, payload }


