import { weatherInfoTypes } from '../actionTypes/weatherInfo'
import { WeatherInfoActions, WeatherInfoPropsState } from '../types/weatherInfo'

const initialState: WeatherInfoPropsState = {
  props: null,
  isWeatherInfoShown: false,
}

export default (
  state = initialState,
  action: WeatherInfoActions
): WeatherInfoPropsState => {
  switch (action.type) {
    case weatherInfoTypes.SHOW_WEATHER_INFO:
      return {
        ...state,
        props: action.payload,
        isWeatherInfoShown: true,
      }
    case weatherInfoTypes.HIDE_WEATHER_INFO:
      return {
        ...state,
        props: null,
        isWeatherInfoShown: false,
      }
    default:
      return {
        ...state,
      }
  }
}
