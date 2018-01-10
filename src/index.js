import _ from 'lodash';
import printMe from './print.js';
import './style.css';
import Icon from './icon.png';

function component() {
	var element = document.createElement('div');
	var btn = document.createElement('button');

	// Lodash, now imported by this script
	element.innerHTML = _.join(['<p>Hello', 'webpack</p>'], ' ');
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
