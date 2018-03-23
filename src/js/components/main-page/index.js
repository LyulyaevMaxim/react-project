import React from 'react'
import { hot } from 'react-hot-loader'
import loadable from 'loadable-components'
import { Route, Switch } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Header = loadable(() => import('../header'))
const Footer = loadable(() => import('../footer'))
const FormDemo = loadable(() => import('../form-demo'))
const SwitchesDemo = loadable(() => import('../switches-demo'))
const TableDemo = loadable(() => import('../table-demo'))

function MainPage(props) {
	const path = props.match.path
	return (
		<section>
			<Header />
			<nav>
				<Link to={`${path}`}>Table</Link>
				<Link to={`${path}forms`}>Forms</Link>
				<Link to="/custom-path/switches">Switches</Link>
			</nav>
			<Switch>
				<Route path={`${path}table`} component={TableDemo} />
				<Route path={`${path}forms`} component={FormDemo} />
				<Route path={`${path}switches`} component={SwitchesDemo} />
			</Switch>
			<Footer />
		</section>
	)
}

export default hot(module)(MainPage)
