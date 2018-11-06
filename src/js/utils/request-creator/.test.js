import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { set } from 'lodash'
import { requestCreator, requestTypes, requestStatuses, getError } from './index'

const mockStore = configureStore([thunk])

const correctData = {
  type: 'ACTION_TYPE',
  requestType: requestTypes.GET_REQUEST,
  requestUrl: 'https://github.com/LyulyaevMaxim',
  resultField: '', //path from object keys
  // headers,
  // sendObject,
  // meta,
  callbacks: { successful: () => {} },
}

describe('requestCreator', () => {
  const dispatch = jest.fn()
  ;[
    { field: 'type', testValues: [undefined, null, ''] },
    { field: 'requestType', testValues: [undefined, null, '', 'CUSTOM_TYPE'] },
    { field: 'requestUrl', testValues: [undefined, null, '', 'url', 'htt://g.ru'] },
    // { field: 'callbacks.successful', testValues: [true, 1, 'text'] },
  ].forEach(({ field, testValues }) =>
    it(`${field} is incorrect`, () => {
      testValues.forEach(value => {
        expect(() => requestCreator(dispatch, set({ ...correctData }, field, value))).toThrow(
          getError({ [field]: value })
        )
      })
    })
  )

  it('request is successfull', async () => {
    const store = mockStore({})
    await requestCreator(store.dispatch, correctData)
    expect(store.getActions().map(({ type }) => type)).toEqual([
      correctData.type + requestStatuses.REQUEST,
      correctData.type + requestStatuses.SUCCESS,
    ])
  })

  it('request is failed', async () => {
    const store = mockStore({})
    await requestCreator(store.dispatch, { ...correctData, requestUrl: 'http://example.dev.com' })
    expect(store.getActions().map(({ type }) => type)).toEqual([
      correctData.type + requestStatuses.REQUEST,
      correctData.type + requestStatuses.FAIL,
    ])
  })
})
