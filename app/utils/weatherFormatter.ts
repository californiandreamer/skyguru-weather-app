export const weatherFormatter = (
  value: number | undefined,
  type: 'temperature' | 'humidity' | 'wind' | 'pressure'
) => {
  if (value) {
    const roundedValue = Math.round(value)
    const temperature = `${roundedValue}°C`

    const humidity = `${value}%`

    const wind = `${roundedValue} km/h`

    const pressure = `${value} hPa`

    switch (type) {
      case 'temperature':
        return temperature
      case 'humidity':
        return humidity
      case 'pressure':
        return pressure
      case 'wind':
        return wind
      default:
        break
    }
  }
}
