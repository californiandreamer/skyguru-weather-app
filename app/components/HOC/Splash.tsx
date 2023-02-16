import SplashScreen from 'app/screens/SplashScreen/SplashScreen'
import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { isSplashShown as isSplashSelectorSelector } from 'app/store/selectors/splash'
import { splashEnabled } from 'app/constants/values'

const SplashProvider = ({ children }: { children: JSX.Element }) => {
  const isSplashShown = useSelector(isSplashSelectorSelector)

  // TODO: add __DEV__ feature instead of splashEnabled
  return splashEnabled && isSplashShown ? <SplashScreen /> : children
}

export default SplashProvider
