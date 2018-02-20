import React from 'react'
import { hot } from 'react-hot-loader'

function printMe() {
	return <p>Это динамически загруженная функция</p>
}

export default hot(module)(printMe)
