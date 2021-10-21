import { currentWeatherTypes } from '../actionTypes/currentWeather'
import {
  CurrentWeatherActions,
  CurrentWeatherState,
} from '../types/currentWeather'

const initialState: CurrentWeatherState = {
  pending: false,
  currentWeather: null,
  error: null,
}

export default (
  state = initialState,
  action: CurrentWeatherActions
): CurrentWeatherState => {
  switch (action.type) {
    case currentWeatherTypes.FETCH_CURRENT_WEATHER_REQUEST:
      return {
        ...state,
        pending: true,
      }
    case currentWeatherTypes.FETCH_CURRENT_WEATHER_SUCCESS:
      return {
        ...state,
        pending: false,
        currentWeather: action.payload.currentWeather,
        error: null,
      }
    case currentWeatherTypes.FETCH_CURRENT_WEATHER_FAILURE:
      return {
        ...state,
        pending: false,
        currentWeather: null,
        error: action.payload.error,
      }
    default:
      return {
        ...state,
      }
  }
}
