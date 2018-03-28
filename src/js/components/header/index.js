import React from 'react'
import { NavLink } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import styles from '~css/header/index.scss'

function Header({ path, components }) {
	console.log(components)
	const links = [
		{ title: 'Главная', href: `${path}` },
		{ title: 'Таблица', href: `${path}table` },
		{ title: 'Форма', href: `${path}form` }
	]
	return (
		<header className={styles['header']}>
			<nav className={styles['header-nav']}>
				{links.map(({ title, href }, index) => (
					<NavLink
						to={href}
						className={styles['header-nav-link']}
						activeClassName={styles['active']}
						onMouseOver={components[index].load}
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
