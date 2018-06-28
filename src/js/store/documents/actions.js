import { requestCreator } from '~utils/action-creators'
import { GET_REQUEST, POST_REQUEST, DELETE_REQUEST } from '~constants'
import { DOCUMENTS_GET } from './constants'

export const getDocuments = ({ store = '', deviceUuid = '', dateStart = '', dateEnd = '' }) => (
  dispatch,
  getState,
) =>
  requestCreator(dispatch, {
    type: DOCUMENTS_GET,
    requestType: GET_REQUEST,
    requestUrl: `documents${store && `/${store}`}`,
    sendObject: { dateStart, dateEnd },
    other: { storeId: store },
  })
