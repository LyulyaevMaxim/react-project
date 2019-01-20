import { selectorsCreator, selectorFactoriesCreator, SelectorTypes } from '~utils/selector-creator'
import { IStore } from '~store/index'

export const {
  isLoading,
  isSaving,
  isDeleting,
  eventsDataGetter,
  eventIdGetter,
  placesGetter,
  selectedToRemovingGetter,
} = selectorsCreator([
  { name: 'isLoading', path: 'store.events.isLoading', type: SelectorTypes.flag },
  { name: 'isSaving', path: 'store.events.isSaving', type: SelectorTypes.flag },
  { name: 'isDeleting', path: 'store.events.isDeleting', type: SelectorTypes.flag },
  { name: 'eventsDataGetter', path: 'store.events.data', type: SelectorTypes.object },
  { name: 'eventIdGetter', path: 'props.eventId', type: SelectorTypes.string },
  { name: 'placesGetter', path: 'store.events.places', type: SelectorTypes.object },
  { name: 'selectedToRemovingGetter', path: 'store.events.UI.selectedToRemoving', type: SelectorTypes.object },
])

type IEventsListGetter = (store: IStore, flags?: { isSearchFilter?: boolean }) => IStore['events']['list']
export const eventsListGetter: IEventsListGetter = (store, flags = {}) => {
  const { data, list, UI } = store.events
  return flags.isSearchFilter
    ? list.filter(eventId => data[eventId].name.value.search(new RegExp(UI.searchTerm, 'i')) > -1)
    : list
}

export const { eventFactory, eventSelectedFactory } = selectorFactoriesCreator([
  { name: 'eventFactory', selectors: [eventIdGetter, eventsDataGetter], func: (id, data) => data[id] || {} },
  {
    name: 'eventSelectedFactory',
    selectors: [eventIdGetter, selectedToRemovingGetter],
    func: (id, data) => data[id] || false,
  },
])