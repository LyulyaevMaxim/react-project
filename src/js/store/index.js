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

const rootReducer = history =>
  combineReducers({
    ...['auth', 'items', 'documents', 'roles', 'discounts', 'products'].reduce(
      (accumulator, currentModule) => ({
        ...accumulator,
        [currentModule.substring(currentModule.lastIndexOf('/') + 1)]: require(`./${currentModule}/reducer`).default,
      }),
      { router: connectRouter(history) }
    ),
  })

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = isDev ? composeEnhancers(applyMiddleware(...middlewares)) : applyMiddleware(...middlewares)

export const store = createStore(rootReducer(history), enhancer)
