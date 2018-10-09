import React, { Component } from 'react'
import Table from '~modules/table'
import { dateToDMYHM } from '~utils/date'
import styles from './index.scss'

const className = require('~utils/react').className({ styles })

class OperationTable extends Component {
  static columns = [
    {
      label: '№',
      styleName: className(['number-column']),
      field: '',
    },
    {
      label: 'Код операции',
      styleName: styles['code-column'],
      fieldFormat: ({ docId }) => (docId.length >= 12 ? `${docId.substr(0, 6)}...${docId.substr(-6)}` : docId),
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
        const [type, label, className] = getStatus({ status })
        return <div styleName={`operation-status ${className}`}>{label}</div>

        function getStatus({ status }) {
          switch (status) {
            case 1:
              return ['DOCUMENT_CREATED', 'Создан', 'orange']
            case 2:
              return ['DOCUMENT_WAITING_FOR_PAY', 'Ожидает оплаты', 'orange']
            case 3:
              return ['DOCUMENT_PAYED_OK', 'Оплачен', 'green']
            case 4:
              return ['DOCUMENT_PAYED_FAIL', 'Ошибка оплаты', 'red']
            case 5:
              return ['DOCUMENT_PAY_CANCELLED', 'Отмена оплаты', 'orange']
            case 6:
              return ['DOCUMENT_ON_TERMINAL', 'На терминале', 'green']
            case 7:
              return ['DOCUMENT_PRINT_OK', 'Распечатан', 'green']
            case 8:
              return ['DOCUMENT_PRINT_FAILED', 'Ошибка печати', 'red']
            case 9:
              return ['DOCUMENT_WAITING_FOR_PAYBACK', 'Ожидание возврата оплаты', 'orange']
            case 10:
              return ['DOCUMENT_PAYBACK_OK', 'Оплата возвращена', 'green']
            case 11:
              return ['DOCUMENT_PAYBACK_FAIL', 'Ошибка возврата оплаты', 'red']
            case 12:
              return ['DOCUMENT_PAYBACK_CANCELLED', 'Оплата отменена', 'orange']
            default: {
              break
            }
          }
        }
      },
    },
    {
      label: 'Дата',
      styleName: styles['time-column'],
      fieldFormat: ({ updated: date }) => dateToDMYHM({ date }),
    },
  ]

  render() {
    return (
      <main>
        <Table
          {...{
            data: require('./data').data,
            columns: OperationTable.columns,
            styleName: styles.table,
          }}
        />
      </main>
    )
  }
}
export default OperationTable
