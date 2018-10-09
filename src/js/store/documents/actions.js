import { requestCreator, GET_REQUEST } from '~utils/request-creator'
const { DOCUMENTS_GET } = require('./constants').default

export const getDocuments = ({ store = '', deviceUuid = '', dateStart = '', dateEnd = '' }) => (
  dispatch,
  getState
) =>
  requestCreator(dispatch, {
    type: DOCUMENTS_GET,
    requestType: GET_REQUEST,
    requestUrl: `documents${store && `/${store}`}`,
    sendObject: { dateStart, dateEnd },
    other: { storeId: store },
  })
