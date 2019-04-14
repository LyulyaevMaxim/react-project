export const removeElement = ({ array, deleteByIndexes, deleteByValues, object, deleteByKeys }) => {
  if (typeof array !== 'undefined') {
    if (deleteByValues) return array.filter(element => !deleteByValues.some(value => element === value))
    if (deleteByIndexes) {
      const newArray = [...array]
      deleteByIndexes.forEach(index => delete newArray[index])
      return newArray.filter(Boolean)
    }
  }
  if (typeof object !== 'undefined') {
    const newObject = { ...object }
    ;[deleteByKeys].forEach(key => delete newObject[key])
    return newObject
  }
  throw new Error(`Method don't know as work with your type of collection`)
}

export const immutableSort = (array, callback) => [...array].sort(callback)

// function insertToArray({ array, index, value }) {}
