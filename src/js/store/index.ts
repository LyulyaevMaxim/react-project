import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router'
import { createBrowserHistory, History } from 'history'
import thunk from 'redux-thunk'
import * as fromProducts from './products/reducer'

export const history: History = createBrowserHistory()

const isDev = process.env.NODE_ENV === `development`,
  middlewares = [thunk, routerMiddleware(history)],
  composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose,
  enhancer = isDev ? composeEnhancers(applyMiddleware(...middlewares)) : applyMiddleware(...middlewares)

interface IStore {
  router: RouterState
  products: fromProducts.IState
}

export const store = createStore(
  combineReducers<IStore>({ router: connectRouter(history), products: fromProducts.default }),
  enhancer
)

/* {...['auth', 'items', 'documents', 'roles', 'discounts', 'products'].reduce(
  (accumulator, currentModule: string) => ({
    ...accumulator,
    [currentModule.substring(currentModule.lastIndexOf('/') + 1)]: require(`./${currentModule}/reducer`).default,
  }),
  { router: connectRouter(history) }
),} */
