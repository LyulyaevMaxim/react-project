import React, { Component, createContext } from 'react'

const LanguageContext = createContext('en')

class LanguageProvider extends Component {
  state = { lang: 'en' }

  setLanguage = lang => this.setState({ lang })

  render() {
    return (
      <LanguageContext.Provider value={this.state.lang}>
        {this.props.children({ setLanguage: this.setLanguage })}
      </LanguageContext.Provider>
    )
  }
}

const LanguageConsumer = LanguageContext.Consumer

const translations = {
  en: {
    light: 'light',
    dark: 'dark',
  },
  es: {
    light: 'claro',
    dark: 'oscuro',
  },
  de: {
    light: 'hell',
    dark: 'dunkel',
  },
}

export { LanguageProvider, LanguageConsumer, translations }
