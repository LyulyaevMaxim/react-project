import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { store, history } from './store'
// import loadPolyfills from "./loadPolyfills";
import App from './components/app'

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root')
)
// loadPolyfills().then(// )
