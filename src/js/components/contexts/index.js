import React, { forwardRef } from 'react'
import Compose from 'react-compose-context-consumers'
import LanguageContext from './language'

export function withLanguage(Component) {
  return function ComponentWithLanguage(props) {
    return forwardRef((props, ref) => (
      <Compose {...{ language: LanguageContext.Consumer }}>
        {({ language }) => <Component {...{ ...props, ref, language }} />}
      </Compose>
    ))
  }
}
