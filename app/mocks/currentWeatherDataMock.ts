import { ICurrentWeather } from 'app/models'

export const currentWeatherDataMock: ICurrentWeather = {
  base: 'base',
  clouds: { all: 100 },
  cod: 100,
  coord: { lat: 52.2167, lon: 21.0333 },
  dt: 1673985681,
  id: 1,
  main: {
    feels_like: 10,
    humidity: 100,
    pressure: 100,
    temp: 20,
    temp_max: 25,
    temp_min: 15,
  },
  name: 'name',
  sys: {
    country: 'Poland',
    id: 1,
    sunrise: 1673985381,
    sunset: 1673985981,
    type: 1,
  },
  timezone: 1,
  visibility: 100,
  weather: [{ main: 'cloudy', description: 'cloudy' }],
  wind: { deg: 100, gust: 100, speed: 100 },
}
