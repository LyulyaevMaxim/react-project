import { selectorsCreator, selectorFactoriesCreator } from '~utils/selector-creator'
import { registerSelectors } from 'reselect-tools'

const dataFactory = (id, data) => data[id] || {}

const {
  productIdGetter,
  productsListGetter,
  productsDataGetter,
  unsavedProductsDataGetter,
  unsavedProductsListGetter,
  productGroupsGetter,
  paymentTypesGetter,
} = selectorsCreator([
  { name: 'productIdGetter', path: 'props.productId', type: 'string' },
  { name: 'productsListGetter', path: 'store.products.list', type: 'array' },
  { name: 'productsDataGetter', path: 'store.products.data', type: 'object' },
  { name: 'unsavedProductsDataGetter', path: 'store.products.unsavedData', type: 'object' },
  { name: 'unsavedProductsListGetter', path: 'store.products.unsavedList', type: 'array' },
  { name: 'productGroupsGetter', path: 'store.products.productGroups', type: 'object' },
  { name: 'paymentTypesGetter', path: 'store.products.paymentTypes', type: 'object' },
])

const { productFactory, unsavedProductFactory } = selectorFactoriesCreator([
  { name: 'productFactory', selectors: [productIdGetter, productsDataGetter], func: dataFactory },
  { name: 'unsavedProductFactory', selectors: [productIdGetter, unsavedProductsDataGetter], func: dataFactory },
])

const selectors = {
  productIdGetter,
  productsListGetter,
  productsDataGetter,
  unsavedProductsDataGetter,
  unsavedProductsListGetter,
  productFactory,
  unsavedProductFactory,
  productGroupsGetter,
  paymentTypesGetter,
}
registerSelectors(selectors)

export default selectors
