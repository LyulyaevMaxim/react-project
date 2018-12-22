import React, { Fragment } from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch } from 'react-router-dom'
import loadable from 'react-loadable'
import { initialPath } from '~constants'
import '~css/index.pcss'
import Header from '~components/header'

const ContactForm = loadable({
  loader: () => import('~components/contact-form' /* webpackChunkName: "components->contactForm */),
  loading: () => null,
})

const routes = [
  {
    title: 'Главная',
    path: initialPath,
    component: loadable({
      loader: () => import('~components/content' /* webpackChunkName: "components->content" */),
      loading: () => null,
    }),
  },
  {
    title: 'Форма',
    path: `${initialPath}form`,
    component: loadable({
      loader: () => import('~components/form-demo' /* webpackChunkName: "components->form-demo" */),
      loading: () => null,
    }),
  },
  {
    title: 'Таблица',
    path: `${initialPath}table`,
    component: loadable({
      loader: () => import('~components/products' /* webpackChunkName: "components->products" */),
      loading: () => null,
    }),
  },
]

const App = () => (
  <Fragment>
    <Header {...{ routes }} />
    <Switch>
      <Route
        {...{
          exact: true,
          path: '/404',
          render: () => <h1>Упс.. 404</h1>,
        }}
      />
      {routes.map(({ path, component, title }, index) => (
        <Route {...{ path, component, exact: index === 0, key: `route-${title}` }} />
      ))}
    </Switch>
    <ContactForm />
  </Fragment>
)

export default hot(module)(App)
