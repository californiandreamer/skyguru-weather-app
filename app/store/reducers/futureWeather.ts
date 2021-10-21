import { futureWeatherTypes } from '../actionTypes/futureWeather'
import {
  FutureWeatherActions,
  FutureWeatherState,
} from '../types/futureWeather'

const initialState: FutureWeatherState = {
  pending: false,
  futureWeather: null,
  error: null,
}

export default (
  state = initialState,
  action: FutureWeatherActions
): FutureWeatherState => {
  switch (action.type) {
    case futureWeatherTypes.FETCH_FUTURE_WEATHER_REQUEST:
      return {
        ...state,
        pending: true,
      }
    case futureWeatherTypes.FETCH_FUTURE_WEATHER_SUCCESS:
      return {
        ...state,
        pending: false,
        futureWeather: action.payload.futureWeather,
        error: null,
      }
    case futureWeatherTypes.FETCH_FUTURE_WEATHER_FAILURE:
      return {
        ...state,
        pending: false,
        futureWeather: null,
        error: action.payload.error,
      }
    default:
      return {
        ...state,
      }
  }
}
