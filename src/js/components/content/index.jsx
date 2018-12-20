// home.component.js
import React, { Component } from 'react'
import loadable from 'react-loadable'
import styles from './index.pcss'

const Button = loadable({
    loader: () => import('~modules/button'),
    loading: () => null,
  }),
  PopupPortal = loadable({
    loader: () => import('~modules/popup').then(modules => modules.PopupPortal),
    loading: () => null,
  })

class Content extends Component {
  constructor(props) {
    super(props)
    this.contactFormID = 'contact-form'
    this.state = { isOpenContactForm: null }
  }

  onOpenContactForm = event => {
    event.preventDefault()
    this.setState(state => ({ isOpenContactForm: !state.isOpenContactForm }))
  }

  render() {
    return (
      <main className={styles.main}>
        <h1 className={styles.h1}>React Project</h1>
        <p className={styles.p}>Демонстрация возможностей сборки</p>
        <h3 className={styles.h3}>О проекте:</h3>
        <p className={styles.p}>Демонстрация возможностей сборки</p>
        {Button && (
          <Button className={styles.button} onClick={this.onOpenContactForm}>
            Связаться:
          </Button>
        )}
        {PopupPortal && (
          <PopupPortal
            {...{
              isOpen: this.state.isOpenContactForm,
              portalId: this.contactFormID,
              classList: ['a', 'b'],
            }}
          >
            <ContactForm
              {...{
                ...this.props,
                handleOpen: this.onOpenContactForm,
                isOpen: this.state.isOpenContactForm,
                styles,
              }}
            />
          </PopupPortal>
        )}
      </main>
    )
  }
}

function ContactForm({ styles, ...props }) {
  return (
    <form>
      <button className={styles.button} onClick={props.handleOpen}>
        Закрыть
      </button>
    </form>
  )
}

export default Content
