import { createSelector } from 'reselect'
import get from 'lodash/get'

const idShop = (state, props) => props.shopId
const documentsDataGetter = (state, props) => state.documents.data
export const documentsIntoShopsListGetter = (state, props) => state.documents.intoShops
export const getDocumentsByShopId = (state, id) =>
  state.documents.intoShops[id] || state.documents.intoShops['ALL']
const typeFilter = (state, props) => get(props, 'documentsType', '')

export const documentsFromShop = () =>
  createSelector(
    documentsIntoShopsListGetter,
    documentsDataGetter,
    idShop,
    typeFilter,
    (list, data, shopId, documentsType) => {
      if (!list[shopId]) {
        if (list['ALL']) {
          const documentsData = {}
          const currentList = list['ALL'].filter(
            documentId => data[documentId].storeUuid === shopId
          )
          currentList.forEach(documentId => (documentsData[documentId] = data[documentId]))
          return { list: currentList, data: documentsData }
        }
        return { data: {}, list: [] }
      }
      const documentsData = {}
      let currentList = documentsType
        ? list[shopId].filter(documentId => data[documentId].type === documentsType)
        : list[shopId]
      currentList.forEach(documentId => (documentsData[documentId] = data[documentId]))
      return { list: currentList, data: documentsData }
    }
  )
