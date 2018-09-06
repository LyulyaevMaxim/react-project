import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../index.scss'

class PaginationPage extends Component {
  static propTypes = {
    changeActivePage: PropTypes.func.isRequired,
    totalPages: PropTypes.number,
    pageSize: PropTypes.number,
    page: PropTypes.number,
  }

  render() {
    const { pageSize, totalPages, page, realQuantity } = this.props
    const quantityPages = !!realQuantity ? Math.ceil(realQuantity / pageSize) : totalPages
    return (
      <pagination-page className={quantityPages <= 1 ? styles['disable'] : ''}>
        <button
          {...{
            page: page - 1,
            onClick: this.handleClick,
            className: `${styles['pagination-back']} ${page > 1 ? '' : styles['disable']}`,
          }}
        >
          Назад
        </button>
        <pagination-page-buttons>
          {this.paginationButtons({ page, quantityPages })}
        </pagination-page-buttons>
        <button
          {...{
            page: page + 1,
            onClick: this.handleClick,
            className: `${styles['pagination-next']} ${
              page >= quantityPages ? styles['disable'] : ''
            }`,
          }}
        >
          Вперёд
        </button>
      </pagination-page>
    )
  }

  handleClick = async event => {
    const { customPagination, changeActivePage, pageSize } = this.props
    const needPage = Number(event.target.getAttribute('page'))
    customPagination && (await customPagination({ pageSize, needPage }))
    changeActivePage({ page: needPage })
  }

  paginationButtons = ({ page, quantityPages }) => {
    const buttons = []
    if (quantityPages < 5) {
      for (let i = 1; i <= quantityPages; i++) {
        buttons.push(
          <button
            key={`page-${i}`}
            {...{
              page: i,
              onClick: this.handleClick,
              className: page === i ? styles['active'] : '',
            }}
          >
            {i}
          </button>
        )
      }
      return buttons
    }

    buttons.push(
      <button
        key={`page-${1}`}
        {...{
          page: 1,
          onClick: this.handleClick,
          className: page === 1 ? styles['active'] : '',
        }}
      >
        1
      </button>
    )
    switch (page) {
      case 2: {
        buttons.push(
          <button className={styles['active']} key={`page-${2}`}>
            {2}
          </button>
        )
        buttons.push(
          <button className={styles['disable']} key={`page-other-right`}>
            ...
          </button>
        )
        break
      }

      case quantityPages - 1: {
        buttons.push(
          <button className={styles['disable']} key={`page-other-left`}>
            ...
          </button>
        )
        buttons.push(
          <button className={styles['active']} key={`page-${quantityPages - 1}`}>
            {quantityPages - 1}
          </button>
        )
        break
      }

      default: {
        if (page > 2 && page < quantityPages - 1) {
          buttons.push(
            <button className={styles['disable']} key={`page-other-left`}>
              ...
            </button>
          )

          buttons.push(
            <button className={styles['active']} key={`page-${page}`}>
              {page}
            </button>
          )

          buttons.push(
            <button className={styles['disable']} key={`page-other-right`}>
              ...
            </button>
          )
        } else {
          buttons.push(
            <button className={styles['disable']} key={`page-other`}>
              ...
            </button>
          )
        }
      }
    }

    buttons.push(
      <button
        key={`page-${quantityPages}`}
        {...{
          page: quantityPages,
          onClick: this.handleClick,
          className: page === quantityPages ? styles['active'] : '',
        }}
      >
        {quantityPages}
      </button>
    )

    return buttons
  }
}

export default PaginationPage
