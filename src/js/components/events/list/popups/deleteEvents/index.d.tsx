import { IEvents } from '~store/events/reducer'
export { IStore } from '~store/index'

export interface IReduxProps {
  isDeleting: IEvents.IState['isDeleting']
}

export interface IDispatchProps {
  deleteEvents: any
}

interface IOwnProps {
  isOpen: boolean | null
  handleOpen: any
}

export type IProps = IOwnProps & IReduxProps & IDispatchProps