import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import { Route, Switch } from 'react-router-dom'
import * as authActions from '~store/auth/actions'
import MainPage from './main-page'
import '~css/index.scss'

class App extends Component {
  static path = require('~constants').initialPath
  render() {
    return (
      <Switch>
        <Route {...{ path: App.path, component: MainPage }} />
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

const mapStateToProps = ({ auth, routing: { location } }) => ({ auth, location })
const mapDispatchToProps = { ...authActions }

export default hot(module)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
