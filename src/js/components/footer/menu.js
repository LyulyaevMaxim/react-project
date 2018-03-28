import React from 'react'
import { hot } from 'react-hot-loader'
import { data } from './data.js'
import styles from '~css/footer/footer-menu.scss'

function Menu() {
	return (
		<nav className={styles.menu}>
			{data.map((list, index) => (
				<ul key={`list-${index}`}>
					{list.map(({ title, href }, subindex) => (
						<li key={`link-${subindex}`}>
							<a href={href}>{title}</a>
						</li>
					))}
				</ul>
			))}
		</nav>
	)
}

export default hot(module)(Menu)
