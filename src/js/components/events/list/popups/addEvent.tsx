import React from 'react'
import { connect } from 'react-redux'
import produce from 'immer'
import { PopupPortal } from '~modules/popup'
import Select from '~modules/select'
import DatePicker from 'react-day-picker/DayPickerInput'
import DatePickerLocalizaton, { formatDate, parseDate } from 'react-day-picker/moment'
import * as eventsSelectors from '~store/events/selectors'
import * as eventsActions from '~store/events/actions'
import styles from './styles.pcss'
import { IStore } from '~store/index'
import 'moment/locale/ru'

interface IPopupProps {
  isOpen: boolean | null
  handleOpen: any
}

PopupAddEvent.portalId = `popupAddEvent-${Math.random()}`
PopupAddEvent.classList = [styles.popupAddEvent]

function PopupAddEvent(props: IPopupProps) {
  return (
    <PopupPortal isOpen={props.isOpen} portalId={PopupAddEvent.portalId} classList={PopupAddEvent.classList}>
      <FormAddEvent handleOpen={props.handleOpen} />
    </PopupPortal>
  )
}

interface IReduxProps {
  eventsPlaces: IStore['events']['places']
  isSaving: IStore['events']['isSaving']
}

interface IDispatchProps {
  saveEvent: any
}

interface IOwnProps {
  handleOpen: IPopupProps['handleOpen']
}

type IProps = IOwnProps & IReduxProps & IDispatchProps

interface IState {
  fieldEventName: string
  fieldEventDate: string
  fieldEventPlace: string
  errors: { [errorName: string]: Error }
}

enum fieldNames {
  eventName = 'fieldEventName',
  eventDate = 'fieldEventDate',
  eventPlace = 'fieldEventPlace',
}

const dateFormat = 'DD.MM.YYYY'

class Form extends React.Component<IProps, IState> {
  defaultState = { fieldEventName: '', fieldEventDate: '', fieldEventPlace: '', errors: {} }
  state = this.defaultState

  componentDidCatch(error: Error) {
    this.handleError({ errorName: `componentDidCatch:${error.message}`, error })
  }
  setStateProxy = (func: ((state: IState) => void)) => this.setState(produce(func))

  readonly handleError = ({ errorName, error }: { errorName: string; error: Error }) =>
    this.setState({ errors: { ...this.state.errors, [errorName]: error } })

  onChangeText = (event: React.SyntheticEvent | null, fieldName?: fieldNames, newValue?) => {
    const { name, value } = !event ? { name: fieldName, value: newValue } : (event.currentTarget as HTMLInputElement)
    this.setState({ [name as fieldNames.eventName]: value })
  }

  onChangeSelect = ({ value }) => this.setState({ [fieldNames.eventPlace]: value })

  onChangeDate = date => {
    try {
      if (!(date instanceof Date)) throw new RangeError(`${fieldNames.eventDate}: Invalid date`)
      this.setStateProxy(state => {
        state[fieldNames.eventDate] = formatDate(date, dateFormat)
        delete state.errors[fieldNames.eventDate]
      })
    } catch (error) {
      this.handleError({ errorName: fieldNames.eventDate, error })
    }
  }

  onCancel = (event?: React.SyntheticEvent) =>
    void (event && event.preventDefault(), this.setState(this.defaultState), this.props.handleOpen())

  onSave = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const { fieldEventName: name, fieldEventDate: date, fieldEventPlace: place } = this.state
    await this.props.saveEvent({ name, date, place })
    this.onCancel()
  }

  render() {
    const { options: placesOptions, optionsMap: placesMap } = this.props.eventsPlaces
    const { fieldEventName, fieldEventDate, fieldEventPlace, errors } = this.state
    return (
      <form className={styles.form}>
        <header>
          <h2>Добавление мероприятия</h2>
        </header>
        <main>
          <input
            placeholder={'Название'}
            name={fieldNames.eventName}
            onChange={this.onChangeText}
            value={fieldEventName}
          />
          {fieldNames.eventDate in errors && <p className={styles.error}>{errors[fieldNames.eventDate].message}</p>}
          <DatePicker
            {...{
              placeholder: 'Дата',
              name: fieldNames.eventDate,
              onDayChange: this.onChangeDate,
              value: fieldEventDate,
              dayPickerProps: { locale: 'ru', localeUtils: DatePickerLocalizaton },
              format: dateFormat,
              formatDate,
              parseDate,
            }}
          />
          <Select
            placeholder={'Город'}
            name={fieldNames.eventPlace}
            onChange={this.onChangeSelect}
            value={placesMap[fieldEventPlace] || null}
            options={placesOptions}
          />
        </main>
        <footer>
          <button onClick={this.onCancel} className={styles.buttonCancel}>
            Отмена
          </button>
          <button
            onClick={this.onSave}
            disabled={
              !fieldEventName ||
              !fieldEventDate ||
              !fieldEventPlace ||
              !!this.props.isSaving ||
              !!Object.keys(errors).length
            }
            className={styles.buttonConfirm}
          >
            Добавить {this.props.isSaving && '(saving...)'}
          </button>
        </footer>
      </form>
    )
  }
}

const mapStateToProps = (store: IStore): IReduxProps => ({
    eventsPlaces: eventsSelectors.placesGetter(store),
    isSaving: eventsSelectors.isSaving(store),
  }),
  mapDispatchToProps = { saveEvent: eventsActions.saveEvent }

const FormAddEvent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Form)

export default PopupAddEvent