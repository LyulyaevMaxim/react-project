import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import { Route, Switch } from 'react-router-dom'
import * as authActions from '~store/auth/actions'
import MainPage from './main-page'
import '~css/index.scss'

class App extends Component {
  componentDidMount() {
    this.authorization()
  }

  render() {
    const path = require('~constants').initialPath
    return (
      <Switch>
        <Route {...{ path, component: MainPage }} />
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

  authorization = () => {
    const params = this.props.location.search.substring(1).split('&')
    let token, extraToken
    params.forEach(el => {
      if (el.match('token')) token = el.slice('token='.length)
      else if (el.match('extraToken')) extraToken = el.slice('extraToken='.length)
    })
    this.props.setAuthorization({ token, extraToken })
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
