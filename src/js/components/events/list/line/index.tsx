import * as I from './index.d'
import React from 'react'
import { connect } from 'react-redux'
import * as eventsSelectors from '~store/events/selectors'
import styles from '../styles.pcss'

function EventLine(props: I.IReduxProps & I.IOwnProps) {
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

export default connect((_, ownProps: I.IOwnProps) => {
  const dataSelector = eventsSelectors.eventFactory(),
    checkedSelector = eventsSelectors.eventSelectedFactory(),
    { eventId } = ownProps
  return (store: I.IStore): I.IReduxProps => ({
    eventData: dataSelector(store, { eventId }),
    isSelected: checkedSelector(store, { eventId }),
  })
})(EventLine)
