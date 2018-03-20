import React from 'react'
import { hot } from 'react-hot-loader'
import HeaderMenu from './header-menu'
import '~css/header/index.scss'

function Header() {
	return (
		<header>
			<header-logo>
				<a href="#" target="_blank" className="evotor" />
				<a href="#" target="_blank" className="lad" />
			</header-logo>
			<header-city>
				<a href="#">Нижний Новгород</a>
			</header-city>
			<header-callback>
				<a href="tel:88007758525">8 800 775 85 25</a>
				<p>горячая линия</p>
			</header-callback>
			<header-recommend>
				<a href="#">Рекомендуй</a>
			</header-recommend>
			<header-cart>
				<header-cart-icon amount="1" />
				<span>Подарок</span>
			</header-cart>
			<HeaderMenu />
		</header>
	)
}

export default hot(module)(Header)
