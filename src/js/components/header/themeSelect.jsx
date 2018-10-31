import React, { Component } from 'react'
import loadable from 'loadable-components'
import { loadHelper } from '~utils/loadHelper'
import globalStyles from '~css/index.pcss'

const preloadModules = [{ name: 'Select', module: loadable(() => import('~modules/select')) }],
  postModules = [{ name: 'styles', module: loadable(() => import('./index.pcss')) }]

class ThemeSelect extends Component {
  static themes = { dark: globalStyles['dark-theme'], light: globalStyles['light-theme'] }

  static themesOptions = Object.keys(ThemeSelect.themes).map(theme => ({
    label: theme,
    value: ThemeSelect.themes[theme],
  }))

  constructor(props) {
    super(props)
    this.asyncModules = {}
    this.state = {
      activeTheme: ThemeSelect.themes.light,
      toggleTheme: this.toggleTheme,
    }
    document.body.classList.add(this.state.activeTheme)
  }

  componentDidMount() {
    loadHelper({ preloadModules, postModules, setState: this.setState.bind(this) })
  }

  componentDidUpdate(prevProps, prevState) {
    document.body.classList.replace(prevState.activeTheme, this.state.activeTheme)
  }

  toggleTheme = ({ theme }) => this.setState(state => ({ activeTheme: theme }))

  render() {
    if (this.state.isAsyncModulesLoading !== false) return null
    const {
      activeTheme,
      toggleTheme,
      asyncModules: { Select, styles },
    } = this.state
    return (
      <Select
        {...{
          onChange: ({ value }) => toggleTheme({ theme: value }),
          className: styles['header-select'],
          options: ThemeSelect.themesOptions.filter(({ value }) => value !== activeTheme),
          value: ThemeSelect.themesOptions.find(({ value }) => value === activeTheme),
        }}
      />
    )
  }
}

export default ThemeSelect
