import { IDayWeather } from './IDayWeather'

export interface IFutureWeather {
  current: IDayWeather
  daily: IDayWeather[]
  hourly: []
  lat: number
  lon: number
  minutely: []
  timezone: string
  timezone_offset: number
}
