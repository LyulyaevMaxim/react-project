import produce from 'immer'
import { REQUEST, SUCCESS } from '~utils/request-creator'

const { DOCUMENTS_GET } = require('./constants').default
const initialState = {
  loadingDocuments: null,
  intoShops: {},
}

export default produce((state = initialState, { type, payload = {}, other = {} }) => {
  switch (type) {
    case DOCUMENTS_GET + REQUEST: {
      state.loadingDocuments = true
      break
    }

    case DOCUMENTS_GET + SUCCESS: {
      const { storeId } = other
      const { data, list } = divideIntoShops({ data: payload })
      state.loadingDocuments = false
      state.data = { ...state.data, ...data }
      state.intoShops[storeId || 'ALL'] = list.reverse()
      break
    }

    default:
      return state
  }
})

const divideIntoShops = ({ data }) =>
  data.reduce(
    (acc, document) => {
      const modifiedUuid = `${document.uuid}-${document.type}`
      return { data: { ...document, uuid: modifiedUuid }, list: [...acc.list, modifiedUuid] }
    },
    { data: {}, list: [] }
  )
