import { IStore } from '~store/index.ts'
import { IEvents } from './reducer'

export interface ISelectors {
  isLoading: (store: IStore) => IStore['events']['isLoading']
  isSaving: (store: IStore) => IStore['events']['isSaving']
  isDeleting: (store: IStore) => IStore['events']['isDeleting']
  eventsDataGetter: (store: IStore) => IStore['events']['data']
  eventIdGetter: (_: IStore, props: { eventId: IEvents.IEvent['eventId'] }) => IEvents.IEvent['eventId']
  placesGetter: (store: IStore) => IStore['events']['places']
  selectedToRemovingGetter: (store: IStore) => IStore['events']['UI']['selectedToRemoving']
  eventsListGetter: (store: IStore, flags?: { isSearchFilter?: boolean }) => IStore['events']['list']
}

export type IEventFactory = () => (store: IStore, props: { eventId: IEvents.IEvent['eventId'] }) => IEvents.IEvent