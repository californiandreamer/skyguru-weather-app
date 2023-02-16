import { splashTypes } from '../actionTypes/splash'
import { HideSplash, SplashState } from '../types/splash'

const initialState: SplashState = {
  isSplashShown: true,
}

export default (state = initialState, action: HideSplash): SplashState => {
  switch (action.type) {
    case splashTypes.HIDE_SPLASH:
      return {
        ...state,
        isSplashShown: false,
      }
    default:
      return {
        ...state,
      }
  }
}
