import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router'
import { createBrowserHistory, History } from 'history'
import thunkMiddleware from 'redux-thunk'
import { productsReducer } from './products/reducer'
import productsTypes from './products/reducer.d'
import { IEvents, eventsReducer } from './events/reducer'
import { isDev } from '~constants'

export interface IStore {
  router: RouterState
  products: productsTypes.IState
  events: IEvents.IState
}

export const history: History = createBrowserHistory()

export function configureStore(preloadedState?: IStore) {
  const middlewaresEnhancer = applyMiddleware(thunkMiddleware, routerMiddleware(history)),
    composedEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose,
    enhancer = isDev ? composedEnhancers(middlewaresEnhancer) : middlewaresEnhancer

  return createStore(
    combineReducers<IStore>({
      router: connectRouter(history),
      products: productsReducer,
      events: eventsReducer,
    }),
    preloadedState,
    enhancer
  )
}
