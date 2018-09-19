export const removeElement = ({ arr, obj, value, keys }) => {
  if (typeof arr !== 'undefined') return arr.filter(el => el !== value)
  if (typeof obj !== 'undefined') {
    const newObj = { ...obj }
    ;[keys].forEach(key => delete newObj[key])
    return newObj
  }
  throw new Error(`Method don't know as work with your type of collection`)
}

export const immutableSort = (arr, callback) => [...arr].sort(callback)

// function insertToArray({ array, index, value }) {}
