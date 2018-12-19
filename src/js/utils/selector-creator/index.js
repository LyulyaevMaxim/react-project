import { createSelector } from 'reselect'
import { get } from 'lodash'
import { errorsMapCreator } from '~utils/testHelper'

export function selectorsCreator(settings) {
  const { getError, defaultsMap } = selectorsCreator
  if (!Array.isArray(settings) || !settings.length) throw new Error(getError({ settings }))
  return settings.reduce((acc, { path, type, name }, index) => {
    if (typeof name !== 'string' || !name) throw new Error(getError({ type }))
    if (typeof defaultsMap[type] === 'undefined') throw new Error(getError({ type }))
    return { ...acc, [name]: (store, props) => get({ store, props }, path, defaultsMap[type]) }
  }, {})
}

selectorsCreator.defaultsMap = {
  string: '',
  object: {},
  array: [],
  other: null
}

selectorsCreator.getError = errorsMapCreator([
  ['settings', v => `Field 'settings' should be not empty an 'array', but not ${v}`],
  ['name', v => `${v} is incorrect name`],
  ['type', v => `${v} is unknown type (${Object.keys(selectorsCreator.defaultsMap)})`],
])

export function selectorFactoriesCreator(settings) {
  const { getError } = selectorFactoriesCreator
  if (!Array.isArray(settings) || !settings.length) throw new Error(getError({ settings }))
  return settings.reduce((acc, { name, selectors, func }, index) => {
    if (typeof name !== 'string' || !name) throw new Error(getError({ name }))
    if (!Array.isArray(selectors) || !selectors.length) throw new Error(getError({ selectors }))
    if (typeof func !== 'function') throw new Error(getError({ func }))
    return { ...acc, [name]: () => createSelector(selectors, func) }
  }, {})
}

selectorFactoriesCreator.getError = errorsMapCreator([
  ['settings', v => `Field 'settings' should be not empty an 'array', but not ${v}`],
  ['name', v => `${v} is incorrect 'name'`],
  ['selectors', v => `Field 'selectors' should be not empty an 'array', but not ${v}`],
  ['func', v => `Fiend 'func' should be a 'function', but not ${v}`],
])
