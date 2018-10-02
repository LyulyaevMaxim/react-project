import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk'

// import createSagaMiddleware from 'redux-saga'
// import { createLogger } from 'redux-logger'
// import perfomanceTools from 'react-perf-devtool'

export const history = createBrowserHistory()
// export const sagaMiddleware = createSagaMiddleware()
const middlewares = [thunk, routerMiddleware(history)]
const isDev = process.env.NODE_ENV === `development`

if (isDev) {
  // perfomanceTools()
  // middlewares.push(
  // 	createLogger({ collapsed: (getState, action, logEntry) => !logEntry.error, diff: true })
  // )
}

const rootReducer = combineReducers({
  ...['auth', 'items', 'documents', 'roles', 'discounts'].reduce(
    (accumulator, module) => ({
      ...accumulator,
      [module.substring(module.lastIndexOf('/') + 1)]: require(`./${module}/reducer`).default,
    }),
    {}
  ),
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = isDev
  ? composeEnhancers(applyMiddleware(...middlewares))
  : applyMiddleware(...middlewares)

export const store = createStore(connectRouter(history)(rootReducer), enhancer)
