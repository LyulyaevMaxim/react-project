import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import perfomanceTools from 'react-perf-devtool'
import { createLogger } from 'redux-logger'
import reducer from './reducers'

export const history = createHistory()
const routeMiddleware = routerMiddleware(history)
const middlewares = [thunk, routeMiddleware]
const isDev = process.env.NODE_ENV === `development`

if (isDev) {
	perfomanceTools()
	middlewares.push(
		createLogger({
			collapsed: (getState, action, logEntry) => !logEntry.error,
			diff: true
		})
	)
}

const composeEnhancers = global.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

export const store = createStore(
	reducer,
	isDev ? composeEnhancers(applyMiddleware(...middlewares)) : applyMiddleware(...middlewares)
)
