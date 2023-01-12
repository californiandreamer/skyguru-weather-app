import { dateFormatHandler } from '../dateFormatHandler'

describe('dateFormatHandler util', () => {
  it('returns right day format', () => {
    const input = 1634745971
    const output = '20.10.2021'

    expect(dateFormatHandler(input, 'day')).toEqual(output)
  })

  it('returns right time format', () => {
    const input = 1634745971
    const outputReg = /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/
    const isValid = outputReg.test(dateFormatHandler(input, 'time'))

    expect(isValid).toBeTruthy()
  })
})
