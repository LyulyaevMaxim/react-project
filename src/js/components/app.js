import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
// import { bindActionCreators } from 'redux'
// import { setAuthorization } from './actions/auth.js';
// import _ from 'lodash'
// import Icon from '../img/icon.png'
// import '../../css/index.scss'
import 'CSS/index.scss'

class App extends Component {
	static propTypes = {
		// location: PropTypes.object.isRequired,
		auth: PropTypes.object.isRequired
		// setAuthorization: PropTypes.func.isRequired
	}
	render() {
		/* const { loadingToken, token } = this.props.auth
		 if (loadingToken !== false || token === '')
		 	return <h1>&quot;Token&quot; не был передан</h1>*/

		if (process.env.NODE_ENV === 'development') {
			console.log('Development mode')
		}

		// Первый клик по кнопке создаст сетевой запрос, запрашивающий код требуемого модуля
		// После скачивания модуль запустится
		const handleClick = () =>
			import('./print').then(module => {
				var print = module.default
				print()
			})

		return (
			<React.Fragment>
				<h1>Hello, world!</h1>
				<ExampleComponent />
				<button onClick={handleClick}>Проверка динамического импорта</button>
			</React.Fragment>
		)
	}

	// componentDidMount() {
	// const token = this.props.location.search.slice('?token='.length)
	// this.props.setAuthorization(token)
	// }
}

function ExampleComponent() {
	return <p>1</p>
}

const mapStateToProps = state => ({ auth: state.auth })
// const mapDispatchToProps = dispatch => bindActionCreators({ setAuthorization }, dispatch)
export default hot(module)(connect(mapStateToProps /*, mapDispatchToProps*/)(App))
