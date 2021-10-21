import { API_KEY, BASE_URL } from 'app/constants/api'
import { units } from 'app/constants/values'
import { IGeolocationData, IFutureWeather } from 'app/models'
import axios from 'axios'
import { all, call, put, takeLatest } from 'redux-saga/effects'

import {
  fetchFutureWeatherSuccess,
  fetchFutureWeatherFailure,
} from '../actions/futureWeather'
import { futureWeatherTypes } from '../actionTypes/futureWeather'

const getFutureWeather = async (
  position: IGeolocationData
): Promise<IFutureWeather> => {
  const response = await axios.get(
    `${BASE_URL}onecall?lat=${position.latitude}&lon=${position.longitude}&appid=${API_KEY}&units=${units}`
  )
  const data: IFutureWeather = response.data
  return data
}

function* fetchFutureWeatherSaga({
  payload,
}: {
  payload: { [key: string]: IGeolocationData }
  type: ReturnType<typeof fetchFutureWeatherSaga>
}) {
  const { position } = payload
  try {
    const response: IFutureWeather = yield call(getFutureWeather, position)

    yield put(
      fetchFutureWeatherSuccess({
        futureWeather: response,
      })
    )
  } catch (e) {
    yield put(
      fetchFutureWeatherFailure({
        error: (e as ErrorEvent).message,
      })
    )
  }
}

function* futureWeatherSaga() {
  yield all([
    takeLatest(
      futureWeatherTypes.FETCH_FUTURE_WEATHER_REQUEST,
      fetchFutureWeatherSaga
    ),
  ])
}

export default futureWeatherSaga
