import { splashTypes } from '../actionTypes/splash'

export type HideSplash = {
  type: typeof splashTypes.HIDE_SPLASH
}

export type SplashState = {
  isSplashShown: boolean
}
