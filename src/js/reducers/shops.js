import { REQUEST, SUCCESS, FAIL, CACHE, GET_SHOPS, GET_PRODUCTS } from '../constants'
import { normalizeEntity } from '../utils/normalize.js'

const initialState = {
	shops: {},
	loadingShops: null,
	activeShop: ''
}

export default (state = initialState, { type, payload = {}, other = {} }) => {
	const { error } = payload
	const { shopUuid } = other

	switch (type) {
		case GET_SHOPS + REQUEST: {
			return { ...state, loadingShops: true }
		}

		case GET_SHOPS + SUCCESS: {
			const payload = [
				{
					updated: '2018-01-09T10:56:35.165Z',
					created: '2018-01-09T10:56:35.165Z',
					paymentType: 'cash',
					payedSum: 105,
					buyerInfo: {
						phone: '79307171781',
						email: '',
						fullName: ''
					},
					totalSum: 19.31,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 1,
					receiptDiscount: 0,
					products: [
						{
							uuid: 'ed618256-ffe5-4bee-805a-7aab4c638608',
							name: 'Товар по 19.31',
							measureName: 'шт',
							price: 19.31,
							count: 1,
							rate: -1
						}
					],
					sberId: '',
					docId: '828675e7-0201-4f0a-ae63-bd853337963d'
				},
				{
					updated: '2018-01-09T11:22:11.836Z',
					created: '2018-01-09T10:58:11.562Z',
					paymentType: 'electron',
					payedSum: 19.31,
					buyerInfo: {
						phone: '',
						email: 'petrovakd@lad24.ru',
						fullName: ''
					},
					totalSum: 19.31,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 5,
					receiptDiscount: 0,
					products: [
						{
							uuid: 'ed618256-ffe5-4bee-805a-7aab4c638608',
							name: 'Товар по 19.31',
							measureName: 'шт',
							price: 19.31,
							count: 1,
							rate: -1
						}
					],
					sberId: 'b20f6e2e-25a9-7393-b20f-6e2e04b0256c',
					docId: '960dfbe0-6c53-4048-932a-f485dde9b3c6'
				},
				{
					updated: '2018-01-09T11:22:18.758Z',
					created: '2018-01-09T10:58:22.485Z',
					paymentType: 'electron',
					payedSum: 19.31,
					buyerInfo: {
						phone: '79307171781',
						email: '',
						fullName: ''
					},
					totalSum: 19.31,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 5,
					receiptDiscount: 0,
					products: [
						{
							uuid: 'ed618256-ffe5-4bee-805a-7aab4c638608',
							name: 'Товар по 19.31',
							measureName: 'шт',
							price: 19.31,
							count: 1,
							rate: -1
						}
					],
					sberId: '6f62d8d4-bf0e-7190-6f62-d8d404b0256c',
					docId: '8fe74c97-2b9f-4cf2-9711-7b5d4e0fa9c0'
				},
				{
					updated: '2018-01-09T12:05:26.745Z',
					created: '2018-01-09T12:05:26.745Z',
					paymentType: 'cash',
					payedSum: 100,
					buyerInfo: {
						phone: '79307171781',
						email: '',
						fullName: ''
					},
					totalSum: 46,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 1,
					receiptDiscount: 0,
					products: [
						{
							uuid: '2ca721d2-a51b-416e-ba06-1e2a0e898085',
							name: 'Майонез Провансаль массовая доля жира 67%, 250 г',
							measureName: 'шт',
							price: 46,
							count: 1,
							rate: 18
						}
					],
					sberId: '',
					docId: 'eab76667-3ea8-46c1-a297-490f0f213db4'
				},
				{
					updated: '2018-01-09T12:23:04.766Z',
					created: '2018-01-09T12:23:04.766Z',
					paymentType: 'cash',
					payedSum: 200,
					buyerInfo: {
						phone: '',
						email: 'Petrovakd@lad24.ru',
						fullName: ''
					},
					totalSum: 150,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 1,
					receiptDiscount: 0,
					products: [
						{
							uuid: '9dfc72ae-f6c9-42c3-95df-14fca429b4be',
							name: 'Котлеты Домашние',
							measureName: 'шт',
							price: 150,
							count: 1,
							rate: 18
						}
					],
					sberId: '',
					docId: '3cbb7a01-d114-4616-8330-fc47e2bc2221'
				},
				{
					updated: '2018-01-09T12:24:13.219Z',
					created: '2018-01-09T12:24:13.219Z',
					paymentType: 'cash',
					payedSum: 200,
					buyerInfo: {
						phone: '76767676676',
						email: '',
						fullName: ''
					},
					totalSum: 150,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 1,
					receiptDiscount: 0,
					products: [
						{
							uuid: '9dfc72ae-f6c9-42c3-95df-14fca429b4be',
							name: 'Котлеты Домашние',
							measureName: 'шт',
							price: 150,
							count: 1,
							rate: 18
						}
					],
					sberId: '',
					docId: 'c5688ec6-0577-4e12-bed7-7f231a0019b1'
				},
				{
					updated: '2018-01-09T12:36:47.433Z',
					created: '2018-01-09T12:36:47.433Z',
					paymentType: 'cash',
					payedSum: 100,
					buyerInfo: {
						phone: '78989898998',
						email: '',
						fullName: ''
					},
					totalSum: 75,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 1,
					receiptDiscount: 0,
					products: [
						{
							uuid: 'f6129577-26fb-4f54-a2f4-6ffdfaf91cd7',
							name: 'Морож Айсберри шербет пласт ст акан мол с черн см 80',
							measureName: 'шт',
							price: 75,
							count: 1,
							rate: 18
						}
					],
					sberId: '',
					docId: '83f03588-1d64-4d92-942d-ec7f18403e39'
				},
				{
					updated: '2018-01-09T12:38:18.937Z',
					created: '2018-01-09T12:38:18.937Z',
					paymentType: 'cash',
					payedSum: 90,
					buyerInfo: {
						phone: '78978787878',
						email: '',
						fullName: ''
					},
					totalSum: 90,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 1,
					receiptDiscount: 0,
					products: [
						{
							uuid: '8051b975-ca5a-4561-9ce0-5a94794bd236',
							name: 'КОНФЕТЫ УМКА С ИРИСОМ КОНТИ-РУС М/У 300Г',
							measureName: 'шт',
							price: 90,
							count: 1,
							rate: -1
						}
					],
					sberId: '',
					docId: '9b7e7a26-5186-48e3-b509-01f4d7cb0b16'
				},
				{
					updated: '2018-01-09T12:39:52.313Z',
					created: '2018-01-09T12:39:52.313Z',
					paymentType: 'cash',
					payedSum: 90,
					buyerInfo: {
						phone: '77687678688',
						email: '',
						fullName: ''
					},
					totalSum: 90,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 1,
					receiptDiscount: 0,
					products: [
						{
							uuid: '8051b975-ca5a-4561-9ce0-5a94794bd236',
							name: 'КОНФЕТЫ УМКА С ИРИСОМ КОНТИ-РУС М/У 300Г',
							measureName: 'шт',
							price: 90,
							count: 1,
							rate: -1
						}
					],
					sberId: '',
					docId: 'd966b42d-ad9b-46ce-807b-482fda9fd806'
				},
				{
					updated: '2018-01-09T12:40:20.493Z',
					created: '2018-01-09T12:40:20.493Z',
					paymentType: 'cash',
					payedSum: 100,
					buyerInfo: {
						phone: '70000000000',
						email: '',
						fullName: ''
					},
					totalSum: 90,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 1,
					receiptDiscount: 0,
					products: [
						{
							uuid: '8051b975-ca5a-4561-9ce0-5a94794bd236',
							name: 'КОНФЕТЫ УМКА С ИРИСОМ КОНТИ-РУС М/У 300Г',
							measureName: 'шт',
							price: 90,
							count: 1,
							rate: -1
						}
					],
					sberId: '',
					docId: '95fd4697-dd7d-43f2-a132-a166dc90c093'
				},
				{
					updated: '2018-01-09T12:41:16.617Z',
					created: '2018-01-09T12:41:16.617Z',
					paymentType: 'cash',
					payedSum: 150,
					buyerInfo: {
						phone: '78786876666',
						email: '',
						fullName: ''
					},
					totalSum: 150,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 1,
					receiptDiscount: 0,
					products: [
						{
							uuid: '9dfc72ae-f6c9-42c3-95df-14fca429b4be',
							name: 'Котлеты Домашние',
							measureName: 'шт',
							price: 150,
							count: 1,
							rate: 18
						}
					],
					sberId: '',
					docId: 'ba3573bb-d398-4cb7-8112-d5addffdf285'
				},
				{
					updated: '2018-01-09T15:02:25.927Z',
					created: '2018-01-09T14:38:52.680Z',
					paymentType: 'electron',
					payedSum: 55,
					buyerInfo: {
						phone: '79308282892',
						email: '',
						fullName: ''
					},
					totalSum: 55,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 5,
					receiptDiscount: 0,
					products: [
						{
							uuid: 'a19d11d7-b9e8-4f6d-927c-958405c0bc03',
							name: 'Пиво светлое Афанасий Марочное Светлое Пастеризованное Ст0.5',
							measureName: 'шт',
							price: 55,
							count: 1,
							rate: 18
						}
					],
					sberId: '1e423d79-8d25-7d68-1e42-3d7904b0256c',
					docId: 'e556372b-299c-4aca-a02b-a029b5435fa1'
				},
				{
					updated: '2018-01-09T15:06:55.340Z',
					created: '2018-01-09T14:43:05.604Z',
					paymentType: 'electron',
					payedSum: 55,
					buyerInfo: {
						phone: '74949494949',
						email: '',
						fullName: ''
					},
					totalSum: 55,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 5,
					receiptDiscount: 0,
					products: [
						{
							uuid: 'a19d11d7-b9e8-4f6d-927c-958405c0bc03',
							name: 'Пиво светлое Афанасий Марочное Светлое Пастеризованное Ст0.5',
							measureName: 'шт',
							price: 55,
							count: 1,
							rate: 18
						}
					],
					sberId: '3cbd9da4-fbbc-73cc-3cbd-9da404b0256c',
					docId: '3ccda718-6a49-4864-bf55-eb45d8cbfb05'
				},
				{
					updated: '2018-01-09T15:16:56.299Z',
					created: '2018-01-09T14:53:00.205Z',
					paymentType: 'electron',
					payedSum: 75,
					buyerInfo: {
						phone: '74564564566',
						email: '',
						fullName: ''
					},
					totalSum: 75,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 5,
					receiptDiscount: 0,
					products: [
						{
							uuid: 'f6129577-26fb-4f54-a2f4-6ffdfaf91cd7',
							name: 'Морож Айсберри шербет пласт ст акан мол с черн см 80',
							measureName: 'шт',
							price: 75,
							count: 1,
							rate: 18
						}
					],
					sberId: 'd380c8ed-8859-7c1a-d380-c8ed04b0256c',
					docId: 'e4dfb908-3223-4f24-a6d0-a61ae47515b5'
				},
				{
					updated: '2018-01-09T15:19:46.673Z',
					created: '2018-01-09T14:55:48.946Z',
					paymentType: 'electron',
					payedSum: 75,
					buyerInfo: {
						phone: '76767767676',
						email: '',
						fullName: ''
					},
					totalSum: 75,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 5,
					receiptDiscount: 0,
					products: [
						{
							uuid: 'f6129577-26fb-4f54-a2f4-6ffdfaf91cd7',
							name: 'Морож Айсберри шербет пласт ст акан мол с черн см 80',
							measureName: 'шт',
							price: 75,
							count: 1,
							rate: 18
						}
					],
					sberId: 'd482d048-91c3-76c9-d482-d04804b0256c',
					docId: '86539ea9-6e0b-49e6-ba93-3bfd35eb0c14'
				},
				{
					updated: '2018-01-10T06:36:47.675Z',
					created: '2018-01-10T06:12:51.259Z',
					paymentType: 'electron',
					payedSum: 150,
					buyerInfo: {
						phone: '79879899797',
						email: '',
						fullName: ''
					},
					totalSum: 150,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 5,
					receiptDiscount: 0,
					products: [
						{
							uuid: '9dfc72ae-f6c9-42c3-95df-14fca429b4be',
							name: 'Котлеты Домашние',
							measureName: 'шт',
							price: 150,
							count: 1,
							rate: 18
						}
					],
					sberId: '87f1d640-4166-739f-87f1-d64004b0256c',
					docId: '600a288a-d8ad-4ff6-a0a2-bc4c901b0b38'
				},
				{
					updated: '2018-01-10T06:39:17.862Z',
					created: '2018-01-10T06:15:21.626Z',
					paymentType: 'electron',
					payedSum: 55,
					buyerInfo: {
						phone: '79798798798',
						email: '',
						fullName: ''
					},
					totalSum: 55,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 5,
					receiptDiscount: 0,
					products: [
						{
							uuid: 'a19d11d7-b9e8-4f6d-927c-958405c0bc03',
							name: 'Пиво светлое Афанасий Марочное Светлое Пастеризованное Ст0.5',
							measureName: 'шт',
							price: 55,
							count: 1,
							rate: 18
						}
					],
					sberId: '4f760198-ac3c-7353-4f76-019804b0256c',
					docId: '15480bfd-820a-4513-925b-45d294678522'
				},
				{
					updated: '2018-01-10T06:41:50.183Z',
					created: '2018-01-10T06:17:52.181Z',
					paymentType: 'electron',
					payedSum: 55,
					buyerInfo: {
						phone: '78768768767',
						email: '',
						fullName: ''
					},
					totalSum: 55,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 5,
					receiptDiscount: 0,
					products: [
						{
							uuid: 'a19d11d7-b9e8-4f6d-927c-958405c0bc03',
							name: 'Пиво светлое Афанасий Марочное Светлое Пастеризованное Ст0.5',
							measureName: 'шт',
							price: 55,
							count: 1,
							rate: 18
						}
					],
					sberId: '8b7ac531-183a-710e-8b7a-c53104b0256c',
					docId: '4ba476b7-fe43-4090-b0ba-9c054651b9ee'
				},
				{
					updated: '2018-01-10T06:52:45.092Z',
					created: '2018-01-10T06:28:44.870Z',
					paymentType: 'electron',
					payedSum: 46,
					buyerInfo: {
						phone: '79879898777',
						email: '',
						fullName: ''
					},
					totalSum: 46,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 5,
					receiptDiscount: 0,
					products: [
						{
							uuid: '2ca721d2-a51b-416e-ba06-1e2a0e898085',
							name: 'Майонез Провансаль массовая доля жира 67%, 250 г',
							measureName: 'шт',
							price: 46,
							count: 1,
							rate: 18
						}
					],
					sberId: 'fa352ee4-8df0-7497-fa35-2ee404b0256c',
					docId: '20886b3e-e61e-4327-aee1-48d3d625eb45'
				},
				{
					updated: '2018-01-10T07:35:46.345Z',
					created: '2018-01-10T07:35:46.345Z',
					paymentType: 'cash',
					payedSum: 100,
					buyerInfo: {
						phone: '78768768768',
						email: 'petrovakd@lad24.ru',
						fullName: ''
					},
					totalSum: 90,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 1,
					receiptDiscount: 0,
					products: [
						{
							uuid: '8051b975-ca5a-4561-9ce0-5a94794bd236',
							name: 'КОНФЕТЫ УМКА С ИРИСОМ КОНТИ-РУС М/У 300Г',
							measureName: 'шт',
							price: 90,
							count: 1,
							rate: -1
						}
					],
					sberId: '',
					docId: 'fd062f26-e833-488f-aa07-cb1cd98fa21e'
				},
				{
					updated: '2018-01-10T08:05:32.445Z',
					created: '2018-01-10T08:05:32.445Z',
					paymentType: 'cash',
					payedSum: 200,
					buyerInfo: {
						phone: '78978798797',
						email: '',
						fullName: ''
					},
					totalSum: 150,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 1,
					receiptDiscount: 0,
					products: [
						{
							uuid: '9dfc72ae-f6c9-42c3-95df-14fca429b4be',
							name: 'Котлеты Домашние',
							measureName: 'шт',
							price: 150,
							count: 1,
							rate: 18
						}
					],
					sberId: '',
					docId: '701f1a8f-fd12-4cd3-9093-746ce458b840'
				},
				{
					updated: '2018-01-10T08:07:16.130Z',
					created: '2018-01-10T08:07:16.130Z',
					paymentType: 'cash',
					payedSum: 150,
					buyerInfo: {
						phone: '79879879878',
						email: '',
						fullName: ''
					},
					totalSum: 150,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 1,
					receiptDiscount: 0,
					products: [
						{
							uuid: '9dfc72ae-f6c9-42c3-95df-14fca429b4be',
							name: 'Котлеты Домашние',
							measureName: 'шт',
							price: 150,
							count: 1,
							rate: 18
						}
					],
					sberId: '',
					docId: '00458b40-a3f5-4a0b-a1e7-9e1b85e67ef1'
				},
				{
					updated: '2018-01-10T08:11:17.281Z',
					created: '2018-01-10T08:11:17.281Z',
					paymentType: 'cash',
					payedSum: 100,
					buyerInfo: {
						phone: '78686876788',
						email: '',
						fullName: ''
					},
					totalSum: 55,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 1,
					receiptDiscount: 0,
					products: [
						{
							uuid: 'a19d11d7-b9e8-4f6d-927c-958405c0bc03',
							name: 'Пиво светлое Афанасий Марочное Светлое Пастеризованное Ст0.5',
							measureName: 'шт',
							price: 55,
							count: 1,
							rate: 18
						}
					],
					sberId: '',
					docId: 'dd7fad5d-aa6c-4646-85c7-062d7dc2b4be'
				},
				{
					updated: '2018-01-10T08:12:28.652Z',
					created: '2018-01-10T08:12:28.652Z',
					paymentType: 'cash',
					payedSum: 55,
					buyerInfo: {
						phone: '77676766676',
						email: '',
						fullName: ''
					},
					totalSum: 55,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 1,
					receiptDiscount: 0,
					products: [
						{
							uuid: 'a19d11d7-b9e8-4f6d-927c-958405c0bc03',
							name: 'Пиво светлое Афанасий Марочное Светлое Пастеризованное Ст0.5',
							measureName: 'шт',
							price: 55,
							count: 1,
							rate: 18
						}
					],
					sberId: '',
					docId: '4ed50eb4-2e40-49a9-8e97-99ae7f69f6ca'
				},
				{
					updated: '2018-01-10T08:34:12.247Z',
					created: '2017-12-28T10:39:58.995Z',
					paymentType: 'electron',
					payedSum: 19.31,
					buyerInfo: {
						phone: '79404040047',
						email: '',
						fullName: ''
					},
					totalSum: 19.31,
					cashier: '5a3b841e2ea9d201009ce984',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 6,
					receiptDiscount: 0,
					products: [
						{
							uuid: 'ed618256-ffe5-4bee-805a-7aab4c638608',
							name: 'Товар по 19.31',
							measureName: 'шт',
							price: 19.31,
							count: 1,
							rate: -1
						}
					],
					sberId: '16144790-bc60-7268-1614-479004b0256c',
					docId: '078e84fa-240e-433d-be32-0b8e433c82db'
				},
				{
					updated: '2018-01-10T08:34:18.302Z',
					created: '2018-01-10T07:03:39.683Z',
					paymentType: 'electron',
					payedSum: 90,
					buyerInfo: {
						phone: '78768768768',
						email: '',
						fullName: ''
					},
					totalSum: 90,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 6,
					receiptDiscount: 0,
					products: [
						{
							uuid: '8051b975-ca5a-4561-9ce0-5a94794bd236',
							name: 'КОНФЕТЫ УМКА С ИРИСОМ КОНТИ-РУС М/У 300Г',
							measureName: 'шт',
							price: 90,
							count: 1,
							rate: -1
						}
					],
					sberId: 'c035ee60-536d-7cdd-c035-ee6004b0256c',
					docId: 'c064921a-74ec-4369-883e-bc8518efc869'
				},
				{
					updated: '2018-01-10T08:34:25.126Z',
					created: '2018-01-10T08:29:27.890Z',
					paymentType: 'electron',
					payedSum: 90,
					buyerInfo: {
						phone: '77656576555',
						email: '',
						fullName: ''
					},
					totalSum: 90,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 6,
					receiptDiscount: 0,
					products: [
						{
							uuid: '8051b975-ca5a-4561-9ce0-5a94794bd236',
							name: 'КОНФЕТЫ УМКА С ИРИСОМ КОНТИ-РУС М/У 300Г',
							measureName: 'шт',
							price: 90,
							count: 1,
							rate: -1
						}
					],
					sberId: 'c9ecb2df-f727-7e15-c9ec-b2df04b0256c',
					docId: 'c39733dd-8d3a-4e50-9d55-4590d3d80fe5'
				},
				{
					updated: '2018-01-10T08:47:24.595Z',
					created: '2018-01-10T08:46:39.234Z',
					paymentType: 'electron',
					payedSum: 90,
					buyerInfo: {
						phone: '78989898989',
						email: '',
						fullName: ''
					},
					totalSum: 90,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 6,
					receiptDiscount: 0,
					products: [
						{
							uuid: '8051b975-ca5a-4561-9ce0-5a94794bd236',
							name: 'КОНФЕТЫ УМКА С ИРИСОМ КОНТИ-РУС М/У 300Г',
							measureName: 'шт',
							price: 90,
							count: 1,
							rate: -1
						}
					],
					sberId: '4d2f6482-7d45-7e3f-4d2f-648204b0256c',
					docId: '4ee24455-7cd0-416b-8ba9-f7203d188797'
				},
				{
					updated: '2018-01-10T08:51:10.699Z',
					created: '2018-01-10T08:50:22.082Z',
					paymentType: 'electron',
					payedSum: 55,
					buyerInfo: {
						phone: '77676767676',
						email: '',
						fullName: ''
					},
					totalSum: 55,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 6,
					receiptDiscount: 0,
					products: [
						{
							uuid: 'a19d11d7-b9e8-4f6d-927c-958405c0bc03',
							name: 'Пиво светлое Афанасий Марочное Светлое Пастеризованное Ст0.5',
							measureName: 'шт',
							price: 55,
							count: 1,
							rate: 18
						}
					],
					sberId: 'dbd5e71d-c201-7805-dbd5-e71d04b0256c',
					docId: 'bc673c1a-3ad3-4b0d-b1a0-b9898ee0a6ad'
				},
				{
					updated: '2018-01-10T09:02:25.960Z',
					created: '2018-01-10T09:02:25.960Z',
					paymentType: 'cash',
					payedSum: 35,
					buyerInfo: {
						phone: '77887687666',
						email: '',
						fullName: ''
					},
					totalSum: 35,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 1,
					receiptDiscount: 0,
					products: [
						{
							uuid: 'da8ac69c-72a2-4be7-aec9-64b4517360c5',
							name: 'Хлеб Дарницкий формовой 0.6 кг',
							measureName: 'шт',
							price: 35,
							count: 1,
							rate: 18
						}
					],
					sberId: '',
					docId: 'cf940e64-00f6-4290-8618-c142074539a5'
				},
				{
					updated: '2018-01-10T09:36:03.538Z',
					created: '2018-01-10T09:36:03.310Z',
					paymentType: 'electron',
					payedSum: 35,
					buyerInfo: {
						phone: '78787878787',
						email: '',
						fullName: ''
					},
					totalSum: 35,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 4,
					receiptDiscount: 0,
					products: [
						{
							uuid: 'da8ac69c-72a2-4be7-aec9-64b4517360c5',
							name: 'Хлеб Дарницкий формовой 0.6 кг',
							measureName: 'шт',
							price: 35,
							count: 1,
							rate: 18
						}
					],
					sberId: '12b5843b-8938-4d64-b4f4-93baa37c8813',
					docId: '95b791a5-7c09-41db-b8fd-1ee16ce31061'
				},
				{
					updated: '2018-01-10T09:48:53.221Z',
					created: '2018-01-10T09:47:47.430Z',
					paymentType: 'electron',
					payedSum: 35,
					buyerInfo: {
						phone: '77676767676',
						email: '',
						fullName: ''
					},
					totalSum: 35,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 6,
					receiptDiscount: 0,
					products: [
						{
							uuid: 'da8ac69c-72a2-4be7-aec9-64b4517360c5',
							name: 'Хлеб Дарницкий формовой 0.6 кг',
							measureName: 'шт',
							price: 35,
							count: 1,
							rate: 18
						}
					],
					sberId: '31068456-7b54-7b71-3106-845604b0256c',
					docId: 'cfa189c0-f044-40da-9d2f-d7f8e0f54a6b'
				},
				{
					updated: '2018-01-10T10:32:36.412Z',
					created: '2018-01-10T10:32:36.412Z',
					paymentType: 'cash',
					payedSum: 100,
					buyerInfo: {
						phone: '79898989898',
						email: '',
						fullName: ''
					},
					totalSum: 90,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 1,
					receiptDiscount: 0,
					products: [
						{
							uuid: '8051b975-ca5a-4561-9ce0-5a94794bd236',
							name: 'КОНФЕТЫ УМКА С ИРИСОМ КОНТИ-РУС М/У 300Г',
							measureName: 'шт',
							price: 90,
							count: 1,
							rate: -1
						}
					],
					sberId: '',
					docId: '3b55394e-3042-4d15-9f8f-a84de4d42bbe'
				},
				{
					updated: '2018-01-10T10:33:41.667Z',
					created: '2018-01-10T10:33:41.667Z',
					paymentType: 'cash',
					payedSum: 100,
					buyerInfo: {
						phone: '77677677676',
						email: '',
						fullName: ''
					},
					totalSum: 90,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 1,
					receiptDiscount: 0,
					products: [
						{
							uuid: '8051b975-ca5a-4561-9ce0-5a94794bd236',
							name: 'КОНФЕТЫ УМКА С ИРИСОМ КОНТИ-РУС М/У 300Г',
							measureName: 'шт',
							price: 90,
							count: 1,
							rate: -1
						}
					],
					sberId: '',
					docId: '1afd889b-3e03-4fa6-9e86-58a27180c833'
				},
				{
					updated: '2018-01-10T10:37:52.170Z',
					created: '2018-01-10T10:37:51.608Z',
					paymentType: 'electron',
					payedSum: 55,
					buyerInfo: {
						phone: '77676766767',
						email: '',
						fullName: ''
					},
					totalSum: 55,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 2,
					receiptDiscount: 0,
					products: [
						{
							uuid: 'a19d11d7-b9e8-4f6d-927c-958405c0bc03',
							name: 'Пиво светлое Афанасий Марочное Светлое Пастеризованное Ст0.5',
							measureName: 'шт',
							price: 55,
							count: 1,
							rate: 18
						}
					],
					sberId: 'b030b4c2-78c5-742c-b030-b4c204b0256c',
					docId: 'd21d6256-7f4d-4a93-88d1-d046d35e5d58'
				},
				{
					updated: '2018-01-10T10:41:01.132Z',
					created: '2018-01-10T10:39:49.521Z',
					paymentType: 'electron',
					payedSum: 90,
					buyerInfo: {
						phone: '77878787878',
						email: '',
						fullName: ''
					},
					totalSum: 90,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 6,
					receiptDiscount: 0,
					products: [
						{
							uuid: '8051b975-ca5a-4561-9ce0-5a94794bd236',
							name: 'КОНФЕТЫ УМКА С ИРИСОМ КОНТИ-РУС М/У 300Г',
							measureName: 'шт',
							price: 90,
							count: 1,
							rate: -1
						}
					],
					sberId: '996e2f1a-bc65-721b-996e-2f1a04b0256c',
					docId: '66506b0a-62c6-4e8a-a063-a509f80b00e5'
				},
				{
					updated: '2018-01-10T10:49:52.599Z',
					created: '2018-01-10T10:49:15.401Z',
					paymentType: 'electron',
					payedSum: 90,
					buyerInfo: {
						phone: '78787878787',
						email: '',
						fullName: ''
					},
					totalSum: 90,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 6,
					receiptDiscount: 0,
					products: [
						{
							uuid: '8051b975-ca5a-4561-9ce0-5a94794bd236',
							name: 'КОНФЕТЫ УМКА С ИРИСОМ КОНТИ-РУС М/У 300Г',
							measureName: 'шт',
							price: 90,
							count: 1,
							rate: -1
						}
					],
					sberId: '4b132aa1-aac4-78b4-4b13-2aa104b0256c',
					docId: 'eda2d1a7-15aa-4747-a341-8e312b780b4d'
				},
				{
					updated: '2018-01-10T11:48:49.119Z',
					created: '2018-01-10T11:47:50.540Z',
					paymentType: 'electron',
					payedSum: 35,
					buyerInfo: {
						phone: '79494949494',
						email: '',
						fullName: ''
					},
					totalSum: 35,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '93dad447-3372-466b-9837-84cdf258050e',
					printErrMsg: '',
					status: 7,
					receiptDiscount: 0,
					products: [
						{
							uuid: 'da8ac69c-72a2-4be7-aec9-64b4517360c5',
							name: 'Хлеб Дарницкий формовой 0.6 кг',
							measureName: 'шт',
							price: 35,
							count: 1,
							rate: 18
						}
					],
					sberId: 'fd98495f-6bcc-79a0-fd98-495f04b0256c',
					docId: '9d7398a3-e6ea-463c-a330-f533fb0ead4e'
				},
				{
					updated: '2018-01-10T12:18:23.607Z',
					created: '2018-01-10T12:18:17.301Z',
					paymentType: 'cash',
					payedSum: 100,
					buyerInfo: {
						phone: '79898989898',
						email: '',
						fullName: ''
					},
					totalSum: 35,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: 'bfa86f60-2d2e-4ec5-bc35-9b7b8cf9439c',
					printErrMsg: '',
					status: 7,
					receiptDiscount: 0,
					products: [
						{
							uuid: 'da8ac69c-72a2-4be7-aec9-64b4517360c5',
							name: 'Хлеб Дарницкий формовой 0.6 кг',
							measureName: 'шт',
							price: 35,
							count: 1,
							rate: 18
						}
					],
					sberId: '',
					docId: 'cbe04429-4b5f-41ee-acb5-b979264b7fa4'
				},
				{
					updated: '2018-01-10T12:20:40.946Z',
					created: '2018-01-10T11:49:07.807Z',
					paymentType: 'unknown',
					payedSum: 19.31,
					buyerInfo: {
						phone: '78787878787',
						email: '',
						fullName: ''
					},
					totalSum: 19.31,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '128614e8-d453-4c44-ba3c-52cea099ca8e',
					printErrMsg: '',
					status: 7,
					receiptDiscount: 0,
					products: [
						{
							uuid: 'ed618256-ffe5-4bee-805a-7aab4c638608',
							name: 'Товар по 19.31',
							measureName: 'шт',
							price: 19.31,
							count: 1,
							rate: -1
						}
					],
					sberId: '',
					docId: 'af23f631-13d2-402a-b7c6-a477b6ec9982'
				},
				{
					updated: '2018-01-10T12:31:24.024Z',
					created: '2018-01-10T12:31:14.542Z',
					paymentType: 'cash',
					payedSum: 19.31,
					buyerInfo: {
						phone: '',
						email: 'petrovakd@lad24.ru',
						fullName: ''
					},
					totalSum: 19.31,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '68de37d2-f7bd-411f-b993-97f8ef3454bb',
					printErrMsg: '',
					status: 7,
					receiptDiscount: 0,
					products: [
						{
							uuid: 'ed618256-ffe5-4bee-805a-7aab4c638608',
							name: 'Товар по 19.31',
							measureName: 'шт',
							price: 19.31,
							count: 1,
							rate: -1
						}
					],
					sberId: '',
					docId: '0f204dc1-be58-464e-8be3-94d2ce17d8dc'
				},
				{
					updated: '2018-01-10T12:32:58.150Z',
					created: '2018-01-10T12:32:53.279Z',
					paymentType: 'cash',
					payedSum: 19.31,
					buyerInfo: {
						phone: '',
						email: 'petrovakd@lad24.ru',
						fullName: ''
					},
					totalSum: 19.31,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: 'a04fdabd-e89c-4153-be81-a36239b8c9e0',
					printErrMsg: '',
					status: 7,
					receiptDiscount: 0,
					products: [
						{
							uuid: 'ed618256-ffe5-4bee-805a-7aab4c638608',
							name: 'Товар по 19.31',
							measureName: 'шт',
							price: 19.31,
							count: 1,
							rate: -1
						}
					],
					sberId: '',
					docId: '69488447-902d-409a-b202-615186433038'
				},
				{
					updated: '2018-01-10T12:34:33.179Z',
					created: '2018-01-10T12:34:26.689Z',
					paymentType: 'cash',
					payedSum: 19.31,
					buyerInfo: {
						phone: '',
						email: 'petrovakd@lad24.ru',
						fullName: ''
					},
					totalSum: 19.31,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '2578e63a-355b-4ba1-919b-97e89b8d4f80',
					printErrMsg: '',
					status: 7,
					receiptDiscount: 0,
					products: [
						{
							uuid: 'ed618256-ffe5-4bee-805a-7aab4c638608',
							name: 'Товар по 19.31',
							measureName: 'шт',
							price: 19.31,
							count: 1,
							rate: -1
						}
					],
					sberId: '',
					docId: '3e522889-ff22-4786-adbc-428693239a54'
				},
				{
					updated: '2018-01-10T12:36:17.361Z',
					created: '2018-01-10T12:36:13.177Z',
					paymentType: 'cash',
					payedSum: 19.31,
					buyerInfo: {
						phone: '',
						email: 'petrovakd@lad24.ru',
						fullName: ''
					},
					totalSum: 19.31,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '1f472122-3a25-4cd6-8abb-515743f317f3',
					printErrMsg: '',
					status: 7,
					receiptDiscount: 0,
					products: [
						{
							uuid: 'ed618256-ffe5-4bee-805a-7aab4c638608',
							name: 'Товар по 19.31',
							measureName: 'шт',
							price: 19.31,
							count: 1,
							rate: -1
						}
					],
					sberId: '',
					docId: '81830183-3ccf-47b4-a214-934abbdf9f23'
				},
				{
					updated: '2018-01-10T12:36:42.676Z',
					created: '2018-01-10T12:36:32.265Z',
					paymentType: 'cash',
					payedSum: 105,
					buyerInfo: {
						phone: '79307171781',
						email: '',
						fullName: ''
					},
					totalSum: 19.31,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: 'c4f6ea32-3697-4f3f-9b10-784915045551',
					printErrMsg: '',
					status: 7,
					receiptDiscount: 0,
					products: [
						{
							uuid: 'ed618256-ffe5-4bee-805a-7aab4c638608',
							name: 'Товар по 19.31',
							measureName: 'шт',
							price: 19.31,
							count: 1,
							rate: -1
						}
					],
					sberId: '',
					docId: '6e5d2945-1de3-4c59-ae58-8f5ca24aac9e'
				},
				{
					updated: '2018-01-10T12:55:11.120Z',
					created: '2018-01-10T12:55:01.150Z',
					paymentType: 'cash',
					payedSum: 500,
					buyerInfo: {
						phone: '79307171781',
						email: '',
						fullName: ''
					},
					totalSum: 246,
					cashier: '5a3b841e2ea9d201009ce982',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '3719a425-e2cb-465f-b3a7-18884305c395',
					printErrMsg: '',
					status: 7,
					receiptDiscount: 0,
					products: [
						{
							uuid: '2ca721d2-a51b-416e-ba06-1e2a0e898085',
							name: 'Майонез Провансаль массовая доля жира 67%, 250 г',
							measureName: 'шт',
							price: 46,
							count: 1,
							rate: 18
						},
						{
							uuid: 'da8ac69c-72a2-4be7-aec9-64b4517360c5',
							name: 'Хлеб Дарницкий формовой 0.6 кг',
							measureName: 'шт',
							price: 35,
							count: 1,
							rate: 18
						},
						{
							uuid: '1cc78d80-3195-4f48-b13a-fa95402ee307',
							name: 'Соль морская пищевая 1 кг',
							measureName: 'шт',
							price: 25,
							count: 1,
							rate: 18
						},
						{
							uuid: '4672fc3f-f284-4331-bcc2-152f24298f1d',
							name: 'Пельмени натуральные',
							measureName: 'шт',
							price: 140,
							count: 1,
							rate: 18
						}
					],
					sberId: '',
					docId: '3b4e4971-3b4c-4bc7-a19a-6c0b1b2af5dc'
				},
				{
					updated: '2018-01-10T12:58:41.025Z',
					created: '2018-01-10T12:58:40.871Z',
					paymentType: 'electron',
					payedSum: 55,
					buyerInfo: {
						phone: '79494949494',
						email: '',
						fullName: ''
					},
					totalSum: 55,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '',
					printErrMsg: '',
					status: 4,
					receiptDiscount: 0,
					products: [
						{
							uuid: 'a19d11d7-b9e8-4f6d-927c-958405c0bc03',
							name: 'Пиво светлое Афанасий Марочное Светлое Пастеризованное Ст0.5',
							measureName: 'шт',
							price: 55,
							count: 1,
							rate: 18
						}
					],
					sberId: '1794455c-b8b9-46f8-8d42-246d55b90315',
					docId: '4b38430f-ec30-4ffb-985f-7d27b64a6ea3'
				},
				{
					updated: '2018-01-10T13:03:43.211Z',
					created: '2018-01-10T12:59:23.028Z',
					paymentType: 'electron',
					payedSum: 90,
					buyerInfo: {
						phone: '79898998989',
						email: '',
						fullName: ''
					},
					totalSum: 90,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '4fa98baf-036b-45d3-8a7c-a30415c98aee',
					printErrMsg: '',
					status: 7,
					receiptDiscount: 0,
					products: [
						{
							uuid: '8051b975-ca5a-4561-9ce0-5a94794bd236',
							name: 'КОНФЕТЫ УМКА С ИРИСОМ КОНТИ-РУС М/У 300Г',
							measureName: 'шт',
							price: 90,
							count: 1,
							rate: -1
						}
					],
					sberId: 'b4dc3404-a36c-713f-b4dc-340404b0256c',
					docId: 'd897923c-5971-4875-96ff-65e69d71c77e'
				},
				{
					updated: '2018-01-10T13:16:59.357Z',
					created: '2018-01-10T13:16:50.431Z',
					paymentType: 'cash',
					payedSum: 500,
					buyerInfo: {
						phone: '79307171781',
						email: '',
						fullName: ''
					},
					totalSum: 150,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '76f95680-f24a-4326-8414-1a416a7e89f7',
					printErrMsg: '',
					status: 7,
					receiptDiscount: 0,
					products: [
						{
							uuid: '9dfc72ae-f6c9-42c3-95df-14fca429b4be',
							name: 'Котлеты Домашние',
							measureName: 'шт',
							price: 150,
							count: 1,
							rate: 18
						}
					],
					sberId: '',
					docId: 'fce9c963-bf06-4472-8c61-8b216b23a692'
				},
				{
					updated: '2018-01-10T13:19:21.040Z',
					created: '2018-01-10T13:19:14.797Z',
					paymentType: 'cash',
					payedSum: 150,
					buyerInfo: {
						phone: '78787878787',
						email: '',
						fullName: ''
					},
					totalSum: 150,
					cashier: '5a3b841e2ea9d201009ce986',
					user: '5a3b84192ea9d201009ce981',
					terminal: '5a3b86b92ea9d201009ce995',
					rrn: '',
					docType: 'sell',
					allowedToPayback: true,
					paybackReceiptDocIds: [],
					receiptId: '2625539d-593b-43c2-a411-d108160b6b3c',
					printErrMsg: '',
					status: 7,
					receiptDiscount: 0,
					products: [
						{
							uuid: '9dfc72ae-f6c9-42c3-95df-14fca429b4be',
							name: 'Котлеты Домашние',
							measureName: 'шт',
							price: 150,
							count: 1,
							rate: 18
						}
					],
					sberId: '',
					docId: '56da3ccd-ebe6-4b78-a25a-08db5f18e80b'
				}
			]

			return {
				...state,
				loadingShops: false,
				shops: {
					...state.shops,
					...normalizeEntity({ data: payload, entities: 'shops', key: 'docId' })
				}
			}
		}

		case GET_SHOPS + FAIL: {
			return { ...state, loadingShops: null, error }
		}

		case GET_PRODUCTS + REQUEST: {
			return { ...state, loadingProducts: true }
		}

		case GET_PRODUCTS + SUCCESS: {
			return {
				...state,
				loadingProducts: false,
				activeShop: shopUuid,
				products: {
					...state.products,
					[shopUuid]: normalizeEntity({ data: payload, entities: 'products', key: 'uuid' })
				}
			}
		}

		case GET_PRODUCTS + CACHE: {
			return {
				...state,
				activeShop: payload.uuid
			}
		}

		case GET_PRODUCTS + FAIL: {
			return { ...state, loadingProducts: null, error }
		}

		default:
			return state
	}
}
