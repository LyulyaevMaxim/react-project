import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './table-line.scss'

class TableLine extends Component {
	static propTypes = {
		lineIndex: PropTypes.number.isRequired,
		data: PropTypes.object.isRequired,
		columns: PropTypes.array.isRequired
	}

	state = {
		isOpen: false
	}

	render() {
		const { lineIndex, columns: [first, ...columns], data, TablePopup } = this.props
		const { isOpen } = this.state
		const onClick = typeof TablePopup === 'undefined' ? () => {} : this.handleClick
		const styleName =
			typeof TablePopup !== 'undefined' ? `with-popup ${isOpen ? 'is-open' : ''}` : ''

		return (
			<tr {...{ onClick }} styleName={`tr ${styleName}`}>
				<td styleName="td" className={first.styleName}>
					{lineIndex}
				</td>

				{columns.map(({ styleName, field, fieldFormat }, i) => (
					<td styleName="td" className={styleName} key={`column-${i}`}>
						{this.getTd({ field, fieldFormat, data })}
					</td>
				))}

				{isOpen && <Popup {...{ data, TablePopup }} handleSubmit={this.changeState} />}
			</tr>
		)
	}

	handleClick = event => {
		if (event.target.tagName === 'TR' && document.body.clientWidth - event.clientX < 120)
			this.setState({ isOpen: !this.state.isOpen })
	}

	changeState = () => {
		this.setState({ isOpen: !this.state.isOpen })
	}

	getTd = ({ field, fieldFormat, data }) => {
		if (typeof fieldFormat === 'function') {
			return typeof field !== 'undefined' ? fieldFormat(data[field]) : fieldFormat(data)
		} else {
			return data[field]
		}
	}
}

Popup.propTypes = {
	TablePopup: PropTypes.func
}

function Popup({ TablePopup, ...props }) {
	return (
		<td styleName="table-popup">
			<TablePopup {...props} />
		</td>
	)
}

export default TableLine
