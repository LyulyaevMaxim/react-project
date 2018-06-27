import React from 'react'
import { hot } from 'react-hot-loader'
import styles from './index.scss'

function Popup({ popupClass, closeClass, closeId, ...props }) {
  const closePopup = ({ target }) => target.querySelector(`[class*='label-close']`).click()
  const handleSubmit = event => {
    event.preventDefault()
    props.handleSubmit({ event })
    closePopup(event)
  }

  return (
    <form
      {...{
        className: `${styles['popup']} ${popupClass}`,
        onSubmit: handleSubmit,
      }}
    >
      <label
        {...{
          className: `${styles['label-close']} ${closeClass}`,
          htmlFor: closeId,
        }}
      />
      {this.props.children}
    </form>
  )
}

export default hot(module)(Popup)
