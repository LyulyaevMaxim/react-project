import { createSelector } from 'reselect'

const roleIdGetter = (state, properties) => properties.roleId
export const rolesDataGetter = (state, properties) => state.roles.data
export const rolesListGetter = (state, properties) => state.roles.list

export const roleFactory = () =>
  createSelector(roleIdGetter, rolesDataGetter, (roleId, data) => data[roleId])
