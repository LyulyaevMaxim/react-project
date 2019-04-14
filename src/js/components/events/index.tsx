import React from 'react'
import Loadable from 'react-loadable'
import { Helmet } from 'react-helmet'
import styles from './styles.pcss'

const EventList = Loadable({
  loader: () => import('./list' /* webpackChunkName: "components-events-list" */),
  render(module, props) {
    const Component = module.EventsList
    return <Component {...props} />
  },
  loading: () => null,
})

export const Events: React.FC<{}> = () => {
  return (
    <section className={styles.eventsWrapper}>
      <Helmet>
        <title>Events</title>
      </Helmet>
      {/*<header>
        <h2>Мероприятия</h2>
      </header>*/}
      <main>
        <EventList />
      </main>
    </section>
  )
}
