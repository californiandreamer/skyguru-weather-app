import { currentWeatherTypes } from '../actionTypes/currentWeather'
import {
  FetchCurrentWeatherFailure,
  FetchCurrentWeatherFailurePayload,
  FetchCurrentWeatherRequest,
  FetchCurrentWeatherRequestPayload,
  FetchCurrentWeatherSuccess,
  FetchCurrentWeatherSuccessPayload,
} from '../types/currentWeather'

export const fetchCurrentWeatherRequest = (
  payload: FetchCurrentWeatherRequestPayload
): FetchCurrentWeatherRequest => ({
  type: currentWeatherTypes.FETCH_CURRENT_WEATHER_REQUEST,
  payload,
})

export const fetchCurrentWeatherSuccess = (
  payload: FetchCurrentWeatherSuccessPayload
): FetchCurrentWeatherSuccess => ({
  type: currentWeatherTypes.FETCH_CURRENT_WEATHER_SUCCESS,
  payload,
})

export const fetchCurrentWeatherFailure = (
  payload: FetchCurrentWeatherFailurePayload
): FetchCurrentWeatherFailure => ({
  type: currentWeatherTypes.FETCH_CURRENT_WEATHER_FAILURE,
  payload,
})
