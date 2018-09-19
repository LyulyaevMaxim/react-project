import React from 'react'
import styles from './index.scss'

function ContactForm(props) {
  return (
    <button type="button" className={styles['contact-form-open-button']}>
      Связаться со мной
    </button>
  )
}

export default ContactForm
