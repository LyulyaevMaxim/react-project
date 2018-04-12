import React, { Component } from 'react'
import { patternPhone, patternInn, patternNumber, patternLetter } from './patterns'
import { hot } from 'react-hot-loader'
import './input.scss'

class Input extends Component {
	state = {
		value: '',
		className: ''
	}

	render() {
		const {
			pattern,
			getValue,
			value: propValue = '',
			className: propsClass = '',
			...props
		} = this.props
		const { value: stateValue, className: stateClass } = this.state

		return (
			<input
				{...props}
				value={propValue.length ? propValue : stateValue}
				styleName={
					'maxwell-input' +
					(propsClass.length ? ` ${propsClass}` : '') +
					(stateClass.length ? ` ${stateClass}` : '')
				}
				onChange={this.handleChange}
				onBlur={this.handleFocusOut}
			/>
		)
	}

	handleChange = event => {
		event.preventDefault()
		const { settings } = this.props
		const { value: currentValue } = this.state
		const currentLength = currentValue.length
		const { value } = event.currentTarget
		const length = value.length
		const lastSymbol = value.substring(value.length - 1)
		const params = { value, length, currentLength, lastSymbol }
		// const settings = JSON.parse(event.target.getAttribute("data-settings"));

		switch (settings) {
			case 'isPhone': {
				const data = patternPhone(params)
				if (!Object.is(data, null)) this.setState({ value: data })
				return
			}

			case 'isInn': {
				const data = patternInn(params)
				if (!Object.is(data, null)) this.setState({ value: data })
				return
			}

			case 'isNumbers': {
				const data = patternNumber(params)
				if (!Object.is(data, null)) this.setState({ value: data })
				return
			}

			case 'isLetter': {
				const data = patternLetter(params)
				if (!Object.is(data, null)) this.setState({ value: data })
				return
			}

			default: {
				break
			}
		}
		this.setState({ value })
	}

	handleFocusOut = event => {
		const { value } = this.state
		const { pattern, getValue } = this.props

		if (value === '') {
			this.setState({ className: 'empty' })
			if (typeof getValue === 'function') getValue({ value: '' })
			return
		}

		if (pattern) {
			if (value.match(pattern)) {
				this.setState({ className: 'valid' })
				if (typeof getValue === 'function') getValue({ value })
			} else {
				this.setState({ className: 'invalid' })
			}
			return
		}

		this.setState({ className: 'valid' })
	}
}

export default hot(module)(Input)
