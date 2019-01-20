import React from 'react'
import Loadable from 'react-loadable'
import styles from './styles.pcss'

const EventList = Loadable({
  loader: () => import('./list' /* webpackChunkName: "components-events-list" */),
  loading: () => null,
})

function Events() {
  return (
    <section className={styles.eventsWrapper}>
      {/*<header>
        <h2>Мероприятия</h2>
      </header>*/}
      <main>
        <EventList />
      </main>
    </section>
  )
}

export default Events
