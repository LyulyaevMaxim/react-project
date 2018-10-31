import React, { Component, Fragment } from 'react'
import loadable from 'loadable-components'
import { loadHelper, sequentialLoader } from '~utils/loadHelper'
import styles from './index.pcss'

const sequentialModules = [
  { name: 'Pagination', module: loadable(() => import('./pagination')) },
  { name: 'TableBody', module: loadable(() => import('./tableBody')) },
]

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      pageSize: 50,
    }
  }

  componentDidMount() {
    sequentialLoader({ modules: sequentialModules, setState: this.setState.bind(this) })
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
    const { Pagination, TableBody } = this.state.asyncModules || {}

    return (
      <section className={`${styles['block-for-table']} ${styleName}`}>
        {list.length && (
          <Fragment>
            {Pagination && (
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
            )}
            <table className={styles.table}>
              {TableBody && <TableBody {...{ data, list, page, pageSize, columns, customKeys, TablePopup }} />}
            </table>
          </Fragment>
        )}
        {!list.length && (
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
