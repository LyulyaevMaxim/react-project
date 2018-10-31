import React from 'react'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk'

const history = createBrowserHistory()
const middlewares = [thunk, routerMiddleware(history)]

const rootReducer = combineReducers({})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(applyMiddleware(...middlewares))

const store = createStore(connectRouter(history)(rootReducer), enhancer)

export function Provider({ story }) {
  return (
    <ReduxProvider {...{ store }}>
      <ConnectedRouter {...{ history }}>{story}</ConnectedRouter>
    </ReduxProvider>
  )
}
