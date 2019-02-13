import React from 'react'
import { hot } from 'react-hot-loader/root'
import { Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
import { initialPath } from '~constants'
import '~css/index.pcss'
import { IRoute } from '~types/index'
import Header from '~components/header'
import { withLanguage } from '~modules/contexts/language'

const ContactForm: React.ComponentType<{}> = Loadable({
  loader: () => import('~components/contact-form' /* webpackChunkName: "components->contact-form" */),
  loading: () => null,
})

const routes: IRoute[] = [
  {
    title: 'Главная',
    path: initialPath,
    isExact: true,
    component: Loadable({
      loader: () => import('~components/content' /* webpackChunkName: "components->content" */),
      loading: () => null,
    }),
  },
  {
    title: 'Мероприятия',
    path: `${initialPath}events`,
    isExact: true,
    component: Loadable({
      loader: () => import('~components/events' /* webpackChunkName: "components-events" */),
      loading: () => null,
    }),
  },
  {
    title: 'Форма',
    path: `${initialPath}form`,
    isExact: true,
    component: Loadable({
      loader: () => import('~components/form-demo' /* webpackChunkName: "components->form-demo" */),
      loading: () => null,
    }),
  },
  {
    title: 'Таблица',
    path: `${initialPath}table`,
    isExact: true,
    component: Loadable({
      loader: () => import('~components/products' /* webpackChunkName: "components->products" */),
      loading: () => null,
    }),
  },
]

const PageNotFound = () => <h1>404</h1>

@withLanguage()
class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header {...{ routes }} />
        <Switch>
          {routes.map(({ path, component, isExact, title }) => (
            <Route {...{ path, component, exact: isExact, key: `route-${title}` }} />
          ))}
          <Route component={PageNotFound} />
        </Switch>
        <ContactForm />
      </React.Fragment>
    )
  }
}

export default hot(App)
