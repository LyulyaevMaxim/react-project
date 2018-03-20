import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TableLine from './tableLine'
import Pagination from './pagination'
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
		const { columns, data } = this.props
		if (!data['list'].length)
			return (
				<block-for-table>
					<no-data-label>
						<p>Нет данных</p>
					</no-data-label>
				</block-for-table>
			)

		const { page, pageSize } = this.state
		const totalPages = Math.ceil(data['list'].length / pageSize)
		const { changeActivePage, changePageSize } = this
		return (
			<block-for-table>
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
					<tbody>
						{this.getTableHeader({ columns })}
						{this.getTableBody({ page, pageSize, columns })}
					</tbody>
				</table>
			</block-for-table>
		)
	}

	getTableHeader = ({ columns }) => (
		<tr className="table-header">
			{columns.map(({ className, label }, index) => (
				<th key={`th-${index}`} className={className}>
					{label}
				</th>
			))}
		</tr>
	)

	getTableBody = ({ page, pageSize, columns }) => {
		const { data: { data, list }, TablePopup } = this.props
		const table = []
		for (let i = pageSize * (page - 1); i < page * pageSize && i < list.length; i++) {
			table.push(
				<TableLine
					{...{ lineIndex: i + 1, data: data[list[i]], columns, TablePopup }}
					key={`line-${i}`}
				/>
			)
		}
		return table
	}

	changeActivePage = ({ page }) => {
		this.setState({ page })
	}

	changePageSize = ({ pageSize }) => {
		this.setState({ pageSize })
	}
}

export default Table
