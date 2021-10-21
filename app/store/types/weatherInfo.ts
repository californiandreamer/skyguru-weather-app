import { IDayWeather } from 'app/models'

import { weatherInfoTypes } from '../actionTypes/weatherInfo'

export interface WeatherInfoPropsState {
  props: IDayWeather | null
  isWeatherInfoShown: boolean
}

export interface ShowWeatherInfo {
  type: typeof weatherInfoTypes.SHOW_WEATHER_INFO
  payload: IDayWeather
}

export type HideWeatherInfo = {
  type: typeof weatherInfoTypes.HIDE_WEATHER_INFO
}

export type WeatherInfoActions = ShowWeatherInfo | HideWeatherInfo
