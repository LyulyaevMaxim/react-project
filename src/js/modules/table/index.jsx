import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Pagination from './pagination'
import TableBody from './tableBody'
import styles from './index.scss'

class Table extends Component {
  state = {
    page: 1,
    pageSize: 50,
  }

  static propTypes = {
    auth: PropTypes.object,
    data: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
  }

  render() {
    const {
      columns,
      data: { data = {}, list = [], realQuantity },
      styleName,
      TablePopup,
      customPagination,
      activePage,
      customKeys = [],
    } = this.props

    const { page, pageSize } = this.state
    const { changeActivePage, changePageSize } = this

    return (
      <section className={`${styles['block-for-table']} ${styleName}`}>
        {list.length ? (
          <Fragment>
            <Pagination
              {...{
                changeActivePage,
                changePageSize,
                totalPages: Math.ceil(list.length / pageSize),
                pageSize,
                realQuantity,
                page: activePage || page,
                customPagination,
              }}
            />
            <table className={styles['table']}>
              <TableBody {...{ data, list, page, pageSize, columns, customKeys, TablePopup }} />
            </table>
          </Fragment>
        ) : (
          <div className={styles['no-data-label']}>
            <p>Нет данных</p>
          </div>
        )}
      </section>
    )
  }

  changeActivePage = ({ page }) => this.setState({ page })

  changePageSize = ({ pageSize }) => this.setState({ pageSize, page: 1 })
}

export default Table
