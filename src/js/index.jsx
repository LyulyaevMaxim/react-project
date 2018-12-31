import polyfills from '~modules/polyfills'
import '~css/vendors.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

Promise.all(polyfills)
  .then(() => {
    const { store, history } = require('~store'),
      App = require('./components/app').default,
      { isDev } = require('~constants')

    !isDev &&
      'serviceWorker' in navigator &&
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register(`${window.location.origin}/assets/js/sw.js`)
          .then(registration => console.log('SW registered: ', registration))
          .catch(registrationError => console.log('SW registration failed: ', registrationError))
      })

    ReactDOM.render(
      <Provider {...{ store }}>
        <ConnectedRouter {...{ history }}>
          <App />
        </ConnectedRouter>
      </Provider>,
      document.getElementById('root')
    )
  })
  .catch(error => console.error('Failed fetching polyfills', error))
