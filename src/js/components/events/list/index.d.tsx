import { IEvents } from '~store/events/reducer'
export { IStore } from '~store/index'

export interface IReduxProps {
  isLoading: IEvents.IState['isLoading']
  isAllSelected: boolean
  isAnyoneSelected: boolean
  eventsList: IEvents.IState['list']
  eventsPlaces: IEvents.IState['places']
}

interface IDispatchProps {
  fetchEvents: any
  fetchPlaces: any
  selectedEvent: any
  eventsSearch: any
}

export type IProps = IReduxProps & IDispatchProps

export interface IState {
  errors: Array<{ errorName: string; error: Error }>
  isOpenPopupAddEvent: null | boolean
  isOpenPopupDeleteEvents: null | boolean
}
