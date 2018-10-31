import React from 'react'
import { NavLink } from 'react-router-dom'
import ThemeSelect from './themeSelect'
import styles from './index.pcss'

function Header({ routes }) {
  return (
    <header className={styles.header}>
      <h3 className={styles['header-title']}>React Project</h3>
      <ThemeSelect />
      <nav className={styles['header-nav']}>
        {routes.map(({ title, path, component }) => (
          <NavLink
            {...{
              to: path,
              className: styles['header-nav-link'],
              activeClassName: styles.active,
              onMouseOver: component.load,
              exact: true,
            }}
            key={title}
          >
            {title}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export default Header
