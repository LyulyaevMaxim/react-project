import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import { bindActionCreators } from 'redux'
import { Route, Switch } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as authActions from '~actions/auth.js'
import * as dataActions from '~actions/data.js'
import loadable from 'loadable-components'
import '~css/index.scss'

const path = require('../constants.json').initialPath

const Header = loadable(() => import('./header'))
const Footer = loadable(() => import('./footer'))
const FormDemo = loadable(() => import('./form-demo'))
const SwitchesDemo = loadable(() => import('./switches-demo'))
const TableDemo = loadable(() => import('./table-demo'))

class App extends Component {
	static propTypes = {
		location: PropTypes.object.isRequired,
		auth: PropTypes.object.isRequired,
		setAuthorization: PropTypes.func,
		getData: PropTypes.func
	}

	render() {
		const { loadingToken, token } = this.props.auth
		if (loadingToken !== false || token === '') return <h1>&quot;Token&quot; не был передан</h1>

		return (
			<Fragment>
				<Header />
				<nav>
					<Link to={`/${path}`}>Table</Link>
					<Link to={`/${path}forms`}>Forms</Link>
					<Link to={`/${path}switches`}>Switches</Link>
				</nav>
				<Switch>
					<Route path={`/${path}`} exact component={TableDemo} />
					<Route path={`/${path}forms`} component={FormDemo} />
					<Route path={`/${path}switches`} component={SwitchesDemo} />
				</Switch>
				<Footer />
			</Fragment>
		)
	}

	async componentDidMount() {
		const { authorization, props: { getData } } = this
		authorization()
		getData()
		await this.props.sberLoginUpdate({ login: 'QREVOT-api', password: 'QREVOT' })
		await this.props.getData()
		this.props.sberLoginUpdate({ login: 'QREVOT-api', password: 'QREVOT' })
	}

	authorization = () => {
		const params = this.props.location.search.substring(1).split('&')
		let token, extraToken
		params.map(el => {
			if (el.match('token')) token = el.slice('token='.length)
			else if (el.match('extraToken')) extraToken = el.slice('extraToken='.length)
		})
		this.props.setAuthorization({ token, extraToken })
	}

	/*testSaga = () => {
		const { sagaMiddleware } = this.props
		sagaMiddleware.run(helloSaga)
	}*/
}

const mapStateToProps = ({ auth, routing: { location } }) => ({ auth, location })
const mapDispatchToProps = dispatch =>
	bindActionCreators({ ...authActions, ...dataActions }, dispatch)

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(App))
