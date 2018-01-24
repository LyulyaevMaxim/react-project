import _ from 'lodash'
import printMe from './print.js'
import './style.css'
import Icon from './icon.png'
import { square } from './math.js'

if (process.env.NODE_ENV === 'development') {
	console.log('Development mode')
}

if (process.env.NODE_ENV === 'production') {
	console.log('Production mode')
}

function component() {
	var element = document.createElement('div')
	var btn = document.createElement('button')
	var br = document.createElement('br')

	btn.innerHTML = 'Click me and check the console!'
	element.innerHTML = _.join(['<p>Hello, webpack ' + square(2) + '</p>'], ' ')
	element.appendChild(br)
	element.appendChild(btn)
	element.classList.add('hello')

	// Note that because a network request is involved, some indication
	// of loading would need to be shown in a production-level site/app.
	btn.onclick = e =>
		import(/* webpackChunkName: "print" */ './print').then(module => {
			var print = module.default
			print()
		})

	// Add the image to our existing div.
	var myIcon = new Image()
	myIcon.src = Icon

	element.appendChild(myIcon)

	return element
}
document.body.appendChild(component())

if (module.hot) {
	module.hot.accept('./print.js', function() {
		printMe()
	})
}
