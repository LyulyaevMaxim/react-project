import numeral from 'numeral'

numeral.register('locale', 'ru', {
  delimiters: {
    thousands: ' ',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'тыс.',
    million: 'млн.',
    billion: 'млрд.',
    trillion: 'трлн.',
  },
  ordinal() {
    return '.'
  },
  currency: {
    symbol: 'р.',
  },
})
numeral.locale('ru')

export function compactlyRoundNumber({ number, numberOfSigns = 3, failback = 'N/A' }) {
  const numberValue = parseFloat(number)
  return Number.isNaN(numberValue)
    ? failback
    : numberValue.toFixed(+numberOfSigns).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1')
}
