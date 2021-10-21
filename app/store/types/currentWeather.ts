import { ICurrentWeather, IGeolocationData } from 'app/models'

import { currentWeatherTypes } from '../actionTypes/currentWeather'

export interface CurrentWeatherState {
  pending: boolean
  currentWeather: ICurrentWeather | null
  error: string | null
}

export interface FetchCurrentWeatherSuccessPayload {
  currentWeather: ICurrentWeather
}

export interface FetchCurrentWeatherFailurePayload {
  error: string
}
export interface FetchCurrentWeatherRequestPayload {
  position: IGeolocationData
}

export interface FetchCurrentWeatherRequest {
  type: typeof currentWeatherTypes.FETCH_CURRENT_WEATHER_REQUEST
  payload: FetchCurrentWeatherRequestPayload
}

export type FetchCurrentWeatherSuccess = {
  type: typeof currentWeatherTypes.FETCH_CURRENT_WEATHER_SUCCESS
  payload: FetchCurrentWeatherSuccessPayload
}

export type FetchCurrentWeatherFailure = {
  type: typeof currentWeatherTypes.FETCH_CURRENT_WEATHER_FAILURE
  payload: FetchCurrentWeatherFailurePayload
}

export type CurrentWeatherActions =
  | FetchCurrentWeatherRequest
  | FetchCurrentWeatherSuccess
  | FetchCurrentWeatherFailure
