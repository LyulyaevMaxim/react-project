import React from 'react'
import { hot } from 'react-hot-loader'
import SubsribeForm from './subsribe-form'
import Menu from './menu'
import '~css/footer/index.scss'

function Footer() {
	return (
		<footer>
			<h3>Акции и новости — всё в нашей рассылке</h3>
			<SubsribeForm />
			<Menu />
			<footer-info>
				<footer-info-logo />
				<footer-info-company>
					<p>Группа компаний «XXX»  </p>
					<p>© 1993-2018. Все права защищены</p>
				</footer-info-company>
				<footer-info-callback>
					<a href="tel:88007758525">8 888 666 77 99</a>
				</footer-info-callback>
				<footer-info-partners>
					<footer-info-partner />
					<footer-info-partner />
					<footer-info-partner />
					<footer-info-partner />
					<footer-info-partner />
					<span>Наши Партнёры</span>
				</footer-info-partners>
			</footer-info>
		</footer>
	)
}

export default hot(module)(Footer)
