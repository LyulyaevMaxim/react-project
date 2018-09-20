export const removeElement = ({ arr, deleteByIndexes, deleteByValues, obj, deleteByKeys }) => {
  if (typeof arr !== 'undefined') {
    if (deleteByValues) return arr.filter(el => !deleteByValues.some(value => el === value))
    if (deleteByIndexes) {
      const newArray = [...arr]
      deleteByIndexes.forEach(index => delete newArray[index])
      return newArray.filter(Boolean)
    }
  }
  if (typeof obj !== 'undefined') {
    const newObject = { ...obj }
    ;[deleteByKeys].forEach(key => delete newObject[key])
    return newObject
  }
  throw new Error(`Method don't know as work with your type of collection`)
}

export const immutableSort = (arr, callback) => [...arr].sort(callback)

// function insertToArray({ array, index, value }) {}
