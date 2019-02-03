import { IEvents } from '~store/events/reducer'
export { IStore } from '~store/index'

export interface IPopupProps {
  isOpen: boolean | null
  handleOpen: any
}

export interface IReduxProps {
  eventsPlaces: IEvents.IState['places']
  isSaving: IEvents.IState['isSaving']
}

export interface IDispatchProps {
  saveEvent: any
}

interface IOwnProps {
  handleOpen: IPopupProps['handleOpen']
}

export type IProps = IOwnProps & IReduxProps & IDispatchProps

export interface IState {
  fieldEventName: string
  fieldEventDate: string
  fieldEventPlace: string
  errors: { [errorName: string]: Error }
}