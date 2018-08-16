import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import styles from './index.scss'
import { PopupPortal } from '~modules/popup'

class Content extends Component {
  constructor(props) {
    super(props)
    this.contactFormID = `contact-form`
    this.state = {
      isOpenContactForm: null,
    }
  }

  onOpenContactForm = event => {
    event.preventDefault()
    this.setState({ isOpenContactForm: !this.state.isOpenContactForm })
  }

  render() {
    return (
      <main className={styles.main}>
        <h1 className={styles.h1}>React Project</h1>
        <p className={styles.p}>Демонстрация возможностей сборки</p>
        <h3 className={styles.h3}>О проекте:</h3>
        <p className={styles.p}>Демонстрация возможностей сборки</p>
        <button className={styles.button} onClick={this.onOpenContactForm}>
          Связаться:
        </button>
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
            }}
          />
        </PopupPortal>
      </main>
    )
  }
}

function ContactForm(props) {
  return (
    <form>
      <button className={styles.button} onClick={props.handleOpen}>
        Закрыть
      </button>
    </form>
  )
}

export default hot(module)(Content)
