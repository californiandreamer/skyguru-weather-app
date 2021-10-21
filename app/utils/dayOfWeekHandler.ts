export const dayOfWeekHandler = (timestamp: number) => {
  const a = new Date(timestamp * 1000)
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const dayOfWeek = days[a.getDay()]
  return dayOfWeek
}
