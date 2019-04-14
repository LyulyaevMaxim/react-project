import { requestCreator, requestTypes } from '~utils/request-creator'
import { API_URL_2 } from '~constants'

const { ITEMS_GET, ITEM_DELETE } = require('./constants').default

export const getItems = ({ storeId, limit = 0, offset = 0, type = ITEMS_GET }) => dispatch =>
  requestCreator(dispatch, {
    type,
    requestType: requestTypes.GET_REQUEST,
    requestUrl: `${API_URL_2}/goods/${storeId}/getPosList`,
    sendObject: { limit, offset },
    other: { storeId },
  })

export const deleteItem = ({ _id, storeId }) => (dispatch, getState) => {
  requestCreator(dispatch, {
    type: ITEM_DELETE,
    requestType: requestTypes.DELETE_REQUEST,
    requestUrl: `${API_URL_2}/goods/remove`,
    sendObject: { _id },
    other: { barcode: _id, storeId },
  })
}
