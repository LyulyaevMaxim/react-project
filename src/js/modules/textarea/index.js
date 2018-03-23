import React from 'react'
import TextareaAutosize from 'react-autosize-textarea'
import { hot } from 'react-hot-loader'
import './index.scss'

function Textarea({ getValue, ...props }) {
	const handleFocusOut = event => {
		event.preventDefault()
		getValue({ value: event.target.value })
	}

	return (
		<TextareaAutosize
			className="maxwell-textarea"
			placeholder=""
			defaultValue=""
			rows={3}
			maxRows={10}
			onBlur={handleFocusOut}
			{...props}
		/>
	)
}

export default hot(module)(Textarea)
