import React from 'react'
import PropTypes from 'prop-types'
import styles from '../index.scss'

PageSize.propTypes = {
  changePageSize: PropTypes.func.isRequired,
  pageSize: PropTypes.number,
}

function PageSize({ changePageSize, pageSize }) {
  const options = [10, 20, 50, 100]
  return (
    <pagination-pagesize>
      <p>Показывать</p>
      <pagination-pagesize-buttons>
        {options.map(el => (
          <button
            {...{
              onClick: () => changePageSize({ pageSize: el }),
              className: pageSize === el ? styles['active'] : '',
            }}
            key={el}
          >
            {el}
          </button>
        ))}
      </pagination-pagesize-buttons>
      <p>позиций</p>
    </pagination-pagesize>
  )
}

export default PageSize
