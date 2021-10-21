import { IDayWeather } from 'app/models'

import { weatherInfoTypes } from '../actionTypes/weatherInfo'
import { HideWeatherInfo, ShowWeatherInfo } from '../types/weatherInfo'

export const showWeatherInfo = (payload: IDayWeather): ShowWeatherInfo => ({
  type: weatherInfoTypes.SHOW_WEATHER_INFO,
  payload,
})

export const hideWeatherInfo = (): HideWeatherInfo => ({
  type: weatherInfoTypes.HIDE_WEATHER_INFO,
})
