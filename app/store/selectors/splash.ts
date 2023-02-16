import { RootState } from '../reducers/rootReducer'

const isSplashShown = (state: RootState): boolean => state.splash.isSplashShown

export { isSplashShown }
