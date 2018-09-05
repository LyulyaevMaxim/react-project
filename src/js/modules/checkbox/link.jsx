import React from 'react'
import styles from './index.scss'

function CheckboxLink({ id, labelClass = '', labelText = '' }) {
  return (
    <label
      {...{
        className: `${styles['checkbox-label-link']} ${labelClass}`,
        htmlFor: id,
      }}
    >
      {labelText}
    </label>
  )
}

export default CheckboxLink
