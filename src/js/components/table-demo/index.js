import React, { Fragment } from 'react'
import { hot } from 'react-hot-loader'
import Table from '~modules/table'
import { dateToDMYHM } from '~utils/date'
import { data } from './data'
import '~css/table-demo/index.scss'

function TableDemo() {
	const columns = [
		{ label: '№', styleName: 'number-column', field: '' },
		{
			label: 'Код операции',
			styleName: 'code-column',
			field: 'docId',
			fieldFormat: docId =>
				docId.length >= 12 ? `${docId.substr(0, 6)}...${docId.substr(-6)}` : docId
		},
		{
			label: 'Скидка',
			styleName: 'discount-column',
			field: 'receiptDiscount',
			fieldFormat: discount => `${discount}%`
		},
		{
			label: 'Оплачено',
			styleName: 'sum-column',
			fieldFormat: ({ totalSum, payedSum }) =>
				totalSum !== payedSum ? (
					<Fragment>
						<span>{totalSum}</span> из <span>{payedSum}</span>
					</Fragment>
				) : (
					<span>{totalSum}</span>
				)
		},
		{
			label: 'Статус',
			styleName: 'status-column',
			field: 'status',
			fieldFormat: status => {
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
			styleName: 'time-column',
			field: 'updated',
			fieldFormat: date => dateToDMYHM({ date })
		}
	]
	return (
		<Table
			{...{
				data,
				columns,
				styleName: 'table'
			}}
		/>
	)
}

export default hot(module)(TableDemo)
