export function className({ styles }) {
  return (arrayOfConditions, { useFilter = Boolean, separator = ' ' } = {}) =>
    arrayOfConditions.reduce(
      (accumulator, currentCondition, index) =>
        !useFilter(currentCondition)
          ? accumulator
          : `${accumulator}${index ? separator : ''}${
              styles ? styles[currentCondition] : currentCondition
            }`,
      ''
    )
}
