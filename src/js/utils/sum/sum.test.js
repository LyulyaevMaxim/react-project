const { sum } = require('./index')
// function sum(a, b) {
//   return a + b
// }

test('adds 1 + 2 to equal 3', () => {
  // console.log(require('utils/sum'))
  // console.log(__DEV__)
  expect(sum(1, 2)).toBe(3)
})
