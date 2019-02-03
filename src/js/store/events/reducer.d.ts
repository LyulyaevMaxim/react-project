import * as Types from '~types/index'

export interface IEvent {
  eventId: string
  name: { value: string }
  date: { value: string }
  place: { value: string }
}

export interface IEventNew {
  name: IEvent['name']['value']
  date: IEvent['date']['value']
  place: IEvent['place']['value']
}

export interface IPlace {
  placeId: string
  name: { value: string }
}

interface IPlaceOption {
  value: IPlace['placeId']
  label: IPlace['name']['value']
}

export interface IPlaces {
  options: Array<IPlaceOption>
  optionsMap: { [key: string]: IPlaceOption }
}

export interface IState {
  readonly isLoading: Types.TLoadingFlag
  readonly isSaving: Types.TLoadingFlag
  readonly isDeleting: Types.TLoadingFlag
  readonly list: Array<IEvent['eventId']>
  readonly data: { [key: string]: IEvent }
  readonly places: IPlaces & { isLoading: Types.TLoadingFlag }
  readonly UI: {
    selectedToRemoving: { [key: string]: true }
    searchTerm: string
  }
}

export enum ActionTypes {
  EVENTS_FETCH = 'EVENTS_FETCH',
  EVENTS_FETCH_REQUEST = 'EVENTS_FETCH_REQUEST',
  EVENTS_FETCH_SUCCESS = 'EVENTS_FETCH_SUCCESS',
  EVENTS_FETCH_FAIL = 'EVENTS_FETCH_FAIL',

  EVENT_SAVE = 'EVENT_SAVE',
  EVENT_SAVE_REQUEST = 'EVENT_SAVE_REQUEST',
  EVENT_SAVE_SUCCESS = 'EVENT_SAVE_SUCCESS',
  EVENT_SAVE_FAIL = 'EVENT_SAVE_FAIL',

  EVENTS_DELETE = 'EVENTS_DELETE',
  EVENTS_DELETE_REQUEST = 'EVENTS_DELETE_REQUEST',
  EVENTS_DELETE_SUCCESS = 'EVENTS_DELETE_SUCCESS',
  EVENTS_DELETE_FAIL = 'EVENTS_DELETE_FAIL',

  EVENT_SELECTED = 'EVENT_SELECTED',
  EVENTS_SEARCH = 'EVENTS_SEARCH',

  PLACES_FETCH = 'PLACES_FETCH',
  PLACES_FETCH_REQUEST = 'PLACES_FETCH_REQUEST',
  PLACES_FETCH_SUCCESS = 'PLACES_FETCH_SUCCESS',
  PLACES_FETCH_FAIL = 'PLACES_FETCH_FAIL',
}
