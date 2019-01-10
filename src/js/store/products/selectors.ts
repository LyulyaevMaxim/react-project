import { selectorsCreator, selectorFactoriesCreator, SelectorTypes } from '~utils/selector-creator'

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
  { name: 'productIdGetter', path: 'props.id', type: SelectorTypes.string },
  { name: 'productsListGetter', path: 'store.products.list', type: SelectorTypes.array },
  { name: 'productsDataGetter', path: 'store.products.data', type: SelectorTypes.object },
  { name: 'unsavedProductsDataGetter', path: 'store.products.unsavedData', type: SelectorTypes.object },
  { name: 'unsavedProductsListGetter', path: 'store.products.unsavedList', type: SelectorTypes.array },
  { name: 'productGroupsGetter', path: 'store.products.productGroups', type: SelectorTypes.object },
  { name: 'paymentTypesGetter', path: 'store.products.paymentTypes', type: SelectorTypes.object },
  { name: 'isSaveRun', path: 'store.products.isSaveRun', type: SelectorTypes.flag },
])

export const isLoadProducts = ({ products }) =>
  [products.isLoadProducts, products.productGroups.isLoad, products.paymentTypes.isLoad].some(flag => flag !== false)

export const { productFactory, unsavedProductFactory } = selectorFactoriesCreator([
  { name: 'productFactory', selectors: [productIdGetter, productsDataGetter], func: dataFactory },
  { name: 'unsavedProductFactory', selectors: [productIdGetter, unsavedProductsDataGetter], func: dataFactory },
])
