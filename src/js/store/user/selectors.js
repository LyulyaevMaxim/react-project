import { createSelector } from 'reselect'

const idUser = (state, props) => props.userId
export const usersDataGetter = (state, props) => state.users.data
export const usersListGetter = (state, props) => state.users.list

export const userSelectorFactory = () =>
  createSelector(usersDataGetter, idUser, (users, id) => users[id])

export const getUsersListByStoreId = (state, storeId) =>
  state.users.list.reduce(
    (list, userId) =>
      state.users.data[userId].stores.includes(storeId) ? list.concat(userId) : list,
    [],
  )
