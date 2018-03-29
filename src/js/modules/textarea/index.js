import React from 'react'
import TextareaAutosize from 'react-autosize-textarea'
import { hot } from 'react-hot-loader'
import styles from './index.scss'

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
		<div className={styles['maxwell-textarea-container']}>
			<TextareaAutosize
				className={`${styles['maxwell-textarea']} ${className}`}
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
