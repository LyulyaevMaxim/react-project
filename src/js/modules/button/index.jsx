import React from 'react'
import styles from './styles.pcss'

const getClass = require('~utils/react').className()

function Button({ text, type, children, className, isDisabled, isLink, ...props }) {
  return (
    <button
      {...{
        type: type || 'button',
        className: getClass([styles.button, isDisabled && styles.disabled, className]),
        ...props,
      }}
    >
      {children || text}
    </button>
  )
}

export default Button
