import React from 'react'
import { hot } from 'react-hot-loader'
import Table from '~modules/table'
import { dateToDMYHM } from '~utils/date'
import { data } from './data'
import styles from './index.scss'

function TableDemo() {
	const columns = [
		{ label: '№', styleName: styles['number-column'], field: '' },
		{
			label: 'Код операции',
			styleName: styles['code-column'],
			fieldFormat: ({ docId }) =>
				docId.length >= 12 ? `${docId.substr(0, 6)}...${docId.substr(-6)}` : docId
		},
		{
			label: 'Скидка',
			styleName: styles['discount-column'],
			fieldFormat: ({ receiptDiscount: discount }) => `${discount}%`
		},
		{
			label: 'Оплачено',
			styleName: styles['sum-column'],
			fieldFormat: ({ totalSum }) => <span>{totalSum}</span>
		},
		{
			label: 'Статус',
			styleName: styles['status-column'],
			fieldFormat: ({ status }) => {
				let label, className, type
				switch (status) {
					case 1: {
						type = 'DOCUMENT_CREATED'
						label = 'Создан'
						className = 'orange'
						break
					}

					case 2: {
						type = 'DOCUMENT_WAITING_FOR_PAY'
						label = 'Ожидает оплаты'
						className = 'orange'
						break
					}

					case 3: {
						type = 'DOCUMENT_PAYED_OK'
						label = 'Оплачен'
						className = 'green'
						break
					}

					case 4: {
						type = 'DOCUMENT_PAYED_FAIL'
						label = 'Ошибка оплаты'
						className = 'red'
						break
					}

					case 5: {
						type = 'DOCUMENT_PAY_CANCELLED'
						label = 'Отмена оплаты'
						className = 'orange'
						break
					}

					case 6: {
						type = 'DOCUMENT_ON_TERMINAL'
						label = 'На терминале'
						className = 'green'
						break
					}

					case 7: {
						type = 'DOCUMENT_PRINT_OK'
						label = 'Распечатан'
						className = 'green'
						break
					}

					case 8: {
						type = 'DOCUMENT_PRINT_FAILED'
						label = 'Ошибка печати'
						className = 'red'
						break
					}
					case 9: {
						type = 'DOCUMENT_WAITING_FOR_PAYBACK'
						label = 'Ожидание возврата оплаты'
						className = 'orange'
						break
					}
					case 10: {
						type = 'DOCUMENT_PAYBACK_OK'
						label = 'Оплата возвращена'
						className = 'green'
						break
					}
					case 11: {
						type = 'DOCUMENT_PAYBACK_FAIL'
						label = 'Ошибка возврата оплаты'
						className = 'red'
						break
					}
					case 12: {
						type = 'DOCUMENT_PAYBACK_CANCELLED'
						label = 'Оплата отменена'
						className = 'orange'
						break
					}
					default: {
						break
					}
				}
				return <div styleName={`operation-status ${className}`}>{label}</div>
			}
		},
		{
			label: 'Дата',
			styleName: styles['time-column'],
			fieldFormat: ({ updated: date }) => dateToDMYHM({ date })
		}
	]
	return (
		<Table
			{...{
				data,
				columns,
				styleName: styles['table']
			}}
		/>
	)
}

export default hot(module)(TableDemo)
