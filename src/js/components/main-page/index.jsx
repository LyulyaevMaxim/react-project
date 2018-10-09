import React, { Fragment, Component } from 'react'
import loadable from 'loadable-components'
import { Route, Switch } from 'react-router-dom'
import Header from '~components/header'

const ContactForm = loadable(() => import('~components/contact-form'))

class MainPage extends Component {
  static path = require('~constants').initialPath

  static routes = [
    { title: 'Главная', path: MainPage.path, component: loadable(() => import('~components/content')) },
    {
      title: 'Таблица',
      path: `${MainPage.path}table`,
      component: loadable(() => import('~components/operationTable')),
    },
    { title: 'Форма', path: `${MainPage.path}form`, component: loadable(() => import('~components/form-demo')) },
    { title: 'Продукты', path: `${MainPage.path}products`, component: loadable(() => import('~components/products')) },
  ]

  render() {
    return (
      <Fragment>
        <Header {...{ routes: MainPage.routes }} />
        <Switch>
          {MainPage.routes.map(({ path, component, title }, index) => (
            <Route {...{ path, component, exact: index === 0, key: `route-${title}` }} />
          ))}
        </Switch>
        <ContactForm />
      </Fragment>
    )
  }
}

export default MainPage
