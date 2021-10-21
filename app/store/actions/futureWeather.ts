import { futureWeatherTypes } from '../actionTypes/futureWeather'
import {
  FetchFutureWeatherFailure,
  FetchFutureWeatherFailurePayload,
  FetchFutureWeatherRequest,
  FetchFutureWeatherRequestPayload,
  FetchFutureWeatherSuccess,
  FetchFutureWeatherSuccessPayload,
} from '../types/futureWeather'

export const fetchFutureWeatherRequest = (
  payload: FetchFutureWeatherRequestPayload
): FetchFutureWeatherRequest => ({
  type: futureWeatherTypes.FETCH_FUTURE_WEATHER_REQUEST,
  payload,
})

export const fetchFutureWeatherSuccess = (
  payload: FetchFutureWeatherSuccessPayload
): FetchFutureWeatherSuccess => ({
  type: futureWeatherTypes.FETCH_FUTURE_WEATHER_SUCCESS,
  payload,
})

export const fetchFutureWeatherFailure = (
  payload: FetchFutureWeatherFailurePayload
): FetchFutureWeatherFailure => ({
  type: futureWeatherTypes.FETCH_FUTURE_WEATHER_FAILURE,
  payload,
})
