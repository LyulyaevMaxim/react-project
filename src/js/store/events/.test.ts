import produce from 'immer'
// import fc from 'fast-check'
import eventSelectors from './selectors'
import { initialState } from './reducer'
import { mockEventsData } from './fakeData'

describe('EVENTS SELECTORS', () => {

  describe('eventFactory: get event data by id', () => {
    const getEventDataById = (store, props) => eventSelectors.eventFactory()(store, props)

    it('when data exist then we get its', () => {
      const eventData = mockEventsData[0],
        store = produce({ events: initialState }, draft => {
        draft.events.data[eventData.eventId] = eventData
      })
      expect(getEventDataById(store, { eventId: eventData.eventId })).toEqual(eventData)
    })

    it('when no data for such eventId we get undefined', () => {
      const store = { events: initialState }
      expect(getEventDataById(store, { eventId: undefined })).toBeUndefined()
    })
  })

  test.todo('eventSelectedFactory')
})

/*
fc.assert(fc.property(fc.string(), fc.string(), fc.string(), (a, b, c) => {
  expect(contains(b, a + b + c)).toBe(true);
}))

test('should produce ordered array', fc.assert(fc.property(fc.array(fc.integer()), data => {
  const sorted = sort(data);
  for (let idx = 1; idx < sorted.length; ++idx) expect(sorted[idx - 1]).toBeLessThanOrEqual(sorted[idx]);
})))*/
