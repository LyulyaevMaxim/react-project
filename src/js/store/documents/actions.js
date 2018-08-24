import { requestCreator } from '~utils/request-creator'
import { GET_REQUEST } from '~constants'
import { DOCUMENTS_GET } from './constants'

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
