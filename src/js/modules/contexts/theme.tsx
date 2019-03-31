import React, { forwardRef, createContext } from 'react'

enum Themes {
  light = 'light',
  dark = 'dark',
}

const getComponentName = Component => Component.displayName || Component.name || 'Component',
  breakpoints = { mobile: 320, tablet: 768, desktop: 1024, bigDesktop: 1440 },
  media = (() => {
    const maxMobile = `(max-width: ${breakpoints.tablet - 1}px)`,
      minTablet = `(min-width: ${breakpoints.tablet}px)`,
      maxTablet = `(max-width: ${breakpoints.desktop - 1}px)`,
      minDesktop = `(min-width: ${breakpoints.desktop}px)`,
      maxDesktop = `(max-width: ${breakpoints.bigDesktop - 1}px)`,
      minBigDesktop = `(min-width: ${breakpoints.bigDesktop}px)`

    return {
      maxMobile: `@media ${maxMobile}`,
      tablet: `@media ${minTablet} and ${maxTablet}`,
      minTablet: `@media ${minTablet}`,
      maxTablet: `@media ${maxTablet}`,
      desktop: `@media ${minDesktop} and ${maxDesktop}`,
      minDesktop: `@media ${minDesktop}`,
      maxDesktop: `@media ${maxDesktop}`,
      minBigDesktop: `@media ${minBigDesktop}`,
    }
  })(),
  colors = {
    white: 'hsl(0, 0%, 100%)',
    black: 'hsl(0, 0%, 0%)',
    gray: 'hsl(0, 0%, 68%)',
    green: 'hsl(138, 66%, 40%)',
    pink: 'hsl(6, 100%, 69%)',
    gold: 'hsl(42, 100%, 74%)',
    blue: 'hsl(204, 61%, 65%)',
    purple: 'hsl(316, 50%, 63%)',
  },
  themes = {
    map: Themes,
    [Themes.light]: {
      pageBackground: colors.white,
      textColor: colors.black,
      activeColor: colors.green,
    },
    [Themes.dark]: {
      pageBackground: colors.gray,
      textColor: colors.gold,
      activeColor: colors.pink,
    },
  }

export const ThemeContext = createContext({
  activeTheme: Themes.light,
  setTheme({ theme }: { theme: Themes }) {
    this.activeTheme = theme
  },
  themes,
  breakpoints,
  '@media': media,
  colors,
  fonts: {
    family: {
      MuseoSans: '"Museo Sans", sans-serif',
    },
    weight: {
      thin: 100,
      ultraLight: 200,
      light: 300,
      regular: 400,
      medium: 500,
      demi: 600,
      bold: 700,
      heavy: 800,
      black: 900,
    },
    sizes: {
      1: '16px',
      2: '20px',
      3: '24px',
      4: '28px',
      5: '32px',
      6: '36px',
    },
  },
  paddings: {
    horizontal: {
      mobile: '5vw',
      tablet: 34,
      desktop: 76,
      bigDesktop: '14vw',
    },
  },
})

export const withTheme = (settings = {}) => Component => {
  const ComponentWithTheme = forwardRef((props, ref) => (
    <ThemeContext.Consumer>{theme => <Component {...{ ...props, ...ref, theme }} />}</ThemeContext.Consumer>
  ))
  ComponentWithTheme.displayName = `withTheme(${getComponentName(Component)})`
  return ComponentWithTheme
}
