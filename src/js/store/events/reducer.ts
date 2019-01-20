import produce from 'immer'
import IActions from './actions.d'
import { IEvent, IPlace, IState } from './reducer.d'
import { mockPlacesData, mockEventsData } from './fakeData'

const initialEvent: IEvent = {
  eventId: '',
  name: { value: '' },
  date: { value: '' },
  place: { value: '' },
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

export default (state: IState = initialState, action: IActions) =>
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
        let eventId
        do {
          eventId = `id${Math.random()}`
        } while (state.data[eventId])
        draft.list.push(eventId)
        draft.data[eventId] = { eventId, name: { value: name }, date: { value: date }, place: { value: place } }
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