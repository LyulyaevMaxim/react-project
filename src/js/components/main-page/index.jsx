import React, { Fragment } from 'react'
import loadable from 'loadable-components'
import { Route, Switch } from 'react-router-dom'

const path = require('~constants').initialPath
const Header = loadable(() => import('../header'))
const Content = loadable(() => import('../content'))
const Form = loadable(() => import('../form-demo'))
const Table = loadable(() => import('../table-demo'))
// const Switches = loadable(() => import('../switches-demo'))
// const LazyLoadDemo = loadable(() => import('../lazy-demo'))

function MainPage() {
  const routes = [
    { title: 'Главная', path: `${path}`, component: Content },
    { title: 'Таблица', path: `${path}table`, component: Table },
    { title: 'Форма', path: `${path}form`, component: Form },
    // { title: 'Lazy Load', path: `${path}lazy`, component: LazyLoadDemo },
    // { title: 'Переключатели', path: `${path}switches`, component: Switches },
  ]

  return (
    <Fragment>
      <Header {...{ routes }} />
      <Switch>
        {routes.map(({ path, component, title }, index) => (
          <Route {...{ path, component, exact: index === 0 }} key={`route-${title}`} />
        ))}
      </Switch>
    </Fragment>
  )
}

export default MainPage
