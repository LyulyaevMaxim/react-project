import { createContext } from 'react'
import { get, set } from 'lodash'

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
  getTranslate: function({ word }) {
    return get(translations, `[${word}][${this.activeLanguage}]`)
  },
  setTranslate: function({ language, word, translation }) {
    set(translations, `[${word}][${language}]`, translation)
  },
})

export default { Consumer, Provider }
