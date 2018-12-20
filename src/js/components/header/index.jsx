import React from 'react'
import { NavLink } from 'react-router-dom'
import ThemeSelect from './themeSelect'
import styles from './index.pcss'

const Header = ({ routes }) => <header className={styles.header}>
  <h3 className={styles['header-title']}>React Project</h3>
  <ThemeSelect />
  <nav className={styles['header-nav']}>
    {routes.map(({ title, path, component}) => (
      <NavLink
        {...{
          to: path,
          className: styles['header-nav-link'],
          activeClassName: styles.active,
          onMouseEnter: () => component.preload(),
          exact: true,
        }}
        key={title}
      >
        {title}
      </NavLink>
    ))}
  </nav>
</header>

export default Header
