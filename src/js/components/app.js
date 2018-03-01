import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import { bindActionCreators } from 'redux'
import { Route, Switch } from 'react-router-dom'
import { setAuthorization } from '~actions/auth.js'
import { getData } from '~actions/data.js'
import '~css/index.scss'
import loadable from 'loadable-components'

const AsyncHello = loadable(() => import('./print.js'))

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
			<React.Fragment>
				<h1>Hello, world!</h1>
				<div className="hello" />
				<block-for-items class="grow">
					<item-block>1</item-block>
					<item-block>2</item-block>
					<item-block>3</item-block>
					<item-block>4</item-block>
				</block-for-items>
				<Switch>
					<Route path="/hello" exact component={AsyncHello} />
				</Switch>
				<button>Проверка динамического импорта</button>
			</React.Fragment>
		)
	}

	componentDidMount() {
		this.authorization()
	}

	authorization = async () => {
		const token = this.props.location.search.slice('?token='.length)
		await this.props.setAuthorization({ token })
		await this.props.getData({ token: this.props.auth.token })
	}
}

async function* agf() {
	await 1
	yield 2
}

const mapStateToProps = state => ({ auth: state.auth, location: state.routing.location })
const mapDispatchToProps = dispatch => bindActionCreators({ setAuthorization, getData }, dispatch)

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(App))
