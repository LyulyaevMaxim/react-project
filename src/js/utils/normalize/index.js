import { normalize, schema } from 'normalizr'
import uuid from 'uuid-random'

export function normalizeEntity({ data, entities = 'field', key = 'id' }) {
  const entity = new schema.Entity(entities, {}, { idAttribute: key })
  const mySchema = { [entities]: [entity] }
  const res = normalize({ [entities]: data }, mySchema)
  return { data: res.entities[entities], list: res.result[entities] }
}

export const deepRemoveFields = ({ obj = {}, fields = [] }) => {
  const res = {}
  Object.getOwnPropertyNames(obj).forEach(field => {
    if (!fields.some(removeField => removeField === field)) {
      res[field] =
        typeof obj[field] !== 'object' ? obj[field] : deepRemoveFields({ obj: obj[field], fields })
    }
  })
  return res
}

export const getUuid = () => uuid()
