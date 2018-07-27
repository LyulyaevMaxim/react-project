export const removeElement = ({ arr, obj, value, keys }) => {
  if (typeof arr !== 'undefined') return arr.filter(el => el !== value)
  if (typeof obj !== 'undefined') {
    let newObj = { ...obj }
    ;[keys].forEach(key => delete newObj[key])
    return newObj
  }
}

export const immutableSort = (arr, callback) => [...arr].sort(callback)

// function insertToArray({ array, index, value }) {}
