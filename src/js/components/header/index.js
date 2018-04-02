import React from 'react'
import { NavLink } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import getClassName from 'babel-plugin-react-css-modules/dist/browser/getClassName'
import '~css/header/index.scss'

function Header({ path, components }) {
	const links = [
		{ title: 'Главная', href: `${path}` },
		{ title: 'Таблица', href: `${path}table` },
		{ title: 'Форма', href: `${path}form` }
	]
	return (
		<header styleName="header">
			<nav styleName="header-nav">
				{links.map(({ title, href }, index) => (
					<NavLink
						to={href}
						styleName="header-nav-link"
						// activeClassName={getClassName('active', require('~css/header/index.scss') )}
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
