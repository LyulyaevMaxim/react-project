import React, { Component } from 'react'
import Loadable from 'react-loadable'
import globalStyles from '~css/index.pcss'
import styles from './index.pcss'

const Select = Loadable({
  loader: () => import('~modules/select' /* webpackChunkName: "modules->select" */),
  loading: () => null,
})

class ThemeSelect extends Component {
  static themes = { dark: globalStyles['dark-theme'], light: globalStyles['light-theme'] }

  static themesOptions = Object.keys(ThemeSelect.themes).map(theme => ({
    label: theme,
    value: ThemeSelect.themes[theme],
  }))

  constructor(props) {
    super(props)
    this.state = {
      activeTheme: ThemeSelect.themes.light,
      toggleTheme: this.toggleTheme,
    }
    document.body.classList.add(this.state.activeTheme)
  }

  componentDidUpdate(prevProps, prevState) {
    document.body.classList.replace(prevState.activeTheme, this.state.activeTheme)
  }

  toggleTheme = ({ theme }) => this.setState({ activeTheme: theme })

  render() {
    const { activeTheme, toggleTheme } = this.state
    return (
      <Select
        {...{
          onChange: ({ value }) => toggleTheme({ theme: value }),
          className: styles.headerSelect,
          options: ThemeSelect.themesOptions.filter(({ value }) => value !== activeTheme),
          value: ThemeSelect.themesOptions.find(({ value }) => value === activeTheme),
        }}
      />
    )
  }
}

export default ThemeSelect
