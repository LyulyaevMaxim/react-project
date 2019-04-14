import React from 'react'
import { hot } from 'react-hot-loader/root'
import { Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
import { Helmet } from 'react-helmet'
import { initialPath } from '~constants'
import '~css/index.pcss'
import { IRoute } from '~types/index'
import { Header } from '~components/header'

/*const ContactForm: React.ComponentType<{}> = Loadable({
  loader: () => import('~components/contact-form' /!* webpackChunkName: "components->contact-form" *!/),
  loading: () => null,
})*/

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
      loader: () =>
        import('~components/events' /* webpackChunkName: "components-events" */).then(module => module.Events),
      loading: () => null,
    }),
  },
  /*{
    title: 'Форма',
    path: `${initialPath}form`,
    isExact: true,
    component: Loadable({
      loader: () => import('~components/form-demo' /!* webpackChunkName: "components->form-demo" *!/),
      loading: () => null,
    }),
  },*/
  /*{
    title: 'Таблица',
    path: `${initialPath}table`,
    isExact: true,
    component: Loadable({
      loader: () => import('~components/products' /!* webpackChunkName: "components->products" *!/),
      loading: () => null,
    }),
  },*/
]

const PageNotFound = () => (
  <React.Fragment>
    <Helmet defaultTitle="My Site" titleTemplate="MySite.com - %s">
      {/*<html lang="en" />*/}
      <title>Page 404</title>
      {/*<meta name="description" content="Helmet application" />*/}
      {/*<meta property="og:type" content="article" />*/}
      {/*{locales.map((locale) =>
        <link rel="alternate" href="http://example.com/{locale}" hrefLang={locale} key={locale}/>
        )}*/}
    </Helmet>
    <h1>404</h1>
  </React.Fragment>
)

interface IProps {}

export const App: React.FC<IProps> = hot(() => {
  return (
    <React.Fragment>
      <Helmet defaultTitle="React Project" titleTemplate="React Project - %s" />
      <Header {...{ routes }} />
      <Switch>
        {routes.map(({ path, component, isExact, title }) => (
          <Route {...{ path, component, exact: isExact, key: `route-${title}` }} />
        ))}
        {/*<Route path={["/users/:id", "/profile/:id"]} component={User} />*/}
        <Route component={PageNotFound} />
      </Switch>
      {/*<ContactForm />*/}
    </React.Fragment>
  )
})
