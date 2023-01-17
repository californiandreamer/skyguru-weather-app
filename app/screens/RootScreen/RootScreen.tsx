import { useNetInfo } from '@react-native-community/netinfo'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from './RootScreen.styles'
import LayoutComponent, {
  LayoutT,
} from '../../components/common/LayoutComponent/LayoutComponent'
import MainComponent from '../../components/common/MainComponent/MainComponent'
import {
  locationPermissionContent,
  noConnectionContent,
} from '../../constants/content'
import { fadeTiming, initialAnimationDelay } from '../../constants/values'
import { useGeolocation, useTheme } from '../../hooks'
import { IAlertProps } from '../../models'
import { PermissionService } from '../../services/PermissionService'
import { hideAlert, showAlert } from '../../store/actions/alert'
import { fetchCurrentWeatherRequest } from '../../store/actions/currentWeather'
import { fetchFutureWeatherRequest } from '../../store/actions/futureWeather'
import { hideSearch } from '../../store/actions/search'
import { hideWeatherInfo } from '../../store/actions/weatherInfo'
import { RootState } from '../../store/reducers/rootReducer'
import { themeHandler } from '../../utils/themeHandler'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { violet } from 'app/constants/colors'
import { SafeAreaView } from 'react-native'

const RootScreen = () => {
  const netInfo = useNetInfo()
  const dispatch = useDispatch()

  const { isSearchShown } = useSelector((state: RootState) => state.search)
  const { isAlertShown } = useSelector((state: RootState) => state.alert)
  const { isWeatherInfoShown } = useSelector(
    (state: RootState) => state.weatherInfo
  )

  const currentWeatherPending = useSelector(
    (state: RootState) => state.currentWeather.pending
  )
  const futureWeatherPending = useSelector(
    (state: RootState) => state.futureWeather.pending
  )

  const currentWeatherError = useSelector(
    (state: RootState) => state.currentWeather.error
  )
  const futureWeatherError = useSelector(
    (state: RootState) => state.futureWeather.error
  )

  const [isPending, setIsPending] = useState<boolean>(false)

  const [{ theme }] = useTheme()
  const [position] = useGeolocation()

  const skyColorValue = useSharedValue(violet)

  const checkInternetConnection = () => {
    const props: IAlertProps = {
      ...noConnectionContent,
      action: checkInternetConnection,
    }

    if (netInfo.isConnected) {
      dispatch(hideAlert())
    } else {
      dispatch(showAlert(props))
    }
  }

  const checkLocationPermission = async (): Promise<void> => {
    const isGranted = await PermissionService()
    const props = locationPermissionContent
    if (isGranted) {
      dispatch(hideAlert())
    } else {
      dispatch(showAlert({ ...props, action: () => checkLocationPermission() }))
    }
  }

  let errorProps: IAlertProps
  const errorsHandler = () => {
    if (currentWeatherError !== null) {
      errorProps = {
        text: currentWeatherError,
        action: () => dispatch(fetchCurrentWeatherRequest({ position })),
      }
    } else if (futureWeatherError !== null) {
      errorProps = {
        text: futureWeatherError,
        action: () => dispatch(fetchFutureWeatherRequest({ position })),
      }
    } else {
      dispatch(hideAlert())
    }
    dispatch(showAlert(errorProps))
  }

  const hideLayout = () => {
    setTimeout(() => {
      dispatch(hideAlert())
      dispatch(hideSearch())
      dispatch(hideWeatherInfo())
    }, fadeTiming)
  }

  const onInitialAnimation = () => {
    skyColorValue.value = withTiming(themeHandler(theme, 'sky'))
  }

  const getBackgroundAnimatedStyle = () => {
    return useAnimatedStyle(() => {
      return {
        backgroundColor: withTiming(skyColorValue.value, {
          duration: initialAnimationDelay,
          easing: Easing.linear,
        }),
      }
    })
  }

  const renderMainComponent = () => <MainComponent />
  const renderLayout = ({ type, onHide }: LayoutT) => (
    <LayoutComponent type={type} onHide={onHide} />
  )

  useEffect(() => {
    checkLocationPermission()
    dispatch(fetchCurrentWeatherRequest({ position }))
    dispatch(fetchFutureWeatherRequest({ position }))
  }, [position])

  useEffect(() => {
    errorsHandler()
  }, [currentWeatherError, futureWeatherError])

  useEffect(() => {
    checkInternetConnection()
  }, [netInfo.isConnected])

  useEffect(() => {
    if (futureWeatherPending || currentWeatherPending) {
      setIsPending(true)
    } else {
      setIsPending(false)
    }
  }, [futureWeatherPending, currentWeatherPending])

  useEffect(() => {
    onInitialAnimation()
  }, [])

  return (
    <Animated.View style={[styles.background, getBackgroundAnimatedStyle()]}>
      <SafeAreaView style={styles.container}>
        {renderMainComponent()}
        {isPending ? renderLayout({ type: 'loading' }) : null}
        {isAlertShown
          ? renderLayout({ type: 'alert', onHide: hideLayout })
          : null}
        {isSearchShown
          ? renderLayout({ type: 'search', onHide: hideLayout })
          : null}
        {isWeatherInfoShown
          ? renderLayout({ type: 'weather', onHide: hideLayout })
          : null}
      </SafeAreaView>
    </Animated.View>
  )
}

export default RootScreen
