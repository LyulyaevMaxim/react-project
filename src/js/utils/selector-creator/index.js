import { createSelectorWithDependencies as createSelector } from 'reselect-tools'
import { get } from 'lodash'

const defaultsMap = {
  string: '',
  object: {},
  array: [],
}

export const selectorsCreator = (settings = []) =>
  settings.reduce((acc, { path, type, name }, index) => {
    if (typeof defaultsMap[type] === 'undefined')
      throw new Error(`${type} is unknown for selectorCreator (${Object.keys(defaultsMap)})`)
    if (!name) throw new Error(`You must give field 'name' in ${index} element of settings (as string)`)
    return { ...acc, [name]: (store, props) => get({ store, props }, path, defaultsMap[type]) }
  }, {})

export const selectorFactoriesCreator = (settings = []) =>
  settings.reduce((acc, { name, selectors = [], func }, index) => {
    if (!name) throw new Error(`You must give field 'name' in ${index} element of settings (as string)`)
    if (!selectors.length) throw new Error(`You must give field 'selectors' in ${index} element of settings (as array)`)
    if (typeof func !== 'function')
      throw new Error(`You must give field 'func' in ${index} element of settings (as func)`)
    return { ...acc, [name]: () => createSelector(selectors, func) }
  }, {})
