import { dayOfWeekHandler } from '../dayOfWeekHandler'

describe('dayOfWeekHandler util', () => {
  it('returns right day of the week', () => {
    const input = 1634745971
    const output = 'Wednesday'

    expect(dayOfWeekHandler(input)).toEqual(output)
  })
})
