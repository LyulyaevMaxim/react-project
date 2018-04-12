import React from 'react'
import { hot } from 'react-hot-loader'
import TableLine from './tableLine'
import './table-line.scss'

function TableBody({ data: { data, list }, page, pageSize, columns, TablePopup }) {
	const getHeader = () => (
		<tr styleName="tr">
			{columns.map(({ styleName, label }, index) => (
				<th key={`th-${index}`} styleName="th" className={styleName}>
					{label}
				</th>
			))}
		</tr>
	)

	const getBody = () => {
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

	return (
		<tbody>
			{getHeader({ columns })}
			{getBody({ page, pageSize, columns })}
		</tbody>
	)
}

export default hot(module)(TableBody)
