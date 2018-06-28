import { requestCreator } from '~utils/action-creators'
import { API_URL_2, GET_REQUEST, POST_REQUEST, DELETE_REQUEST } from '~constants'
import { ITEMS_GET, ITEM_DELETE } from './constants'

export const getItems = ({ storeId, limit = 0, offset = 0, type = ITEMS_GET }) => dispatch =>
  requestCreator(dispatch, {
    type,
    requestType: GET_REQUEST,
    requestUrl: `${API_URL_2}/goods/${storeId}/getPosList`,
    sendObject: { limit, offset },
    other: { storeId },
  })

export const deleteItem = ({ _id, storeId }) => (dispatch, getState) => {
  requestCreator(dispatch, {
    type: ITEM_DELETE,
    requestType: DELETE_REQUEST,
    requestUrl: `${API_URL_2}/goods/remove`,
    sendObject: { _id },
    other: { barcode: _id, storeId },
  })
}
