import * as I from './index.d'
import React from 'react'
import { connect } from 'react-redux'
import Loadable from 'react-loadable'
import { eventsSelectors } from '~store/events/selectors'
import * as eventsActions from '~store/events/actions'
import { EventLine } from './line'
import styles from './styles.pcss'

const PopupAddEvent = Loadable({
    loader: () =>
      import('./popups/addEvent' /* webpackChunkName: "components-events-addEventPopup" */).then(
        module => module.PopupAddEvent
      ),
    render: () => null,
    loading: () => null,
  }),
  PopupDeleteEvents = Loadable({
    loader: () =>
      import('./popups/deleteEvents' /* webpackChunkName: "components-events-deleteEventsPopup" */).then(
        module => module.PopupDeleteEvents
      ),
    render: () => null,
    loading: () => null,
  })

enum shortPopupNames {
  ADD_EVENT = 'AddEvent',
  DELETE_EVENTS = 'DeleteEvents',
}

class List extends React.Component<I.IProps, I.IState> {
  readonly state = { errors: [], isOpenPopupAddEvent: null, isOpenPopupDeleteEvents: null }

  componentDidMount(): void {
    ;[['fetchEvents', this.props.fetchEvents], ['fetchPlaces', this.props.fetchPlaces]].forEach(([funcName, func]) =>
      func().then(({ errors }) => this.handleError({ errorName: funcName, error: errors }))
    )
  }

  componentDidCatch(error: Error) {
    this.handleError({ errorName: `componentDidCatch:${error.message}`, error })
  }

  readonly handleError = ({ errorName, error }: { errorName: string; error: Error }) =>
    this.setState({ errors: [...this.state.errors, { errorName, error }] })

  readonly handleSelectedEvents = ({ isAll, eventId }: { isAll?: boolean; eventId?: string }) => {
    try {
      this.props.selectedEvent({ isAll, eventId })
    } catch (error) {
      this.handleError({ errorName: 'handleSelectedEvents', error })
    }
  }

  readonly handleTogglePopup = (popupName: shortPopupNames): any => {
    try {
      const key = `isOpenPopup${popupName}`
      if (key === 'isOpenPopupAddEvent') this.setState({ ['isOpenPopupAddEvent']: !this.state[key] })
      else if (key === 'isOpenPopupDeleteEvents') this.setState({ ['isOpenPopupDeleteEvents']: !this.state[key] })
    } catch (error) {
      this.handleError({ errorName: 'handleTogglePopup', error })
    }
  }
  readonly handleTogglePopupAddEvent = () => this.handleTogglePopup(shortPopupNames.ADD_EVENT)
  readonly handleTogglePopupDeleteEvents = () => this.handleTogglePopup(shortPopupNames.DELETE_EVENTS)

  readonly handleSearch = (event: React.SyntheticEvent) =>
    this.props.eventsSearch((event.target as HTMLInputElement).value)

  render(): React.ReactNode {
    const { isLoading, isAllSelected, isAnyoneSelected, eventsPlaces } = this.props
    const { isOpenPopupAddEvent, isOpenPopupDeleteEvents } = this.state
    return (
      <React.Fragment>
        <table className={styles.table}>
          <thead>
            <tr className={styles.functionalLine}>
              <th>
                <button onClick={this.handleTogglePopupAddEvent} className={styles.addEventButton} />
                <button
                  onClick={this.handleTogglePopupDeleteEvents}
                  disabled={!isAnyoneSelected}
                  className={styles.deleteEventsButton}
                />
              </th>
              <th>
                <input placeholder={'Поиск'} onChange={this.handleSearch} className={styles.searchEventsButton} />
              </th>
            </tr>
            <tr className={styles.line}>
              <th className={styles.columnChecked}>
                <input
                  {...{
                    type: 'checkbox',
                    id: 'events-all-checked',
                    onChange: () => this.handleSelectedEvents({ isAll: true }),
                    checked: isLoading === false && isAllSelected,
                  }}
                />
                <label htmlFor={'events-all-checked'} />
              </th>
              <th className={styles.columnName}>Название</th>
              <th className={styles.columnDate}>Дата</th>
              <th className={styles.columnPlace}>Место проведения</th>
            </tr>
          </thead>
          <tbody>
            {isLoading !== false || eventsPlaces.isLoading !== false ? (
              <tr className={styles.warningLine}>
                <td>Loading...</td>
              </tr>
            ) : this.props.eventsList.length ? (
              this.props.eventsList.map(eventId => (
                <EventLine {...{ eventId, eventsPlaces, handleSelected: this.handleSelectedEvents, key: eventId }} />
              ))
            ) : (
              <tr className={styles.warningLine}>
                <td>Мероприятия не найдены</td>
              </tr>
            )}
          </tbody>
        </table>
        {PopupAddEvent && <PopupAddEvent isOpen={isOpenPopupAddEvent} handleOpen={this.handleTogglePopupAddEvent} />}
        {PopupDeleteEvents && (
          <PopupDeleteEvents isOpen={isOpenPopupDeleteEvents} handleOpen={this.handleTogglePopupDeleteEvents} />
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (store: I.IStore): I.IReduxProps => {
  const eventsList = eventsSelectors.eventsListGetter(store, { isSearchFilter: true }),
    selectedToRemoving = eventsSelectors.selectedToRemovingGetter(store)
  return {
    isLoading: eventsSelectors.isLoading(store),
    isAllSelected: Boolean(eventsList.length && Object.keys(selectedToRemoving).length === eventsList.length),
    isAnyoneSelected: Boolean(eventsList.length && Object.keys(selectedToRemoving).length),
    eventsList,
    eventsPlaces: eventsSelectors.placesGetter(store),
  }
}

const mapDispatchToProps = {
  fetchPlaces: eventsActions.fetchPlaces,
  fetchEvents: eventsActions.fetchEvents,
  selectedEvent: eventsActions.selectedEvent,
  eventsSearch: eventsActions.eventsSearch,
}

export const EventsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(List)
