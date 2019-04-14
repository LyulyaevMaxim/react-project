import { normalize, schema } from 'normalizr'
import { get } from 'lodash-es'
import uuid from 'uuid-random'

export function normalizeEntity({ data, entities = 'field', key = 'id' }) {
  const entity = new schema.Entity(entities, {}, { idAttribute: key })
  const mySchema = { [entities]: [entity] }
  const res = normalize({ [entities]: data }, mySchema)
  return { data: res.entities[entities], list: res.result[entities] }
}

export const normalizeByField = ({ data = [], field = 'id' }) =>
  data.reduce(
    (accumulator, element) => {
      const fieldValue = get(element, field)
      if (fieldValue) {
        accumulator.list.push(fieldValue)
        accumulator.data[fieldValue] = element
      }
      return accumulator
    },
    { data: {}, list: [] }
  )

export const deepRemoveFields = ({ object = {}, fields = [] }) => {
  const res = {}
  Object.getOwnPropertyNames(object).forEach(field => {
    if (!fields.some(removeField => removeField === field)) {
      res[field] = typeof object[field] !== 'object' ? object[field] : deepRemoveFields({ obj: object[field], fields })
    }
  })
  return res
}

export const getUuid = () => uuid()
