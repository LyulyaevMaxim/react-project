import { createSelector } from 'reselect'
import { IState } from './reducer'

const getList = (state: IState) => state.list
/*import { selectorsCreator, selectorFactoriesCreator } from '~utils/selector-creator'

const dataFactory = (id, data) => data[id] || {}

export const {
  productIdGetter,
  productsListGetter,
  productsDataGetter,
  unsavedProductsDataGetter,
  unsavedProductsListGetter,
  productGroupsGetter,
  paymentTypesGetter,
  isSaveRun,
} = selectorsCreator([
  { name: 'productIdGetter', path: 'props.id', type: 'string' },
  { name: 'productsListGetter', path: 'store.products.list', type: 'array' },
  { name: 'productsDataGetter', path: 'store.products.data', type: 'object' },
  { name: 'unsavedProductsDataGetter', path: 'store.products.unsavedData', type: 'object' },
  { name: 'unsavedProductsListGetter', path: 'store.products.unsavedList', type: 'array' },
  { name: 'productGroupsGetter', path: 'store.products.productGroups', type: 'object' },
  { name: 'paymentTypesGetter', path: 'store.products.paymentTypes', type: 'object' },
  { name: 'isSaveRun', path: 'store.products.isSaveRun', type: 'other' },
])

export const isLoadProducts = ({ products }) =>
  [products.isLoadProducts, products.productGroups.isLoad, products.paymentTypes.isLoad].some(flag => flag !== false)

export const { productFactory, unsavedProductFactory } = selectorFactoriesCreator([
  { name: 'productFactory', selectors: [productIdGetter, productsDataGetter], func: dataFactory },
  { name: 'unsavedProductFactory', selectors: [productIdGetter, unsavedProductsDataGetter], func: dataFactory },
])
*/
