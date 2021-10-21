import { combineReducers } from 'redux'

import alertReducer from './alert'
import currentWeatherReducer from './currentWeather'
import futureWeatherReducer from './futureWeather'
import searchReducer from './search'
import themeReducer from './theme'
import weatherInfoReducer from './weatherInfo'

const rootReducer = combineReducers({
  currentWeather: currentWeatherReducer,
  futureWeather: futureWeatherReducer,
  weatherInfo: weatherInfoReducer,
  search: searchReducer,
  theme: themeReducer,
  alert: alertReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
