import React, { Component } from 'react'
import loadable from 'loadable-components'
import { hot } from 'react-hot-loader'
import styles from '~css/footer/subsribe-form.scss'

const Input = loadable(() => import('~modules/input'))

class SuscribeForm extends Component {
	state = {
		email: ''
	}

	handleInputChange = ({ email }) => {
		this.setState({ email })
	}

	render() {
		const { email } = this.state

		return (
			<form className={styles['subsribe-form']} onSubmit={this.handleSubmitForm}>
				<Input
					type="email"
					placeholder="ivanovii@mail.ru"
					pattern="^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$"
					onChange={this.handleInputChange}
				/>
				<button type="submit" className={styles['submit']}>
					Подписаться на статьи
				</button>
			</form>
		)
	}

	handleSubmitForm = () => {
		console.log('submit')
	}
}

export default hot(module)(SuscribeForm)
