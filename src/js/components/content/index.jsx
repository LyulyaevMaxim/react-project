import React, { Component } from 'react'
import loadable from 'loadable-components'
import { loadHelper } from '~utils/loadHelper'

const preloadModules = [
    { name: 'Button', module: loadable(() => import('~modules/button')) },
    { name: 'PopupPortal', module: loadable(() => import('~modules/popup')), isDefault: false },
  ],
  postModules = [{ name: 'styles', module: loadable(() => import('./index.scss')) }]

class Content extends Component {
  constructor(props) {
    super(props)
    this.contactFormID = 'contact-form'
    this.state = { isOpenContactForm: null }
  }

  componentDidMount() {
    loadHelper({ preloadModules, postModules, setState: this.setState.bind(this) })
  }

  onOpenContactForm = event => {
    event.preventDefault()
    this.setState(state => ({ isOpenContactForm: !state.isOpenContactForm }))
  }

  render() {
    if (this.state.isAsyncModulesLoading !== false)
      return (
        <main>
          <div className="loader" />
        </main>
      )
    const { Button, PopupPortal, styles } = this.state.asyncModules
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
