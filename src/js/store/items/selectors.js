import { createSelector } from 'reselect'
import get from 'lodash/get'

const emptyObject = {}

const idGetter = (state, properties) => properties.id
const itemsDataGetter = (state, properties) => state.items.data
export const itemsListGetter = (state, { filterBy } = {}) => {
  const { list, data } = state.items
  if (filterBy) {
    let filteredList = [...list]
    filterBy.forEach(({ field, operation, value }) => {
      filteredList = filteredList.filter(element => {
        switch (operation) {
          case '>': {
            return get(data[element], field) > value
          }
          case '<': {
            return get(data[element], field) < value
          }
          case '=': {
            return get(data[element], field) === value
          }
          case '!=': {
            return get(data[element], field) !== value
          }
          default:
            throw new Error(`Method don't know as work with your type of operation`, operation)
        }
      })
    })
    return filteredList
  }
  return list
}

const shopIdGetter = (state, properties) => properties.storeId
const itemsFromShopList = (state, properties) => state.items.intoShops

export const itemSelectorFactory = () =>
  createSelector(itemsDataGetter, idGetter, (items, id) => items[id] || emptyObject)

export const itemsFromShopFactory = () =>
  createSelector(shopIdGetter, itemsFromShopList, itemsDataGetter, (storeId, lists, data) => {
    if (!lists[storeId] || !lists[storeId].list) return { data: {}, list: [], quantityItems: 0 }
    const itemsData = {}
    const { list, quantityItems, loadingItems } = lists[storeId]
    list.forEach(itemId => (itemsData[itemId] = data[itemId]))
    return { list, data: itemsData, quantityItems, loadingItems }
  })
