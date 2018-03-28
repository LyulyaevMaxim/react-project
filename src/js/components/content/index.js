import React from 'react'
import { hot } from 'react-hot-loader'
import styles from '~css/content/index.scss'

function Content() {
	return (
		<main className={styles['main']}>
			<h1 className={styles['h1']}>React Project</h1>
			<p className={styles['p']}>Демонстрация возможностей сборки</p>

			<h3 className={styles['h3']}>О проекте:</h3>
			<p className={styles['p']}>Демонстрация возможностей сборки</p>
		</main>
	)
}

export default hot(module)(Content)
