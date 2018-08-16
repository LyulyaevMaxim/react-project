export const className = ({ styles }) => {
  return (arrayOfConditions, { useFilter = Boolean, separator = ' ' } = {}) =>
    arrayOfConditions.reduce((accumulator, currentCondition, index) => {
      return !useFilter(currentCondition)
        ? accumulator
        : `${accumulator}${index ? separator : ''}${
          styles ? styles[currentCondition] : currentCondition
        }`
    }, '')
}
