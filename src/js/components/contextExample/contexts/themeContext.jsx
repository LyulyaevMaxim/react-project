import React, { Component, createContext } from 'react'

const { ThemeContext } = createContext('light')

class ThemeProvider extends Component {
  state = { theme: 'light' }

  toggleTheme = () =>
    this.setState(({ theme }) => ({ theme: theme === 'light' ? 'dark' : 'light' }))

  render() {
    return (
      <ThemeContext.Provider value={this.state.theme}>
        {this.props.children({ toggleTheme: this.toggleTheme })}
      </ThemeContext.Provider>
    )
  }
}

const ThemeConsumer = ThemeContext.Consumer

const themes = {
  light: {
    color: 'black',
  },
  dark: {
    color: 'white',
  },
}

export { ThemeProvider, ThemeConsumer, themes }
