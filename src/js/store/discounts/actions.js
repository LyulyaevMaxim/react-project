import { requestCreator, requestTypes } from '~utils/request-creator'
import { API_URL_2 } from '~constants'
import { push } from 'connected-react-router'

const { PROMOTION_GET, PROMOTION_CREATE, PROMOTION_DELETE, PROMOTION_UPDATE } = require('./constants').default

export const getPromotions = ({ promotionId = '' } = {}) => (dispatch, getState) =>
  getState().promotions.list.length <= 1 &&
  requestCreator(dispatch, {
    type: PROMOTION_GET,
    requestType: requestTypes.GET_REQUEST,
    requestUrl: `${API_URL_2}/discounts/promotion`,
    [promotionId && 'sendObject']: { promotionId },
  })

export const createPromotion = promotion => (dispatch, getState) =>
  requestCreator(dispatch, {
    type: PROMOTION_CREATE,
    requestUrl: `${API_URL_2}/discounts/promotion`,
    requestType: requestTypes.POST_REQUEST,
    sendObject: promotion,
    toReducer: { promotion },
    callbacks: { successful: () => dispatch(push('/')) },
  })

export const deletePromotion = ({ promotionId = '' }) => (dispatch, getState) =>
  requestCreator(dispatch, {
    type: PROMOTION_DELETE,
    requestUrl: `${API_URL_2}/discounts/promotion`,
    requestType: requestTypes.DELETE_REQUEST,
    sendObject: { promotionId },
    toReducer: { promotionId },
  })

export const updatePromotion = ({ promotion }) => (dispatch, getState) =>
  requestCreator(dispatch, {
    type: PROMOTION_UPDATE,
    requestUrl: `${API_URL_2}/discounts/promotion`,
    requestType: requestTypes.PUT_REQUEST,
    sendObject: promotion,
    toReducer: { promotion },
    callbacks: { successful: () => dispatch(push('/')) },
  })
