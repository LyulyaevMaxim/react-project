import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import styles from '../tableBody/index.pcss'

class TableLine extends Component {
  /*static propTypes = {
    lineIndex: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
  }*/

  state = {
    isOpen: false,
  }

  render() {
    const {
      lineIndex,
      columns: [first, ...columns],
      data,
      TablePopup,
    } = this.props
    const { isOpen } = this.state
    const onClick = typeof TablePopup === 'undefined' ? () => {} : this.handleClick
    const styleName =
      typeof TablePopup !== 'undefined' ? `${styles['with-popup']} ${isOpen ? styles['is-open'] : ''}` : ''

    return (
      <tr {...{ onClick, className: `${styles.tr} ${styleName}` }}>
        <td className={`${styles.td} ${first.styleName}`}>{lineIndex}</td>

        {columns.map(({ styleName, field, fieldFormat }, i) => (
          <td {...{ className: `${styles.td} ${styleName}` }} key={`column-${styleName}`}>
            {this.getTd({ field, fieldFormat, data })}
          </td>
        ))}

        {isOpen && <Popup {...{ data, TablePopup }} handleSubmit={this.changeState} />}
      </tr>
    )
  }

  handleClick = event => {
    if (event.target.tagName === 'TR' && document.body.clientWidth - event.clientX < 120) {
      this.setState(state => ({ isOpen: !state.isOpen }))
    }
  }

  changeState = () => this.setState(state => ({ isOpen: !state.isOpen }))

  getTd = ({ field, fieldFormat, data = {} }) => {
    if (typeof fieldFormat === 'function') {
      return typeof field !== 'undefined' ? fieldFormat(get(data, `${field}`)) : fieldFormat(data)
    }
    return get(data, `${field}`)
  }
}

/*Popup.propTypes = {
  TablePopup: PropTypes.func,
}*/

function Popup({ TablePopup, ...props }) {
  return (
    <td className={styles['table-popup']}>
      <TablePopup {...props} />
    </td>
  )
}

export default TableLine
