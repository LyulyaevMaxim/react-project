import React from 'react'
import TextareaAutosize from 'react-autosize-textarea'
import { hot } from 'react-hot-loader'
import './index.scss'

function Textarea({ getValue, onKeyPress, className, ...props }) {
	const handleFocusOut = event => {
		event.preventDefault()
		getValue({ value: event.target.value })
	}

	const handleKeyPress = event => {
		const { value } = event.target
		onKeyPress({ value, event })

	}

	return (
		<div styleName='maxwell-textarea-container'>
			<TextareaAutosize
				styleName={`maxwell-textarea ${className}`}
				placeholder=""
				defaultValue=""
				rows={3}
				maxRows={10}
				onBlur={handleFocusOut}
				onKeyPress={handleKeyPress}
				{...props}
			/>
		</div>
	)
}

export default hot(module)(Textarea)
