import { createSelector } from 'reselect'

const selector = createSelector(
  state => state.a,
  state => state.b,
  (a, b) => ({
    c: a * 2,
    d: b * 3,
  })
)

describe('selector creator', () => {
  it(`empty test`, () => {
    // deepEqual(selector({ a: 1, b: 2 }), { c: 2, d: 6 })
    // assert.deepEqual(selector({ a: 2, b: 3 }), { c: 4, d: 9 })
  })
})
