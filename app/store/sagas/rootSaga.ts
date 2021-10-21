import { all, fork } from 'redux-saga/effects'

import currentWeatherSaga from './currentWeather'
import futureWeatherSaga from './futureWeather'

export default function* rootSaga() {
  yield all([fork(currentWeatherSaga), fork(futureWeatherSaga)])
}
