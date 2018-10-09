export function className({ styles = {} } = {}) {
  return (arrayOfConditions, { useFilter = Boolean, separator = ' ' } = {}) =>
    arrayOfConditions.reduce(
      (accumulator, currentCondition, index) =>
        !useFilter(currentCondition)
          ? accumulator
          : accumulator + (index ? separator : '') + (styles[currentCondition] || currentCondition),
      ''
    )
}

export const generateConstants = (constants = []) => constants.reduce((acc, type) => ({ ...acc, [type]: type }), {})
