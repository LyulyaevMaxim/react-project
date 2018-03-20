import React, { Fragment } from 'react'
import { hot } from 'react-hot-loader'
import { data } from './data.js'

function HeaderMenu() {
	return (
		<nav className="header-menu">
			<label htmlFor="header-menu-checkbox" />
			<input type="checkbox" id="header-menu-checkbox" />
			<ul>
				{data.map(({ title, href, submenu }, index) => (
					<li key={`list-${index}`}>
						<a href={href}>{title}</a>
						{!!submenu.length && (
							<Fragment>
								<input type="checkbox" id={`header-submenu-${index}`} />
								<label htmlFor={`header-submenu-${index}`} />
								<ul>
									{submenu.map(({ title, href }, subindex) => (
										<li key={`link-${subindex}`}>
											<a href={href}>{title}</a>
										</li>
									))}
								</ul>
							</Fragment>
						)}
					</li>
				))}
			</ul>
			<label htmlFor="header-menu-checkbox" />
		</nav>
	)
}

export default hot(module)(HeaderMenu)
