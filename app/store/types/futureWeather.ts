import { IFutureWeather, IGeolocationData } from 'app/models'

import { futureWeatherTypes } from '../actionTypes/futureWeather'

export interface FutureWeatherState {
  pending: boolean
  futureWeather: IFutureWeather | null
  error: string | null
}

export interface FetchFutureWeatherSuccessPayload {
  futureWeather: IFutureWeather
}

export interface FetchFutureWeatherFailurePayload {
  error: string
}
export interface FetchFutureWeatherRequestPayload {
  position: IGeolocationData
}

export interface FetchFutureWeatherRequest {
  type: typeof futureWeatherTypes.FETCH_FUTURE_WEATHER_REQUEST
  payload: FetchFutureWeatherRequestPayload
}

export type FetchFutureWeatherSuccess = {
  type: typeof futureWeatherTypes.FETCH_FUTURE_WEATHER_SUCCESS
  payload: FetchFutureWeatherSuccessPayload
}

export type FetchFutureWeatherFailure = {
  type: typeof futureWeatherTypes.FETCH_FUTURE_WEATHER_FAILURE
  payload: FetchFutureWeatherFailurePayload
}

export type FutureWeatherActions =
  | FetchFutureWeatherRequest
  | FetchFutureWeatherSuccess
  | FetchFutureWeatherFailure
