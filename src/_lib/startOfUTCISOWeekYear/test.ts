/* eslint-env mocha */

import assert from 'assert'
import startOfUTCISOWeekYear from '.'

describe('startOfUTCISOWeekYear', () => {
  it('returns the date with the time set to 00:00:00 and the date set to the first day of an ISO year', () => {
    const result = startOfUTCISOWeekYear(
      new Date(Date.UTC(2009, 0 /* Jan */, 1, 16, 0))
    )
    assert.deepStrictEqual(
      result,
      new Date(Date.UTC(2008, 11 /* Dec */, 29, 0, 0, 0, 0))
    )
  })

  it('accepts a timestamp', () => {
    const result = startOfUTCISOWeekYear(
      new Date(Date.UTC(2005, 0 /* Jan */, 1, 6, 0)).getTime()
    )
    assert.deepStrictEqual(
      result,
      new Date(Date.UTC(2003, 11 /* Dec */, 29, 0, 0, 0, 0))
    )
  })

  it('does not mutate the original date', () => {
    const date = new Date(Date.UTC(2014, 6 /* Jul */, 2))
    startOfUTCISOWeekYear(date)
    assert.deepStrictEqual(date, new Date(Date.UTC(2014, 6 /* Jul */, 2)))
  })

  it('handles dates before 100 AD', () => {
    const initialDate = new Date(0)
    initialDate.setUTCFullYear(9, 0 /* Jan */, 1)
    initialDate.setUTCHours(0, 0, 0, 0)
    const expectedResult = new Date(0)
    expectedResult.setUTCFullYear(8, 11 /* Dec */, 29)
    expectedResult.setUTCHours(0, 0, 0, 0)
    const result = startOfUTCISOWeekYear(initialDate)
    assert.deepStrictEqual(result, expectedResult)
  })

  it('correctly handles years in which 4 January is Sunday', () => {
    const result = startOfUTCISOWeekYear(
      new Date(Date.UTC(2009, 6 /* Jul */, 2))
    )
    assert.deepStrictEqual(result, new Date(Date.UTC(2008, 11 /* Dec */, 29)))
  })

  it('returns `Invalid Date` if the given date is invalid', () => {
    const result = startOfUTCISOWeekYear(new Date(NaN))
    assert(result instanceof Date && isNaN(result.getTime()))
  })

  it('throws TypeError exception if passed less than 1 argument', () => {
    assert.throws(startOfUTCISOWeekYear.bind(null), TypeError)
  })
})
