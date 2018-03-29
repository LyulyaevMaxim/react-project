import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Pagination from './pagination'
import TableBody from './table-body'
import { hot } from 'react-hot-loader'
import './index.scss'

class Table extends Component {
	static propTypes = {
		auth: PropTypes.object,
		data: PropTypes.object.isRequired,
		columns: PropTypes.array.isRequired
	}

	state = {
		page: 1,
		pageSize: 50
	}

	render() {
		const { columns, data, className, TablePopup } = this.props
		if (!data['list'].length)
			return (
				<block-for-table {...{ class: className }}>
					<no-data-label>
						<p>Нет данных</p>
					</no-data-label>
				</block-for-table>
			)

		const { page, pageSize } = this.state
		const totalPages = Math.ceil(data['list'].length / pageSize)
		const { changeActivePage, changePageSize } = this
		return (
			<block-for-table {...{ class: className }}>
				<Pagination
					{...{
						changeActivePage,
						changePageSize,
						totalPages,
						pageSize,
						page
					}}
				/>
				<table>
					<TableBody {...{ data, page, pageSize, columns, TablePopup }} />
				</table>
			</block-for-table>
		)
	}

	changeActivePage = ({ page }) => {
		this.setState({ page })
	}

	changePageSize = ({ pageSize }) => {
		this.setState({ pageSize, page: 1 })
	}
}

export default hot(module)(Table)
