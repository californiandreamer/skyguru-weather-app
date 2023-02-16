import { API_KEY, BASE_URL } from 'app/constants/api'
import { realDataFetching, units } from 'app/constants/values'
import { currentWeatherDataMock } from 'app/mocks/currentWeatherDataMock'
import { IGeolocationData, ICurrentWeather } from 'app/models'
import axios from 'axios'
import { all, call, put, takeLatest } from 'redux-saga/effects'

import {
  fetchCurrentWeatherSuccess,
  fetchCurrentWeatherFailure,
} from '../actions/currentWeather'
import { currentWeatherTypes } from '../actionTypes/currentWeather'

export const getCurrentWeather = async (
  position: IGeolocationData
): Promise<ICurrentWeather> => {
  if (realDataFetching) {
    const response = await axios.get(
      `${BASE_URL}weather?lat=${position.latitude}&lon=${position.longitude}&appid=${API_KEY}&units=${units}`
    )
    const data: ICurrentWeather = response.data
    return data
  } else {
    return currentWeatherDataMock
  }
}

export function* fetchCurrentWeatherSaga({
  payload,
}: {
  payload: { [key: string]: IGeolocationData }
  type: ReturnType<typeof fetchCurrentWeatherSaga>
}) {
  const { position } = payload

  try {
    const response: ICurrentWeather = yield call(getCurrentWeather, position)

    yield put(
      fetchCurrentWeatherSuccess({
        currentWeather: response,
      })
    )
  } catch (e) {
    yield put(
      fetchCurrentWeatherFailure({
        error: (e as ErrorEvent).message,
      })
    )
  }
}

function* currentWeatherSaga() {
  yield all([
    takeLatest(
      currentWeatherTypes.FETCH_CURRENT_WEATHER_REQUEST,
      fetchCurrentWeatherSaga
    ),
  ])
}

export default currentWeatherSaga
