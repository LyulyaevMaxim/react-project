import produce from 'immer'
import { mockPlacesData, mockEventsData } from './fakeData'
import IEventsActions from './actions.d'
import * as IEvents from './reducer.d'
export { IEvents }

type IEvent = IEvents.IEvent
type IState = IEvents.IState
type IPlace = IEvents.IPlace
const { ActionTypes } = IEvents

const initialEvent: IEvent = {
  eventId: '',
  name: { value: '' },
  date: { value: '' },
  place: { value: '' },
}

const initialState: IState = {
  isLoading: null,
  isSaving: null,
  isDeleting: null,
  list: [],
  data: {},
  places: { options: [], optionsMap: {}, isLoading: null },
  UI: {
    selectedToRemoving: {},
    searchTerm: '',
  },
}

export const eventsReducer = (state: IState = initialState, action: IEventsActions) =>
  produce<IState>(state, draft => {
    switch (action.type) {
      case ActionTypes.PLACES_FETCH_REQUEST: {
        draft.places.isLoading = true
        break
      }

      case ActionTypes.PLACES_FETCH_FAIL: {
        draft.places = { ...state.places, ...placesToOptions({ places: mockPlacesData }) }
        draft.places.isLoading = false
        break
      }

      case ActionTypes.PLACES_FETCH_SUCCESS: {
        draft.places = { ...state.places, ...placesToOptions({ places: action.payload }) }
        draft.places.isLoading = false
        break
      }

      case ActionTypes.EVENTS_FETCH_REQUEST: {
        draft.isLoading = true
        break
      }

      case ActionTypes.EVENTS_FETCH_FAIL: {
        const normalizedEvents = eventsNormalize({ events: mockEventsData })
        draft.data = normalizedEvents.data
        draft.list = normalizedEvents.list
        draft.isLoading = false
        break
      }

      case ActionTypes.EVENTS_FETCH_SUCCESS: {
        const normalizedEvents = eventsNormalize({ events: action.payload })
        draft.data = normalizedEvents.data
        draft.list = normalizedEvents.list
        draft.isLoading = false
        break
      }

      case ActionTypes.EVENT_SAVE_REQUEST: {
        draft.isSaving = true
        break
      }

      case ActionTypes.EVENT_SAVE_FAIL: {
        const { name, date, place } = action.meta
        // TODO: now I create the event locally, later need will handle object with errors and display them.
        // It means that IEventNew must be an object which has "value" and "errors?" properties
        let eventId
        do {
          eventId = `id${Math.random()}`
        } while (state.data[eventId])
        draft.list.push(eventId)
        draft.data[eventId] = { eventId, name: { value: name }, date: { value: date }, place: { value: place } }
        draft.isSaving = false
        break
      }

      case ActionTypes.EVENT_SAVE_SUCCESS: {
        draft.list.push(action.payload.eventId)
        draft.data[action.payload.eventId] = action.payload
        draft.isSaving = false
        break
      }

      case ActionTypes.EVENTS_DELETE_REQUEST: {
        draft.isDeleting = true
        break
      }

      case ActionTypes.EVENTS_DELETE_FAIL: {
        const listToRemoving = Object.keys(state.UI.selectedToRemoving)
        listToRemoving.forEach(eventId => delete draft.data[eventId])
        draft.list = state.list.filter(eventId => listToRemoving.every(v => v !== eventId))
        draft.UI.selectedToRemoving = initialState.UI.selectedToRemoving
        draft.isDeleting = false
        break
      }

      case ActionTypes.EVENT_SELECTED: {
        if ('isAll' in action.payload)
          draft.UI.selectedToRemoving =
            Object.keys(state.UI.selectedToRemoving).length !== state.list.length
              ? state.list.reduce((acc, eventId) => ({ ...acc, [eventId]: true }), {})
              : {}
        else if (!state.UI.selectedToRemoving[action.payload.eventId])
          draft.UI.selectedToRemoving[action.payload.eventId] = true
        else delete draft.UI.selectedToRemoving[action.payload.eventId]
        break
      }

      case ActionTypes.EVENTS_SEARCH: {
        draft.UI.searchTerm = action.payload.searchTerm
        break
      }
    }

    return draft
  })

function eventsNormalize({ events }: { events: Array<IEvent> }) {
  return events.reduce(
    (accumulator, event) => {
      accumulator.list.push(event.eventId)
      accumulator.data[event.eventId] = event
      return accumulator
    },
    { list: [], data: {} } as { list: Array<IEvent['eventId']>; data: { [key: string]: IEvent } }
  )
}

function placesToOptions({ places }: { places: Array<IPlace> }) {
  return places.reduce(
    (acc, { placeId, name }) => {
      const option = { value: placeId, label: name.value }
      acc.options.push(option)
      acc.optionsMap[placeId] = option
      return acc
    },
    { options: [] as IState['places']['options'], optionsMap: {} as IState['places']['optionsMap'] }
  )
}
