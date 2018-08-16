import React from 'react'
import { hot } from 'react-hot-loader'
import Table from '~modules/table'
import { dateToDMYHM } from '~utils/date'
import { data } from './data'
import styles from './index.scss'

const className = require('~utils/react').className({ styles })

function TableDemo() {
  const columns = [
    {
      label: '№',
      styleName: className(['number-column', false && 'a', 0 && 'b']),
      field: '',
    },
    {
      label: 'Код операции',
      styleName: styles['code-column'],
      fieldFormat: ({ docId }) =>
        docId.length >= 12 ? `${docId.substr(0, 6)}...${docId.substr(-6)}` : docId,
    },
    {
      label: 'Скидка',
      styleName: styles['discount-column'],
      fieldFormat: ({ receiptDiscount: discount }) => `${discount}%`,
    },
    {
      label: 'Оплачено',
      styleName: styles['sum-column'],
      fieldFormat: ({ totalSum }) => <span>{totalSum}</span>,
    },
    {
      label: 'Статус',
      styleName: styles['status-column'],
      fieldFormat: ({ status }) => {
        let label, className, type
        switch (status) {
          case 1: {
            ;[type, label, className] = ['DOCUMENT_CREATED', 'Создан', 'orange']
            break
          }

          case 2: {
            ;[type, label, className] = ['DOCUMENT_WAITING_FOR_PAY', 'Ожидает оплаты', 'orange']
            break
          }

          case 3: {
            ;[type, label, className] = ['DOCUMENT_PAYED_OK', 'Оплачен', 'green']
            break
          }

          case 4: {
            ;[type, label, className] = ['DOCUMENT_PAYED_FAIL', 'Ошибка оплаты', 'red']
            break
          }

          case 5: {
            ;[type, label, className] = ['DOCUMENT_PAY_CANCELLED', 'Отмена оплаты', 'orange']
            break
          }

          case 6: {
            ;[type, label, className] = ['DOCUMENT_ON_TERMINAL', 'На терминале', 'green']
            break
          }

          case 7: {
            ;[type, label, className] = ['DOCUMENT_PRINT_OK', 'Распечатан', 'green']
            break
          }

          case 8: {
            ;[type, label, className] = ['DOCUMENT_PRINT_FAILED', 'Ошибка печати', 'red']
            break
          }
          case 9: {
            ;[type, label, className] = [
              'DOCUMENT_WAITING_FOR_PAYBACK',
              'Ожидание возврата оплаты',
              'orange',
            ]
            break
          }
          case 10: {
            ;[type, label, className] = ['DOCUMENT_PAYBACK_OK', 'Оплата возвращена', 'green']
            break
          }
          case 11: {
            ;[type, label, className] = ['DOCUMENT_PAYBACK_FAIL', 'Ошибка возврата оплаты', 'red']
            break
          }
          case 12: {
            ;[type, label, className] = ['DOCUMENT_PAYBACK_CANCELLED', 'Оплата отменена', 'orange']
            break
          }
          default: {
            break
          }
        }
        return <div styleName={`operation-status ${className}`}>{label}</div>
      },
    },
    {
      label: 'Дата',
      styleName: styles['time-column'],
      fieldFormat: ({ updated: date }) => dateToDMYHM({ date }),
    },
  ]
  return (
    <Table
      {...{
        data,
        columns,
        styleName: styles['table'],
      }}
    />
  )
}

export default hot(module)(TableDemo)
