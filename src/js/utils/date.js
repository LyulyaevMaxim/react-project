import moment from 'moment'
import 'moment/locale/ru'
moment.locale('ru')

export function dateToDMY({ date }) {
	return moment(date).format('L')
}

export function formatDate() {}

