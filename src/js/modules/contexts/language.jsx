import React, { forwardRef, createContext } from 'react'
// import Compose from 'react-compose-context-consumers'
import { get, set } from 'lodash-es'
import { defaultLanguage } from '~constants'

const getComponentName = Component => Component.displayName || Component.name || 'Component'

const translations = {
  light: {
    en: 'light',
    de: 'hell',
    es: 'claro',
  },
  dark: {
    en: 'dark',
    es: 'oscuro',
    de: 'dunkel',
  },
}

export const LanguageContext = createContext({
  activeLanguage: defaultLanguage,
  //использовать getter/setter?
  getTranslate({ word }) {
    return get(translations, `[${word}][${this.activeLanguage}]`)
  },
  setTranslate({ language, word, translation }) {
    set(translations, `[${word}][${language}]`, translation)
  },
})

export const withLanguage = (settings = {}) => Component => {
  const ComponentWithLanguage = forwardRef((props, ref) => (
    <LanguageContext.Consumer>{language => <Component {...{ ...props, ...ref, language }} />}</LanguageContext.Consumer>
  ))
  ComponentWithLanguage.displayName = `withLanguage(${getComponentName(Component)})`
  return ComponentWithLanguage
}
