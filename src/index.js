import _ from 'lodash';
import printMe from './print.js';
import './style.css';
import Icon from './icon.png';
import { square } from './math.js';

if (process.env.NODE_ENV !== 'production') {
	console.log('Looks like we are in development mode!');
}

function component() {
	var element = document.createElement('div');
	var btn = document.createElement('button');

	// Lodash, now imported by this script
	element.innerHTML = _.join(['<p>Hello, webpack ' + square(2) + '</p>'], ' ');
	element.classList.add('hello');

	btn.innerHTML = 'Click me and check the console!';
	btn.onclick = printMe;
	element.appendChild(btn);

	// Add the image to our existing div.
	var myIcon = new Image();
	myIcon.src = Icon;

	element.appendChild(myIcon);

	return element;
}

document.body.appendChild(component());

if (module.hot) {
	module.hot.accept('./print.js', function() {
		printMe();
	});
}
