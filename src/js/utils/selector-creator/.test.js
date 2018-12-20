import { selectorsCreator, selectorFactoriesCreator } from './index'
import { testsCreator } from '~utils/testHelper'
import { set, cloneDeep } from 'lodash'

describe('selectorsCreator', () => {
  testsCreator({
    func: settings => selectorsCreator([settings]),
    getError: selectorsCreator.getError,
    validations: [
      { field: 'type', testValues: [undefined, null, ''] },
      { field: 'name', testValues: [undefined, null, 1, true, {}, [], ''] },
    ],
    data: { name: 'itemIdGetter', path: 'props.itemId', type: 'string' },
  })
})

describe('selectorFactoriesCreator', () => {
  const { itemIdGetter, itemsDataGetter } = selectorsCreator([
      { name: 'itemIdGetter', path: 'props.itemId', type: 'string' },
      { name: 'itemsDataGetter', path: 'store.items.data', type: 'object' },
    ]),
    factorySettings = {
      name: 'itemFactory',
      selectors: [itemIdGetter, itemsDataGetter],
      func: (id, data) => data[id] || {},
    }

  testsCreator({
    func: settings => selectorFactoriesCreator([settings]),
    getError: selectorFactoriesCreator.getError,
    data: factorySettings,
    validations: [
      { field: 'name', testValues: [undefined, null, {}, [], 1, true, ''] },
      { field: 'selectors', testValues: [undefined, null, {}, [], 1, ''] },
      { field: 'func', testValues: [undefined, null, {}, [1], 1, '1'] },
    ],
  })
})
