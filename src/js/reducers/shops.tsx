import { REQUEST, SUCCESS, FAIL, CACHE, GET_SHOPS, GET_PRODUCTS } from '~constants'
// import { normalizeEntity } from '~utils/normalize.tsx'

const initialState = {
	shops: {},
	loadingShops: null,
	activeShop: ''
}

export default (state = initialState, { type, payload = {}, other = {} }) => {
	const { error } = payload
	const { shopUuid } = other

	switch (type) {
		case GET_SHOPS + REQUEST: {
			return { ...state, loadingShops: true }
		}

		case GET_SHOPS + SUCCESS: {
			return {
				...state,
				loadingShops: false,
				shops: {
					...state.shops,
					// ...normalizeEntity({ data: payload, entities: 'shops', key: 'docId' })
				}
			}
		}

		case GET_SHOPS + FAIL: {
			return { ...state, loadingShops: null, error }
		}

		case GET_PRODUCTS + REQUEST: {
			return { ...state, loadingProducts: true }
		}

		case GET_PRODUCTS + SUCCESS: {
			return {
				...state,
				loadingProducts: false,
				activeShop: shopUuid,
				products: {
					...state.products,
					// [shopUuid]: normalizeEntity({ data: payload, entities: 'products', key: 'uuid' })
				}
			}
		}

		case GET_PRODUCTS + CACHE: {
			return {
				...state,
				activeShop: payload.uuid
			}
		}

		case GET_PRODUCTS + FAIL: {
			return { ...state, loadingProducts: null, error }
		}

		default:
			return state
	}
}
