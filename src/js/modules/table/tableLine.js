import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './table-line.scss'

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
		const className =
			typeof TablePopup !== 'undefined'
				? `${styles['with-popup']} ${isOpen ? styles['is-open'] : ''}`
				: ''
		return (
			<tr {...{ onClick, className }} className={styles['tr']}>
				<td className={`${styles['td']} ${first.className}`}>{lineIndex}</td>
				{columns.map(({ className, field, fieldFormat }, i) => (
					<td className={`${styles['td']} ${className}`} key={`column-${i}`}>
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
			if (typeof field !== 'undefined') return fieldFormat(data[field])
			return fieldFormat(data)
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
		<td className="table-popup">
			<TablePopup {...props} />
		</td>
	)
}

export default TableLine
