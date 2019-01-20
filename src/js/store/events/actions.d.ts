import { ActionTypes } from './reducer'
import { IEvent, IEventNew, IPlace } from './reducer.d'

export default IActions
type IActions = IFetchEvents | ISaveEvent | IEventSelected | IEventsSearch | IDeleteEvents | IFetchPlaces

export type IFetchEvents =
  | { type: ActionTypes.EVENTS_FETCH_REQUEST }
  | { type: ActionTypes.EVENTS_FETCH_FAIL }
  | { type: ActionTypes.EVENTS_FETCH_SUCCESS; payload: Array<IEvent> }

export type ISaveEvent =
  | { type: ActionTypes.EVENT_SAVE_REQUEST }
  | { type: ActionTypes.EVENT_SAVE_FAIL; meta: IEventNew }
  | { type: ActionTypes.EVENT_SAVE_SUCCESS; payload: IEventNew }

export type IDeleteEvents =
  | { type: ActionTypes.EVENTS_DELETE_REQUEST }
  | { type: ActionTypes.EVENTS_DELETE_FAIL }
  | { type: ActionTypes.EVENTS_DELETE_SUCCESS }

export interface IEventSelected {
  type: ActionTypes.EVENT_SELECTED
  payload: { isAll: boolean } | { eventId: IEvent['eventId'] }
}

export interface IEventsSearch {
  type: ActionTypes.EVENTS_SEARCH
  payload: { searchTerm: string }
}

export type IFetchPlaces =
  | { type: ActionTypes.PLACES_FETCH_REQUEST }
  | { type: ActionTypes.PLACES_FETCH_FAIL }
  | { type: ActionTypes.PLACES_FETCH_SUCCESS; payload: Array<IPlace> }