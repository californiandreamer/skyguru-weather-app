import { weatherFormatter } from '../weatherFormatter'

describe('weatherFormatter util', () => {
  it('returns right temperature format', () => {
    const input = 16.23
    const output = '16°C'

    expect(weatherFormatter(input, 'temperature')).toEqual(output)
  })

  it('returns right humidity format', () => {
    const input = 50
    const output = '50%'

    expect(weatherFormatter(input, 'humidity')).toEqual(output)
  })

  it('returns right wind format', () => {
    const input = 8
    const output = '8 km/h'

    expect(weatherFormatter(input, 'wind')).toEqual(output)
  })

  it('returns right pressure format', () => {
    const input = 1001
    const output = '1001 hPa'

    expect(weatherFormatter(input, 'pressure')).toEqual(output)
  })

  it('does not brake on undefined input', () => {
    const input = undefined

    expect(weatherFormatter(input, 'pressure')).toBeUndefined()
  })
})
