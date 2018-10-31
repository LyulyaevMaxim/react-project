import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import { Route, Switch } from 'react-router-dom'
import loadable from 'loadable-components'
import { loadHelper } from '~utils/loadHelper'

const preloadModules = [{ name: 'styles', module: loadable(() => import('~css/index.pcss')) }]

class App extends Component {
  static path = require('~constants').initialPath

  componentDidMount() {
    loadHelper({ preloadModules, setState: this.setState.bind(this) })
  }

  render() {
    if (!this.state || this.state.isAsyncModulesLoading !== false) return null
    return (
      <Switch>
        <Route {...{ path: App.path, component: loadable(() => import('./main-page')) }} />
        <Route
          {...{
            exact: true,
            path: '/404',
            render: () => <h1>Упс.. 404</h1>,
          }}
        />
      </Switch>
    )
  }
}

const mapStateToProps = ({ auth, router: { location } }) => ({ auth, location })
const mapDispatchToProps = require('~store/auth/actions')

export default hot(module)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
