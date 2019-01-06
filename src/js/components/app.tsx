import React from 'react'
import { hot } from 'react-hot-loader/root'
import { Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
import { initialPath } from '~constants'
import '~css/index.pcss'
import { IRoute } from '~types/index'
import Header from '~components/header'

const ContactForm: React.ComponentType<{}> = Loadable({
  loader: () => import('~components/contact-form' /* webpackChunkName: "components->contact-form" */),
  loading: () => null,
})

const routes: IRoute[] = [
  {
    title: 'Главная',
    path: initialPath,
    component: Loadable({
      loader: () => import('~components/content' /* webpackChunkName: "components->content" */),
      loading: () => null,
    }),
  },
  {
    title: 'Форма',
    path: `${initialPath}form`,
    component: Loadable({
      loader: () => import('~components/form-demo' /* webpackChunkName: "components->form-demo" */),
      loading: () => null,
    }),
  },
  {
    title: 'Таблица',
    path: `${initialPath}table`,
    component: Loadable({
      loader: () => import('~components/products' /* webpackChunkName: "components->products" */),
      loading: () => null,
    }),
  },
]

const Page404 = () => <h1>Упс.. 404</h1>

const App = () => (
  <React.Fragment>
    <Header {...{ routes }} />
    <Switch>
      <Route exact path="/404" component={Page404} />
      {routes.map(({ path, component, title }, index) => (
        <Route {...{ path, component, exact: index === 0, key: `route-${title}` }} />
      ))}
    </Switch>
    <ContactForm />
  </React.Fragment>
)

export default hot(App)
