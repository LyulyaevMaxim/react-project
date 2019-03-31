import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router'
import { createBrowserHistory, History } from 'history'
import thunk from 'redux-thunk'
import { productsReducer } from './products/reducer'
import productsTypes from './products/reducer.d'
import { IEvents, eventsReducer } from './events/reducer'

export const history: History = createBrowserHistory()

const isDev = process.env.NODE_ENV === `development`,
  middlewares = [thunk, routerMiddleware(history)],
  composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose,
  enhancer = isDev ? composeEnhancers(applyMiddleware(...middlewares)) : applyMiddleware(...middlewares)

export interface IStore {
  router: RouterState
  products: productsTypes.IState
  events: IEvents.IState
}

export const store = createStore(
  combineReducers({
    router: connectRouter(history),
    products: productsReducer,
    events: eventsReducer,
  }),
  enhancer
)
