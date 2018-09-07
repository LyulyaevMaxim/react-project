import React from 'react'
import { LanguageProvider, LanguageConsumer, translations } from './contexts/languageContext'
import { ThemeProvider, ThemeConsumer, themes } from './contexts/themeContext'
// import Composer from 'react-composer'
// import { withContext } from '~utils/withContext'

const MyComponent = ({ setLanguage, toggleTheme, lang, theme }) => (
  <div style={themes[theme]}>
    <button onClick={toggleTheme}>{translations[lang][theme]}</button>
    <select value={lang} onChange={e => setLanguage(e.target.value)}>
      <option value="en">en</option>
      <option value="es">es</option>
      <option value="de">de</option>
    </select>
  </div>
)

/*function App() {
  return (
    <WithLanguageAndThemeContext>
      <MyComponent />
    </WithLanguageAndThemeContext>
  )
}

function WithLanguageAndThemeContext({ children }) {
  return (
    <Composer components={[<LanguageProvider />, <ThemeProvider />]}>
      {([{ setLanguage }, { toggleTheme }]) => (
        <Composer components={[<LanguageConsumer />, <ThemeConsumer />]}>
          {([lang, theme]) => children({ setLanguage, toggleTheme, lang, theme })}
        </Composer>
      )}
    </Composer>
  )
}*/

function App() {
  return (
    <LanguageProvider>
      {({ setLanguage }) => (
        <ThemeProvider>
          {({ toggleTheme }) => (
            <LanguageConsumer>
              {lang => (
                <ThemeConsumer>
                  {theme => <MyComponent {...{ setLanguage, toggleTheme, lang, theme }} />}
                </ThemeConsumer>
              )}
            </LanguageConsumer>
          )}
        </ThemeProvider>
      )}
    </LanguageProvider>
  )
}

// export default withContext('My')(Example)
