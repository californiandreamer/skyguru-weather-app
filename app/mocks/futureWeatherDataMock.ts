import { IFutureWeather, IDayWeather } from 'app/models'

const dayWeatherMock: IDayWeather = {
  clouds: 100,
  dew_point: 100,
  dt: 1673985681,
  feels_like: { day: 10 },
  humidity: 100,
  pressure: 100,
  sunrise: 1673985381,
  sunset: 1673985981,
  temp: { day: 20, min: 15, max: 25 },
  uvi: 100,
  visibility: 100,
  weather: [{ main: 'cloudy', description: 'cloudy' }],
  wind_deg: 100,
  wind_gust: 100,
  wind_speed: 100,
}

export const futureDataMock: IFutureWeather = {
  current: dayWeatherMock,
  daily: [dayWeatherMock],
  hourly: [],
  lat: 52.2167,
  lon: 21.0333,
  minutely: [],
  timezone: ' ',
  timezone_offset: 1,
}
