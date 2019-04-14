import React from 'react'
import DayPicker from 'react-day-picker'
//import styles from './styles.pcss'

function DatePicker(properties) {
  return (
    <DayPicker
      {...{ ...properties }}
      //className="Range"
      // numberOfMonths={2}
      //fromMonth={}
      //selectedDays={selectedDays}
      //disabledDays={disabledDays}
      //modifiers={modifiers}
      // onDayClick={this.handleDayClick}
      //onDayMouseEnter={this.handleDayMouseEnter}
    />
  )
}

export default DatePicker
