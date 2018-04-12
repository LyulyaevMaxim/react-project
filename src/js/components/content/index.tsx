import * as React from 'react'
import { hot } from 'react-hot-loader'
import '~css/content/index.scss'

function Content() {
	return (
		<main styleName="main">
			<h1 styleName="h1">React Project</h1>
			<p styleName="p">Демонстрация возможностей сборки</p>
			<h3 styleName="h3">О проекте:</h3>
			<p styleName="p">Демонстрация возможностей сборки</p>
		</main>
	)
}

export default hot(module)(Content)
