import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
// import perfomanceTools from 'react-perf-devtool'
import reducer from './reducers'

export const history = createHistory()
const routeMiddleware = routerMiddleware(history)
const middlewares = [thunk, routeMiddleware]
const isDev = process.env.NODE_ENV === `development`
if (isDev) {
	// perfomanceTools()

	middlewares.push(
		createLogger({
			collapsed: (getState, action, logEntry) => !logEntry.error,
			diff: true
		})
	)
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = isDev
	? composeEnhancers(applyMiddleware(...middlewares))
	: applyMiddleware(...middlewares)

export const store = createStore(reducer, enhancer)
