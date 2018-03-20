import React from 'react'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import Table from '~modules/table'
import { dateToDMY } from '~utils/date'
import '~css/table-demo/index.scss'

const templates = {
	data: {
		'9469f028-5d58-4919-a46a-91a01c22d646': {
			_id: '5a969223691ead00019c5d76',
			name:
				'7449LQ. PENINSULA /0.8мм -180мм/. мойка врезная. нержавейка. ЛЕВАЯ/чаша с сушкой. 740 X 490. (уп5шт)',
			positionId: '8111d850e60dd3a411e619fbb13ea5db',
			salePrice: 30,
			count: 4,
			user: '5a7ae15615cc80000152d72a',
			status: 0,
			__v: 0,
			type: 1,
			countUsed: 0,
			expiredTime: 'Fri Nov 15 2019 12:30:00 GMT+0000 (UTC)',
			uuid: '9469f028-5d58-4919-a46a-91a01c22d646',
			list: []
		},
		'01a3d287-1755-483e-b5f4-2f01c411a398': {
			_id: '5a9693a9691ead00019c5d78',
			name: 'ВЫТЯЖКА MAUNFELD VSH 60 ЧЕРНЫЙ',
			positionId: 'cd63a8db-a506-11e3-bbf3-002618a8d2cb',
			salePrice: 4,
			count: 6,
			user: '5a7ae15615cc80000152d72a',
			status: 0,
			__v: 0,
			type: 1,
			countUsed: 0,
			expiredTime: 'Fri Nov 15 2019 12:30:00 GMT+0000 (UTC)',
			uuid: '01a3d287-1755-483e-b5f4-2f01c411a398',
			list: []
		},
		'd76fec38-9951-4cf6-abb8-7d2a38eef68a': {
			_id: '5a969800691ead00019c5d7a',
			name: 'ВЫТЯЖКА MF-60-1 60 КОРИЧНЕВЫЙ ln',
			positionId: 'a9300300-3b2c-11df-9f94-0018f38078c7',
			salePrice: 4,
			count: 5,
			user: '5a7ae15615cc80000152d72a',
			status: 0,
			__v: 0,
			type: 1,
			countUsed: 0,
			expiredTime: 'Fri Nov 15 2019 12:30:00 GMT+0000 (UTC)',
			uuid: 'd76fec38-9951-4cf6-abb8-7d2a38eef68a',
			list: []
		},
		'f3dfc041-13cd-40e6-9098-ac038adbdf35': {
			_id: '5a969809691ead00019c5d7b',
			name: 'ВЫТЯЖКА Homs ELEGANT 50 БЕЛЫЙ (без фильтров)',
			positionId: '627f57a8-6610-11e7-80d4-0cc47ae333b5',
			salePrice: 6,
			count: 7,
			user: '5a7ae15615cc80000152d72a',
			status: 0,
			__v: 0,
			type: 1,
			countUsed: 0,
			expiredTime: 'Fri Nov 15 2019 12:30:00 GMT+0000 (UTC)',
			uuid: 'f3dfc041-13cd-40e6-9098-ac038adbdf35',
			list: []
		},
		'1c9fea1c-7b3a-4a03-8bb3-723c75f879b9': {
			_id: '5a969814691ead00019c5d7c',
			name: '/*/*/*/*/*',
			positionId: '812fd850e60dd3a411e6e6bd91035e42',
			salePrice: 6,
			count: 5,
			user: '5a7ae15615cc80000152d72a',
			status: 0,
			__v: 0,
			type: 1,
			countUsed: 0,
			expiredTime: 'Fri Nov 15 2019 12:30:00 GMT+0000 (UTC)',
			uuid: '1c9fea1c-7b3a-4a03-8bb3-723c75f879b9',
			list: []
		},
		'efe6a94f-c5ed-4033-9cf8-4e0252f4046f': {
			_id: '5a96984e691ead00019c5d7d',
			name:
				'5050 Q LAGUNA 1 . /0.8мм -180мм/. мойка накладная.нержавейка. одна чаша. 500 x 500. (уп10шт)',
			positionId: 'a05a0018f38078c711e03b498fbc5253',
			salePrice: 4,
			count: 50,
			user: '5a7ae15615cc80000152d72a',
			status: 0,
			__v: 0,
			type: 1,
			countUsed: 0,
			expiredTime: 'Fri Nov 15 2019 12:30:00 GMT+0000 (UTC)',
			uuid: 'efe6a94f-c5ed-4033-9cf8-4e0252f4046f',
			list: []
		},
		'95ed514d-f770-4334-b109-247863792e9d': {
			_id: '5a969852691ead00019c5d7e',
			name: '/Elite/ PF 5060 нерж. (инв)',
			positionId: '810ed850e60dd3a411e6138ed4fceebc',
			salePrice: 5,
			count: 6,
			user: '5a7ae15615cc80000152d72a',
			status: 0,
			__v: 0,
			type: 1,
			countUsed: 0,
			expiredTime: 'Fri Nov 15 2019 12:30:00 GMT+0000 (UTC)',
			uuid: '95ed514d-f770-4334-b109-247863792e9d',
			list: []
		},
		'05759c1f-bb83-4942-8262-666486fcb983': {
			_id: '5a969857691ead00019c5d7f',
			name: '440533 решетка (подставка для посуды)',
			positionId: 'a0b90018f38078c711e0fa3e8cd1d7f0',
			salePrice: 4,
			count: 5,
			user: '5a7ae15615cc80000152d72a',
			status: 0,
			__v: 0,
			type: 1,
			countUsed: 0,
			expiredTime: 'Fri Nov 15 2019 12:30:00 GMT+0000 (UTC)',
			uuid: '05759c1f-bb83-4942-8262-666486fcb983',
			list: []
		},
		'331dcff3-ac2e-499e-b1e8-a812c5ce8f3b': {
			_id: '5a97cce4691ead00019c5d80',
			name: 'Крепления (комплект) к вытяжке BERTA PLUS 90 см INOX glass',
			positionId: '89a0002618a8e06511e34c30d3be7a02',
			salePrice: 456,
			count: 34,
			user: '5a7ae15615cc80000152d72a',
			status: 0,
			__v: 0,
			type: 1,
			countUsed: 0,
			expiredTime: 'Fri Nov 15 2019 12:30:00 GMT+0000 (UTC)',
			uuid: '331dcff3-ac2e-499e-b1e8-a812c5ce8f3b',
			list: []
		}
	},
	list: [
		'9469f028-5d58-4919-a46a-91a01c22d646',
		'01a3d287-1755-483e-b5f4-2f01c411a398',
		'd76fec38-9951-4cf6-abb8-7d2a38eef68a',
		'f3dfc041-13cd-40e6-9098-ac038adbdf35',
		'1c9fea1c-7b3a-4a03-8bb3-723c75f879b9',
		'efe6a94f-c5ed-4033-9cf8-4e0252f4046f',
		'95ed514d-f770-4334-b109-247863792e9d',
		'05759c1f-bb83-4942-8262-666486fcb983',
		'331dcff3-ac2e-499e-b1e8-a812c5ce8f3b'
	]
}

function TableDemo() {
	const columns = [
		{ label: '№', className: 'number-column', field: '' },
		{ label: 'Наименование', className: 'name-column', field: 'name' },
		{ label: 'Использовано', className: 'used-quantity-column', field: 'countUsed' },
		{ label: 'Количество', className: 'quantity-column', field: 'count' },
		{ label: 'Скидка', className: 'discount-column', field: 'salePrice' },
		{
			label: 'Истекает',
			className: 'time-column',
			field: 'expiredTime',
			fieldFormat: date => dateToDMY({ date })
		}
	]
	return (
		<Table
			{...{
				data: templates,
				columns,
				TablePopup: () => (
					<React.Fragment>
						<button>Удалить шаблон</button>
					</React.Fragment>
				)
			}}
		/>
	)
}

export default hot(module)(TableDemo)
