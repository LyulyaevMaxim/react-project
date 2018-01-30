import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
// import { ConnectedRouter } from 'react-router-redux'
// import { Route, Switch } from 'react-router-dom'
import { store, history } from './store'
import App from './app'

ReactDOM.render(
	<Provider store={store}>
		<App />
		{/*<ConnectedRouter history={history}>
		<Switch>
			<Route path="/" exact component={App} />
			<Route path="/404" component={App} />
		</Switch>
		</ConnectedRouter> */}
	</Provider>,
	document.getElementById('root')
)
