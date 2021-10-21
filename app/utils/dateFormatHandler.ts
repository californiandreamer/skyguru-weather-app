export const dateFormatHandler = (timestamp: number, type: 'day' | 'time') => {
  const converted = new Date(timestamp * 1000)
  const time = converted.toTimeString().split(' ')[0]
  const day = converted.toLocaleString().split(',')[0]

  switch (type) {
    case 'time':
      return time
    case 'day':
      return day
    default:
      break
  }
}
