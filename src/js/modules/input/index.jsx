import React, { Component } from 'react'
import loadable from 'loadable-components'
import { loadHelper } from '~utils/loadHelper'
import { patternPhone, patternInn, patternNumber, patternLetter } from './patterns'

const preloadModules = [{ name: 'styles', module: loadable(() => import('./input.scss')) }]

class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentValue: props.value || '',
      className: '',
    }
  }

  async componentDidMount() {
    loadHelper({ preloadModules, setState: this.setState.bind(this) })
    if (typeof this.props.value !== 'undefined' && this.props.value.length) {
      await this.setState({ currentValue: this.props.value })
      this.handleFocusOut()
    }
  }

  render() {
    if (this.state.isAsyncModulesLoading !== false) return null
    const { pattern, getValue, className: propsClass = '', ...props } = this.props
    const {
      currentValue,
      className: stateClass,
      asyncModules: { styles },
    } = this.state

    return (
      <input
        {...{
          ...props,
          value: currentValue,
          onChange: this.handleChange,
          onBlur: this.handleFocusOut,
          className: `${styles['maxwell-input']} ${propsClass.length ? propsClass : ''} ${
            stateClass.length ? stateClass : ''
          }`,
        }}
      />
    )
  }

  handleChange = event => {
    event.preventDefault()
    const { settings } = this.props
    const { currentValue } = this.state
    const { value } = event.currentTarget
    const params = {
      value,
      length: value.length,
      currentLength: currentValue.length,
      lastSymbol: value.substring(value.length - 1),
    }

    const patternMap = {
      isPhone: () => patternPhone(params),
      isInn: () => patternInn(params),
      isNumbers: () => patternNumber(params),
      isLetter: () => patternLetter(params),
    }

    if (patternMap[settings]) {
      const newValue = patternMap[settings]()
      typeof newValue === 'string' && this.setState({ currentValue: newValue })
    } else this.setState({ currentValue })
  }

  handleFocusOut = event => {
    const { currentValue } = this.state
    const { getValue } = this.props
    const pattern = this.getPattern(this.props.settings, this.props.pattern)

    if (currentValue === '') {
      this.setState({ className: 'empty' })
      if (typeof getValue === 'function') getValue({ value: '' })
      return
    }

    if (pattern) {
      if (currentValue.match(pattern)) {
        this.setState({ className: 'valid' })
        if (typeof getValue === 'function') getValue({ value: currentValue })
      } else {
        this.setState({ className: 'invalid' })
        if (typeof getValue === 'function') getValue({ value: '' })
      }
      return
    }

    if (typeof getValue === 'function') getValue({ value: currentValue })
    this.setState({ className: 'valid' })
  }

  getPattern = (settings, defaultPattern) => {
    switch (settings) {
      case 'isDate': {
        return '^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.]((19|20)\\d\\d)$'
      }
      default: {
        return defaultPattern
      }
    }
  }
}

export default Input
