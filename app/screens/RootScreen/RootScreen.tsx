import { useNetInfo } from '@react-native-community/netinfo'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import LayoutComponent, {
  LayoutT,
} from '../../components/common/LayoutComponent/LayoutComponent'
import MainComponent from '../../components/common/MainComponent/MainComponent'
import {
  locationPermissionContent,
  noConnectionContent,
} from '../../constants/content'
import { fadeTiming } from '../../constants/values'
import { useGeolocation, useStorage, useTheme } from '../../hooks'
import { IAlertProps } from '../../models'
import { PermissionService } from '../../services/PermissionService'
import { hideAlert, showAlert } from '../../store/actions/alert'
import { fetchCurrentWeatherRequest } from '../../store/actions/currentWeather'
import { fetchFutureWeatherRequest } from '../../store/actions/futureWeather'
import { hideSearch } from '../../store/actions/search'
import { hideWeatherInfo } from '../../store/actions/weatherInfo'
import { RootState } from '../../store/reducers/rootReducer'
import { themeHandler } from '../../utils/themeHandler'
import styles from './RootScreen.styles'

const RootScreen = () => {
  // constants
  const netInfo = useNetInfo()
  const dispatch = useDispatch()

  const { isSearchShown } = useSelector((state: RootState) => state.search)
  const { isAlertShown } = useSelector((state: RootState) => state.alert)
  const { isWeatherInfoShown } = useSelector(
    (state: RootState) => state.weatherInfo
  )

  // pending
  const currentWeatherPending = useSelector(
    (state: RootState) => state.currentWeather.pending
  )
  const futureWeatherPending = useSelector(
    (state: RootState) => state.futureWeather.pending
  )

  // errors
  const currentWeatherError = useSelector(
    (state: RootState) => state.currentWeather.error
  )
  const futureWeatherError = useSelector(
    (state: RootState) => state.futureWeather.error
  )

  // state
  const [isPending, setIsPending] = useState<boolean>(false)

  // hooks
  const [{ theme }] = useTheme()
  const [position] = useGeolocation()

  // handlers
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

  // renderers
  const renderMainComponent = () => <MainComponent />

  const renderLayout = ({ type, onHide }: LayoutT) => (
    <LayoutComponent type={type} onHide={onHide} />
  )

  // effects
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

  // MMKV
  const { setItemToStorage, getItemFromStorage } = useStorage()

  useEffect(() => {
    const userName = 'Nazar'
    const userType = 'admin'

    setItemToStorage({ key: 'user.name', value: userName })
    setItemToStorage({ key: 'user.type', value: userType })

    const getUserName = getItemFromStorage({ key: 'user.name', type: 'string' })
    const getUserType = getItemFromStorage({ key: 'user.type', type: 'string' })

    console.log('user name from storage: ', getUserName)
    console.log('user type from storage: ', getUserType)
  }, [])

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: themeHandler(theme, 'sky') },
      ]}
    >
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
  )
}

export default RootScreen
