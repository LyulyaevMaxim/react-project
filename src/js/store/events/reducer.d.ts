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