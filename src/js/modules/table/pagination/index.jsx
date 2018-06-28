import React from 'react'
import PageSize from './pageSize'
import PaginationPage from './paginationPage'
import PropTypes from 'prop-types'
import styles from './index.scss'

Pagination.propTypes = {
  changeActivePage: PropTypes.func.isRequired,
  changePageSize: PropTypes.func.isRequired,
  totalPages: PropTypes.number,
  pageSize: PropTypes.number,
  page: PropTypes.number,
}

function Pagination({
  changeActivePage,
  changePageSize,
  pageSize,
  totalPages,
  page,
  customPagination,
  realQuantity,
}) {
  return (
    <pagination-block>
      <PageSize {...{ changePageSize, pageSize }} />
      <PaginationPage
        {...{ changeActivePage, pageSize, totalPages, page, customPagination, realQuantity }}
      />
    </pagination-block>
  )
}

export default Pagination
