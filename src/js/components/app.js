import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import { bindActionCreators } from 'redux'
import { Route, Switch } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as authActions from '~actions/auth.js'
import * as dataActions from '~actions/data.js'
import { helloSaga } from '~actions/sagas.js'
import '~css/index.scss'
import { formatDate } from '~utils/date.js'
import loadable from 'loadable-components'

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
				<Link to={`/${path}forms`}>Показать поля ввода с валидацией (вместо таблицы)</Link>
				<Switch>
					<Route path={`/${path}`} exact component={TableDemo} />
					<Route path={`/${path}forms`} component={FormDemo} />
				</Switch>
				<SwitchesDemo />
				<block-for-items class="grow">
					<item-block>1</item-block>
					<item-block>2</item-block>
					<item-block>3</item-block>
					<item-block>4</item-block>
				</block-for-items>
				<Footer />
			</Fragment>
		)
	}

	async componentDidMount() {
		this.authorization()
		this.props.getData()
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
