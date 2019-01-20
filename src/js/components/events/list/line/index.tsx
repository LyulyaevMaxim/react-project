import React from 'react'
import { connect } from 'react-redux'
import { IStore } from '~store/index'
import { IEvent } from '~store/events/reducer.d'
import * as eventsSelectors from '~store/events/selectors'
import styles from '../styles.pcss'

interface IOwnProps {
  eventId: IEvent['eventId']
  eventsPlaces: IStore['events']['places']
  handleSelected
}

interface IReduxProps {
  eventData: IEvent
  isSelected: boolean
}

function EventLine(props: IReduxProps & IOwnProps) {
  const { eventId, name, date, place } = props.eventData,
    { optionsMap } = props.eventsPlaces,
    lineId = `event-line-${eventId}`
  return (
    <tr className={styles.line}>
      <td className={styles.columnChecked}>
        <input
          {...{
            type: 'checkbox',
            id: lineId,
            onChange: () => props.handleSelected({ eventId }),
            checked: props.isSelected,
          }}
        />
        <label htmlFor={lineId} />
      </td>
      {[
        { columnClass: styles.columnName, columnValue: name.value },
        { columnClass: styles.columnDate, columnValue: date.value },
        { columnClass: styles.columnPlace, columnValue: optionsMap[place.value].label },
      ].map(({ columnClass, columnValue }, index) => (
        <td className={columnClass} key={index}>
          {columnValue}
        </td>
      ))}
    </tr>
  )
}

const mapStateToProps = (_, ownProps: IOwnProps) => {
  const dataSelector = eventsSelectors.eventFactory(),
    checkedSelector = eventsSelectors.eventSelectedFactory(),
    { eventId } = ownProps
  return (store: IStore): IReduxProps => ({
    eventData: dataSelector(store, { eventId }),
    isSelected: checkedSelector(store, { eventId }),
  })
}

export default connect(mapStateToProps)(EventLine)