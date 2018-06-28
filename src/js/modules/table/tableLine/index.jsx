import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import styles from '../tableBody/index.scss'

class TableLine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  static propTypes = {
    lineIndex: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
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
      typeof TablePopup !== 'undefined'
        ? `${styles['with-popup']} ${isOpen ? styles['is-open'] : ''}`
        : ''

    return (
      <tr {...{ onClick, className: `${styles['tr']} ${styleName}` }}>
        <td className={`${styles['td']} ${first.styleName}`}>{lineIndex}</td>

        {columns.map(({ styleName, field, fieldFormat }, i) => (
          <td {...{ className: `${styles['td']} ${styleName}` }} key={`column-${i}`}>
            {this.getTd({ field, fieldFormat, data })}
          </td>
        ))}

        {isOpen && <Popup {...{ data, TablePopup }} handleSubmit={this.changeState} />}
      </tr>
    )
  }

  handleClick = event => {
    //event.currentTarget.parentNode.tagName === 'TBODY'
    if (event.target.tagName === 'TR' && document.body.clientWidth - event.clientX < 120)
      this.setState({ isOpen: !this.state.isOpen })
  }

  changeState = () => this.setState({ isOpen: !this.state.isOpen })

  getTd = ({ field, fieldFormat, data = {} }) => {
    if (typeof fieldFormat === 'function') {
      return typeof field !== 'undefined' ? fieldFormat(get(data, `${field}`)) : fieldFormat(data)
    } else {
      return get(data, `${field}`)
    }
  }
}

Popup.propTypes = {
  TablePopup: PropTypes.func,
}

function Popup({ TablePopup, ...props }) {
  return (
    <td className={styles['table-popup']}>
      <TablePopup {...props} />
    </td>
  )
}

export default hot(module)(TableLine)
