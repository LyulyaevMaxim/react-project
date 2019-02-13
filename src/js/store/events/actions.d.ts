import { IEventNew, ActionTypes } from './reducer.d'
import { IServerEventsList, IServerSaveEvent, IServerDeleteEvent, IServerPlaces } from '~backend/events'

export default IActions
type IActions = IFetchEvents | ISaveEvent | IEventSelected | IEventsSearch | IDeleteEvents | IFetchPlaces

export type IFetchEvents =
  | { type: ActionTypes.EVENTS_FETCH_REQUEST }
  | { type: ActionTypes.EVENTS_FETCH_FAIL; payload: IServerEventsList['fail'] }
  | { type: ActionTypes.EVENTS_FETCH_SUCCESS; payload: IServerEventsList['success']['result'] }

export type ISaveEvent =
  | { type: ActionTypes.EVENT_SAVE_REQUEST }
  | { type: ActionTypes.EVENT_SAVE_FAIL; meta: IEventNew; payload: IServerSaveEvent['fail'] }
  | { type: ActionTypes.EVENT_SAVE_SUCCESS; payload: IServerSaveEvent['success'] }

export type IDeleteEvents =
  | { type: ActionTypes.EVENTS_DELETE_REQUEST }
  | { type: ActionTypes.EVENTS_DELETE_FAIL }
  | { type: ActionTypes.EVENTS_DELETE_SUCCESS; payload: IServerDeleteEvent['fail'] }

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
  | { type: ActionTypes.PLACES_FETCH_SUCCESS; payload: IServerPlaces['success']['result'] }
