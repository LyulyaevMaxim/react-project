import { requestCreator } from '~utils/action-creators'
import { API_URL_2, GET_REQUEST, POST_REQUEST, DELETE_REQUEST, PUT_REQUEST } from '~constants'
import { PROMOTION_GET, PROMOTION_CREATE, PROMOTION_DELETE, PROMOTION_UPDATE } from './constants'

export const getPromotions = ({
  isLastPromotionsGoingFirst = true,
  promotionId,
  isEnabled = false,
  // page = 1,
  // size = 1 //<= 50
}) => (dispatch, getState) =>
  getState().promotions.list.length <= 1 &&
  requestCreator(dispatch, {
    type: PROMOTION_GET,
    requestType: GET_REQUEST,
    requestUrl: `${API_URL_2}/discounts/promotion`,
    sendObject: { promotionId },
  })

export const createPromotion = promotion => (dispatch, getState) =>
  requestCreator(dispatch, {
    type: PROMOTION_CREATE,
    requestUrl: `${API_URL_2}/discounts/promotion`,
    requestType: POST_REQUEST,
    sendObject: promotion,
    other: { promotion },
  })

export const deletePromotion = ({ promotionId = '' }) => (dispatch, getState) =>
  requestCreator(dispatch, {
    type: PROMOTION_DELETE,
    requestUrl: `${API_URL_2}/discounts/promotion`,
    requestType: DELETE_REQUEST,
    sendObject: { promotionId },
    other: { promotionId },
  })

export const updatePromotion = ({ promotion }) => (dispatch, getState) =>
  requestCreator(dispatch, {
    type: PROMOTION_UPDATE,
    requestUrl: `${API_URL_2}/discounts/promotion`,
    requestType: PUT_REQUEST,
    sendObject: promotion,
    other: { promotion },
  })