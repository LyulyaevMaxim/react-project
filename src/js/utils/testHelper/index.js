import { set, has, cloneDeep } from 'lodash'

export function errorsMapCreator(settings) {
  if (!Array.isArray(settings) || !settings.length) throw new Error(`'settings' should be an 'array'`)
  return (field = {}) => settings.forEach((fieldName, getText) => has(field, fieldName) && getText(field[fieldName]))
}

export function testsCreator({ func, getError, validations, data }) {
  if (typeof func !== 'function') throw new Error(`'func' should be an 'function'`)
  if (typeof getError !== 'function') throw new Error(`'getErrors' should be an 'function'`)
  if (!Array.isArray(validations) || !validations.length) throw new Error(`'validations' should be an 'array'`)
  if (Object.prototype.toString.call(data) !== '[object Object]') throw new Error(`'data' should be an 'object'`)
  validations.forEach(({ field, testValues }) => {
    it(`${field} is incorrect`, () => {
      testValues.forEach(value => {
        expect(() => func(set(cloneDeep(data), field, value))).toThrow(getError({ [field]: value }))
      })
    })
  })
}
