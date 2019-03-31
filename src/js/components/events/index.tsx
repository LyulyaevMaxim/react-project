import React from 'react'
import Loadable from 'react-loadable'
import styles from './styles.pcss'

const EventList = Loadable({
  loader: () => import('./list' /* webpackChunkName: "components-events-list" */).then(module => module.EventsList),
  loading: () => null,
})

export function Events() {
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
