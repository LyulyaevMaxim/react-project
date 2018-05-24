export const removeElement = ({ arr, obj, value, keys }) => {
  switch (true) {
    case (typeof arr !== 'undefined'): {
      return arr.filter(el => el !== value)
    }
    case (typeof obj !== 'undefined'): {
      let newObj = { ...obj };
      [keys].forEach(key => delete newObj[key])
      return newObj
    }
  }
}

function insertToArray({ array, index, value }) { }
