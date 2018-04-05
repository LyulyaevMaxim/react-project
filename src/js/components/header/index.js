import React from 'react'
import { NavLink } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import './index.scss'

function Header({ path, components }) {
	const links = [
		{ title: 'Главная', href: `${path}` },
		{ title: 'Таблица', href: `${path}table` },
		{ title: 'Форма', href: `${path}form` }
	]
	const { active: activeClassName } = require('./index.scss')
	return (
		<header styleName="header">
			<nav styleName="header-nav">
				{links.map(({ title, href }, index) => (
					<NavLink
						to={href}
						styleName="header-nav-link"
						activeClassName={activeClassName}
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
