import React from 'react'
import hoistStatics from 'hoist-non-react-statics'
import { MyContextProvider, MyContext } from '~components/contextExample/MyProvider'

const contexts = { MyContext }

const withContext = contextName => Component => {
  const fullContextName = `${contextName}Context`
  if (!contexts.hasOwnProperty(fullContextName)) {
    throw new Error(`
      Wrong context name! You don't have context with name ${fullContextName}.
      Please, use one of avaliable contexts: ${Object.keys(contexts).toString()}.
    `)
  }
  const { Consumer } = contexts[fullContextName]
  const Wrap = () => <Consumer>{props => <Component {...props} />}</Consumer>
  Wrap.displayName = `withContext(${Component.displayName || Component.name})`
  Wrap.WrappedComponent = Component
  return hoistStatics(Wrap, Component)
}

const AppProviders = props => <MyContextProvider>{props.children}</MyContextProvider>

export { AppProviders as default, withContext }
