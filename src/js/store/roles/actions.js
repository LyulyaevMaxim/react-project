import { requestCreator } from '~utils/action-creators'
import { API_URL_2, GET_REQUEST, POST_REQUEST, DELETE_REQUEST, PUT_REQUEST } from '~constants'
import { ROLES_GET, ROLE_CREATE, ROLE_DELETE, ROLE_UPDATE } from './constants'

export const getRoles = (/*{roleId, roleName}*/) => (dispatch, getState) =>
  /* (!getState().documents.intoShops[store]) &&*/ requestCreator(dispatch, {
    type: ROLES_GET,
    requestType: GET_REQUEST,
    requestUrl: `${API_URL_2}/role`,
  })

export const createRole = role => (dispatch, getState) =>
  requestCreator(dispatch, {
    type: ROLE_CREATE,
    requestUrl: `${API_URL_2}/role`,
    requestType: POST_REQUEST,
    sendObject: role,
    other: { role },
  })

export const updateRole = role => (dispatch, getState) =>
  requestCreator(dispatch, {
    type: ROLE_UPDATE,
    requestUrl: `${API_URL_2}/role`,
    requestType: PUT_REQUEST,
    sendObject: role,
    other: {
      role: { ...role, rules: role.rulesIds.map(ruleId => getState().rules.data[ruleId]) },
    },
  })

export const deleteRole = ({ roleId }) => (dispatch, getState) =>
  requestCreator(dispatch, {
    type: ROLE_DELETE,
    requestUrl: `${API_URL_2}/role`,
    requestType: DELETE_REQUEST,
    sendObject: { roleId },
    other: { roleId },
  })
