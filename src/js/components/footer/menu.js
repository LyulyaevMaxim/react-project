import React from 'react'
import { hot } from 'react-hot-loader'
import {data} from './data.js'

function Menu() {
	return (
		<nav className='footer-menu'>
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
