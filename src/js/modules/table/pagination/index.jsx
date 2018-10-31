import React, { Component } from 'react'
import loadable from 'loadable-components'
import { loadHelper } from '~utils/loadHelper'
import PropTypes from 'prop-types'

const preloadModules = [
    { name: 'PageSize', module: loadable(() => import('./pageSize')) },
    { name: 'PaginationPage', module: loadable(() => import('./paginationPage')) },
  ],
  postModules = [{ name: 'styles', module: loadable(() => import('./index.pcss')) }]

class Pagination extends Component {
  state = {}
  /*static propTypes = {
    changeActivePage: PropTypes.func.isRequired,
    changePageSize: PropTypes.func.isRequired,
    totalPages: PropTypes.number,
    pageSize: PropTypes.number,
    page: PropTypes.number,
  }*/

  componentDidMount() {
    loadHelper({ preloadModules, postModules, setState: this.setState.bind(this) })
  }

  render() {
    if (this.state.isAsyncModulesLoading !== false) return null
    const { PageSize, PaginationPage } = this.state.asyncModules
    const { changeActivePage, changePageSize, pageSize, totalPages, page, customPagination, realQuantity } = this.props
    return (
      <pagination-block>
        <PageSize {...{ changePageSize, pageSize }} />
        <PaginationPage {...{ changeActivePage, pageSize, totalPages, page, customPagination, realQuantity }} />
      </pagination-block>
    )
  }
}

export default Pagination
