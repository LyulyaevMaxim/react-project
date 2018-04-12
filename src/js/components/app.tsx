import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import { bindActionCreators } from 'redux'
import { Route, Switch } from 'react-router-dom'
import * as authActions from '~actions/auth'
import * as dataActions from '~actions/data'
import MainPage from './main-page'
import '~css/index.scss'

class App extends Component {
	/*static propTypes = {
		location: PropTypes.object.isRequired,
		auth: PropTypes.object.isRequired,
		setAuthorization: PropTypes.func,
		getData: PropTypes.func
	}*/

	render() {
		const { loadingToken, token } = this.props.auth
		const path = require('../constants.json').initialPath
		if (loadingToken !== false || token === '') return <h1>&quot;Token&quot; не был передан</h1>

		return (
			<Fragment>
				<Switch>
					<Route path={`/`} exact render={() => <h1>Упс.. 404</h1>} />
					<Route path={`/${path}`} component={MainPage} />
				</Switch>
			</Fragment>
		)
	}

	async componentDidMount() {
		const { authorization, props: { getData } } = this
		authorization()
		// getData()
		/*	await this.props.sberLoginUpdate({ login: 'QREVOT-api', password: 'QREVOT' })
		await this.props.getData()
		this.props.sberLoginUpdate({ login: 'QREVOT-api', password: 'QREVOT' })*/
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
}

const mapStateToProps = ({ auth, routing: { location } }) => ({ auth, location })
const mapDispatchToProps = dispatch =>
	bindActionCreators({ ...authActions, ...dataActions }, dispatch)

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(App))
