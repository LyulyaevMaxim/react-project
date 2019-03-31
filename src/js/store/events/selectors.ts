import { selectorsCreator, selectorFactoriesCreator, SelectorTypes } from '~utils/selector-creator'
import { ISelectors, IEventFactory } from './selectors.d'

const selectors = selectorsCreator([
  { name: 'isLoading', path: 'store.events.isLoading', type: SelectorTypes.flag },
  { name: 'isSaving', path: 'store.events.isSaving', type: SelectorTypes.flag },
  { name: 'isDeleting', path: 'store.events.isDeleting', type: SelectorTypes.flag },
  { name: 'eventsDataGetter', path: 'store.events.data', type: SelectorTypes.object },
  { name: 'eventIdGetter', path: 'props.eventId', type: SelectorTypes.string },
  { name: 'placesGetter', path: 'store.events.places', type: SelectorTypes.object },
  { name: 'selectedToRemovingGetter', path: 'store.events.UI.selectedToRemoving', type: SelectorTypes.object },
]) as {
  isLoading: ISelectors['isLoading']
  isSaving: ISelectors['isSaving']
  isDeleting: ISelectors['isDeleting']
  eventsDataGetter: ISelectors['eventsDataGetter']
  eventIdGetter: ISelectors['eventIdGetter']
  placesGetter: ISelectors['placesGetter']
  selectedToRemovingGetter: ISelectors['selectedToRemovingGetter']
}

export const eventsSelectors = {
  ...selectors,
  eventsListGetter: ((store, flags = {}) => {
    const { data, list, UI } = store.events
    return flags.isSearchFilter
      ? list.filter(eventId => data[eventId].name.value.search(new RegExp(UI.searchTerm, 'i')) > -1)
      : list
  }) as ISelectors['eventsListGetter'],
  ...(selectorFactoriesCreator([
    {
      name: 'eventFactory',
      selectors: [selectors.eventIdGetter, selectors.eventsDataGetter],
      func: (id, data) => data[id],
    },
    {
      name: 'eventSelectedFactory',
      selectors: [selectors.eventIdGetter, selectors.selectedToRemovingGetter],
      func: (id, data) => data[id] || false,
    },
  ]) as { eventFactory: IEventFactory; eventSelectedFactory }),
}
