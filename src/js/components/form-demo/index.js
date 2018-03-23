import React, { Component } from 'react'
import loadable from 'loadable-components'
import { hot } from 'react-hot-loader'
import '~css/form-demo/index.scss'

const Input = loadable(() => import('~modules/input'))
const Textarea = loadable(() => import('~modules/textarea'))

class FormDemo extends Component {
	state = { textareaValue: '', customInput: '' }

	handleChange = ({ field, value }) => {
		this.setState({ [field]: value })
	}

	render() {
		const { textareaValue, customInput } = this.state
		const textareaHandle = ({ value }) => {
			this.handleChange({ field: 'textareaValue', value })
		}
		const customInputHandle = ({ value }) => {
			this.handleChange({ field: 'customInput', value })
		}

		return (
			<form className="demo">
				<Input
					placeholder="Иванов Иван Иванович"
					pattern="[A-zА-я]{2,}[\ ][A-zА-я]{2,}[\ ][A-zА-я]{2,}"
					settings="isLetter"
					required
				/>
				<Input
					type="email"
					placeholder="ivanovii@mail.ru"
					pattern="^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$"
				/>
				<Input
					placeholder="8 900 000 0000"
					pattern="\d{1}[\ ]\d{3}[\ ]\d{3}[\ ]\d{4}"
					settings="isPhone"
					// data-settings={JSON.stringify({ isPhone: true })}
					required
				/>
				<Input placeholder="5200 0000 000" pattern="\d{4}[\ ]\d{4}[\ ]\d{3}" settings="isInn" />
				<Input
					placeholder="ivanovivan.ru"
					pattern="^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$"
				/>
				<Input placeholder="Любое число" pattern="\d{1,}" settings="isNumbers" />
				<Input placeholder="Любой текст" />

				<div>
					<Input
						pattern="\d{1,}"
						settings="isNumbers"
						placeholder="Отправляем число наружу"
						getValue={customInputHandle}
						onChange={this.handleInputChange}
					/>
					<p>Значение input'a: {customInput}</p>
				</div>

				<div>
					<Textarea {...{ getValue: textareaHandle, placeholder: 'Растягивающийся textarea' }} />
					<p>Значение textarea: {textareaValue}</p>
				</div>
			</form>
		)
	}
}

export default hot(module)(FormDemo)
