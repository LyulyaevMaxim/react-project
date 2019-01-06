import React from 'react'
import { NavLink } from 'react-router-dom'
import ThemeSelect from './themeSelect'
import { IRoute } from '~types/index'
import styles from './index.pcss'

interface IProps {
  routes: IRoute[]
}

const Header = ({ routes }: IProps) => (
  <header className={styles.header}>
    <h3 className={styles.headerTitle}>React Project</h3>
    <ThemeSelect />
    <nav className={styles.headerNav}>
      {routes.map(({ title, path, component }) => (
        <NavLink
          {...{
            to: path,
            className: styles.headerNavLink,
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
)

export default Header
