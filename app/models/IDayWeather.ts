export interface IDayWeather {
  clouds: number
  dew_point: number
  dt: number
  feels_like: { day: number }
  humidity: number
  pressure: number
  sunrise: number
  sunset: number
  temp: { day: number; min: number; max: number }
  uvi: number
  visibility: number
  weather: { main: string; description: string }[]
  wind_deg: number
  wind_gust: number
  wind_speed: number
}
