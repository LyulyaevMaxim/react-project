import React from 'react'
import Button from '~modules/button'
import styles from './index.pcss'

function ContactForm(props) {
  return <Button className={styles['contact-form-open-button']}>Связаться со мной</Button>
}

export default ContactForm
