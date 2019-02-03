import { IEvents } from '~store/events/reducer'
export { IStore } from '~store/index'

export interface IOwnProps {
  eventId: IEvents.IEvent['eventId']
  eventsPlaces: IEvents.IState['places']
  handleSelected
}

export interface IReduxProps {
  eventData: IEvents.IEvent
  isSelected: boolean
}
