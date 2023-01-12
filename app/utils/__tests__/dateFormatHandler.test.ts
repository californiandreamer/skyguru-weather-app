import { dateFormatHandler } from '../dateFormatHandler'

jest.useFakeTimers()

describe('dateFormatHandler util', () => {
  // TODO: fix node 16 fails
  it('returns right day format', () => {
    const input = 1634745971
    const output = '20/10/2021'
    expect(dateFormatHandler(input, 'day')).toEqual(output)
  })

  it('returns right time format', () => {
    const input = 1634745971
    const output = '18:06:11'
    expect(dateFormatHandler(input, 'time')).toEqual(output)
  })
})
