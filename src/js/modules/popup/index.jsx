import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styles from './index.pcss'

export class PopupPortal extends Component {
  static defaultId = 'modal-root'

  constructor(properties) {
    super(properties)
    this.state = { hasError: false }
    if (properties.portalId && !document.getElementById(properties.portalId)) {
      this.el = document.createElement('div')
      this.el.id = properties.portalId
    } else this.el = document.getElementById(PopupPortal.defaultId)
    this.el.classList.add(styles.popup, styles['with-background'], ...properties.classList)
  }

  componentDidMount() {
    document.body.append(this.el)
  }

  componentDidUpdate(previousProperties) {
    previousProperties.isOpen !== this.props.isOpen && this.el.classList.toggle(styles['is-open'])
  }

  componentWillUnmount() {
    document.body.removeChild(this.el)
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError || this.props.isOpen === null) return null
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}

export function Popup({ popupClass, closeClass, closeId, ...properties }) {
  const closePopup = ({ target }) => target.querySelector(`[class*='label-close']`).click()
  const handleSubmit = event => {
    event.preventDefault()
    properties.handleSubmit({ event })
    closePopup(event)
  }

  return (
    <form
      {...{
        className: `${styles.popup} ${popupClass}`,
        onSubmit: handleSubmit,
      }}
    >
      <label
        {...{
          className: `${styles['label-close']} ${closeClass}`,
          htmlFor: closeId,
        }}
      />
      {properties.children}
    </form>
  )
}
