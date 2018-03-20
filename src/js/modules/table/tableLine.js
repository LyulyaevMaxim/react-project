import React, { Component } from 'react'
import PropTypes from 'prop-types'

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

		return (
			<tr onClick={this.handleClick} className={isOpen ? 'is-open' : ''}>
				<td className={first.className}>{lineIndex}</td>
				{columns.map(({ className, field, fieldFormat }, i) => (
					<td className={className} key={`column-${i}`}>
						{typeof fieldFormat === 'function' ? fieldFormat(data[field]) : data[field]}
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
}

Popup.propTypes = {
	TablePopup: PropTypes.func
}

function Popup({ TablePopup, ...props }) {
	return (
		<td className="table-popup">
			<TablePopup {...props} />
		</td>
	)
}

export default TableLine
