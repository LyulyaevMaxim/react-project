import { createSelector } from 'reselect'

const emptyObject = {}

const promotionIdGetter = (state, properties) => properties.promotionId
export const promotionsDataGetter = (state, properties) => state.promotions.data
export const promotionsListGetter = (state, { sortBy, quantity }) => {
  if (sortBy) {
    const { list = [], data = {} } = state.promotions
    return [...list].sort((currentId, nextId) => {
      if (data[currentId][sortBy] > data[nextId][sortBy]) return 1
      if (data[currentId][sortBy] < data[nextId][sortBy]) return -1
      return 0
    })
  }
  if (quantity) return state.promotions.list.slice(0, quantity)
  return state.promotions.list
}

export const promotionFactory = () =>
  createSelector(
    promotionIdGetter,
    promotionsDataGetter,
    (promotionId, data) => data[promotionId] || emptyObject
  )
