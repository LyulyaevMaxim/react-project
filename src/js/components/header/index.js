import React from 'react'
import { NavLink } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import styles from './index.scss'

function Header({ routes }) {
  return (
    <header className={styles['header']}>
      <nav className={styles['header-nav']}>
        {routes.map(({ title, path, component }) => (
          <NavLink
            to={path}
            className={styles['header-nav-link']}
            activeClassName={styles['active']}
            onMouseOver={component.load}
            exact
            key={title}
          >
            {title}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export default hot(module)(Header)
