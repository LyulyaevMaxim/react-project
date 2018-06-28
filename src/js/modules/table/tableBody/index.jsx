import React from 'react'
import { hot } from 'react-hot-loader'
import TableLine from '../tableLine'
import styles from './index.scss'

function TableBody({ data, list, page, pageSize, columns, customKeys, TablePopup }) {
  const getBody = () => {
    const table = []
    for (let i = pageSize * (page - 1); i < page * pageSize && i < list.length; i++) {
      table.push(
        <TableLine
          {...{
            lineIndex: i + 1,
            data: data[list[i]],
            columns,
            TablePopup,
            key: `line${
              customKeys.length
                ? customKeys.reduce((prev, current) => `${prev}-${data[list[i]][current]}`, '')
                : `-${list[i]}`
            }`,
          }}
        />,
      )
    }
    return table
  }

  return (
    <tbody>
      <tr className={styles['tr']}>
        {columns.map(({ styleName, label }, index) => (
          <th className={`${styles['th']} ${styleName}`} key={`th-${index}`}>
            {label}
          </th>
        ))}
      </tr>
      {getBody()}
    </tbody>
  )
}

export default hot(module)(TableBody)
