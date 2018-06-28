import { REQUEST, SUCCESS, FAIL, CACHE } from '~constants'
import { DOCUMENTS_GET } from './constants'

const initialState = {
  loadingDocuments: null,
  intoShops: {},
}

export default (state = initialState, { type, payload = {}, other = {} }) => {
  const { error } = payload

  switch (type) {
    case DOCUMENTS_GET + REQUEST: {
      return { ...state, loadingDocuments: true }
    }

    case DOCUMENTS_GET + SUCCESS: {
      const { storeId } = other
      const { data, list } = divideIntoShops({ data: payload })
      return {
        ...state,
        loadingDocuments: false,
        data: { ...state.data, ...data },
        intoShops: {
          ...state.intoShops,
          [storeId ? storeId : 'ALL']: list.reverse(),
        },
      }
    }

    default: {
      return state
    }
  }
}

const divideIntoShops = ({ data }) =>
  data.reduce(
    (res, document) => {
      const modifiedUuid = `${document.uuid}-${document.type}`
      return { data: { ...document, uuid: modifiedUuid }, list: [...res.list, modifiedUuid] }
    },
    { data: {}, list: [] },
  )
