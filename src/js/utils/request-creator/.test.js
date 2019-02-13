import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { testsCreator } from '~utils/testHelper'
import { requestCreator, requestTypes, requestStatuses } from './index'

const mockStore = configureStore([thunk])

const correctData = {
  type: 'ACTION_TYPE',
  requestType: requestTypes.GET_REQUEST,
  requestUrl: 'https://github.com/LyulyaevMaxim',
}

describe('requestCreator', () => {
  testsCreator({
    func: action => requestCreator(jest.fn(), action),
    getError: requestCreator.getError,
    validations: [
      { field: 'type', testValues: [undefined, null, ''] },
      { field: 'requestType', testValues: [undefined, null, '', 'CUSTOM_TYPE'] },
      { field: 'requestUrl', testValues: [undefined, null, '', 'url', 'htt://g.ru'] },
      { field: 'callbacks.successful', testValues: [true, 1, 'text', [1]] },
      { field: 'callbacks.unfortunate', testValues: [true, 1, 'text', [1]] },
    ],
    data: correctData,
  })

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
