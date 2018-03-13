import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { store, history, sagaMiddleware } from './store'
import App from './components/app'

ReactDOM.render(
	<Provider {...{ store }}>
		<ConnectedRouter {...{ history }}>
			<App {...{ sagaMiddleware }} />
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root')
)