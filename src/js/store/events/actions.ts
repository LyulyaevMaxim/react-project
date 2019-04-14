import * as IActions from './actions.d'
import { IEventNew, ActionTypes } from './reducer.d'
import { Dispatch } from 'redux'
import { requestCreator, requestTypes } from '~utils/request-creator'
import { API_URL } from '~constants'

// type Action = ReturnType<typeof updateName>

export const fetchEvents = () => (dispatch: Dispatch<IActions.IFetchEvents>) =>
  requestCreator(dispatch, {
    type: ActionTypes.EVENTS_FETCH,
    requestType: requestTypes.GET_REQUEST,
    requestUrl: `${API_URL}/events`,
  })

export const saveEvent = (event: IEventNew) => (dispatch: Dispatch<IActions.IFetchEvents>) =>
  requestCreator(dispatch, {
    type: ActionTypes.EVENT_SAVE,
    requestType: requestTypes.POST_REQUEST,
    requestUrl: `${API_URL}/event`,
    meta: event,
  })

export const selectedEvent = ({ isAll, eventId }: { isAll: boolean; eventId: string }) => (
  dispatch: Dispatch<IActions.IEventSelected>
) =>
  dispatch({
    type: ActionTypes.EVENT_SELECTED,
    payload: isAll ? { isAll: true } : { eventId },
  })

export const deleteEvents = () => (dispatch: Dispatch<IActions.IDeleteEvents>) =>
  requestCreator(dispatch, {
    type: ActionTypes.EVENTS_DELETE,
    requestType: requestTypes.DELETE_REQUEST,
    requestUrl: `${API_URL}/events`,
  })

export const fetchPlaces = () => (dispatch: Dispatch<IActions.IFetchPlaces>) =>
  requestCreator(dispatch, {
    type: ActionTypes.PLACES_FETCH,
    requestType: requestTypes.GET_REQUEST,
    requestUrl: `${API_URL}/places`,
  })

export const eventsSearch = (searchTerm: string) => (dispatch: Dispatch<IActions.IEventsSearch>) =>
  dispatch({ type: ActionTypes.EVENTS_SEARCH, payload: { searchTerm } })
