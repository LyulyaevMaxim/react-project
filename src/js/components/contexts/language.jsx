import { createContext } from 'react'
import { get, set } from 'lodash-es'

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

const { Consumer, Provider } = createContext({
  activeLanguage: 'en',
  //использовать getter/setter?
  getTranslate({ word }) {
    return get(translations, `[${word}][${this.activeLanguage}]`)
  },
  setTranslate({ language, word, translation }) {
    set(translations, `[${word}][${language}]`, translation)
  },
})

export default { Consumer, Provider }
