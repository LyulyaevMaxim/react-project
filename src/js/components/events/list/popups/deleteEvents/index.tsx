import * as I from './index.d'
import React from 'react'
import { connect } from 'react-redux'
import { PopupPortal } from '~modules/popup'
import * as eventsActions from '~store/events/actions'
import eventsSelectors from '~store/events/selectors'
import styles from '../styles.pcss'

class FormDeleteEvents extends React.Component<I.IProps> {
  static portalId = `popupDeleteEvents-${Math.random()}`
  static classList = [styles.popupDeleteEvents]

  onCancel = (event?: React.SyntheticEvent) => void (event && event.preventDefault(), this.props.handleOpen())

  onDelete = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    await this.props.deleteEvents()
    this.onCancel()
  }

  render() {
    return (
      <PopupPortal
        isOpen={this.props.isOpen}
        portalId={FormDeleteEvents.portalId}
        classList={FormDeleteEvents.classList}
      >
        <form className={styles.form}>
          <header>
            <h2>Предупреждение</h2>
          </header>
          <main>
            <p>Все выбранные мероприятия будут удалены.</p>
            <p>
              <b>Вы уверены?</b>
            </p>
          </main>
          <footer>
            <button onClick={this.onCancel} className={styles.buttonCancel}>
              Отмена
            </button>
            <button onClick={this.onDelete} disabled={!!this.props.isDeleting} className={styles.buttonConfirm}>
              Удалить {!!this.props.isDeleting && '(deleting...)'}
            </button>
          </footer>
        </form>
      </PopupPortal>
    )
  }
}

const PopupDeleteEvents = connect(
  (store: I.IStore): I.IReduxProps => ({ isDeleting: eventsSelectors.isDeleting(store) }),
  { deleteEvents: eventsActions.deleteEvents } as I.IDispatchProps
)(FormDeleteEvents)

export default PopupDeleteEvents