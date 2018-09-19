import React, { forwardRef } from 'react'
import Compose from 'react-compose-context-consumers'
import LanguageContext from './language'

function withLanguage(Component) {
  return function ComponentWithLanguage() {
    return forwardRef((props, ref) => (
      <Compose {...{ language: LanguageContext.Consumer }}>
        {({ language }) => <Component {...{ ...props, ref, language }} />}
      </Compose>
    ))
  }
}

export default withLanguage
