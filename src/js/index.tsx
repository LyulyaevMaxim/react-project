import polyfills from '~modules/polyfills'
import '~css/vendors.css'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import App from '~components/app'
import { store, history } from '~store/index'
/*import { isDev } from '~constants'*/

Promise.all(polyfills)
  .then(() => {
    /*!isDev && 'serviceWorker' in navigator &&
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register(`${window.location.origin}/assets/js/sw.js`)
        .then(registration => console.log('SW registered: ', registration))
        .catch(registrationError => console.log('SW registration failed: ', registrationError))
    })*/

    ReactDOM.render(
      <Provider {...{ store }}>
        <ConnectedRouter {...{ history }}>
          <App/>
        </ConnectedRouter>
      </Provider>,
      document.getElementById('root') as HTMLElement,
    )
  })
  .catch(error => console.error('Failed fetching polyfills', error))
