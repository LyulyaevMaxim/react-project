import React, { Component } from 'react'
import cached from 'react-cached-callback'
import PropTypes from 'prop-types'
import styles from '../index.scss'

class PageSize extends Component {
  /*static propTypes = {
    changePageSize: PropTypes.func.isRequired,
    pageSize: PropTypes.number,
  }*/

  static options = [10, 20, 50, 100]

  shouldComponentUpdate(nextProps) {
    if (nextProps.pageSize !== this.props.pageSize) return true
    return null
  }

  @cached
  createOnClick(el) {
    return () => this.props.changePageSize({ pageSize: el })
  }

  render() {
    const { pageSize } = this.props
    return (
      <pagination-pagesize>
        <p>Показывать</p>
        <pagination-pagesize-buttons>
          {PageSize.options.map(el => (
            <button
              key={el}
              {...{
                onClick: this.createOnClick(el),
                className: pageSize === el ? styles.active : '',
              }}
            >
              {el}
            </button>
          ))}
        </pagination-pagesize-buttons>
        <p>позиций</p>
      </pagination-pagesize>
    )
  }
}

export default PageSize
