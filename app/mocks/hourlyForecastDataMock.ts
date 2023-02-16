import { IDailyForecast } from 'app/models/IDailyForecast'

const hourlyForecastDataMock: IDailyForecast[] = [
  {
    clouds: { all: 75 },
    dt: 1674496800,
    dt_txt: '2023-01-23 18:00:00',
    main: {
      feels_like: -1.6,
      grnd_level: 1023,
      humidity: 90,
      pressure: 1037,
      sea_level: 1037,
      temp: 1.62,
      temp_kf: -0.3,
      temp_max: 1.92,
      temp_min: 1.62,
    },
    pop: 0,
    sys: { pod: 'n' },
    visibility: 10000,
    weather: [
      { description: 'broken clouds', icon: '04n', id: 803, main: 'Clouds' },
    ],
    wind: { deg: 31, gust: 5.91, speed: 3.05 },
  },
]
