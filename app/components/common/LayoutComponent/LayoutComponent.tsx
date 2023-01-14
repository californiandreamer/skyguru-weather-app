import WeatherInfoView from 'app/components/common/WeatherInfoView/WeatherInfoView'
import Bar from 'app/components/HOC/Bar'
import AlertView from 'app/components/UI/AlertView/AlertView'
import SearchView from 'app/components/UI/SearchView/SearchView'
import Spinner from 'app/components/UI/Spinner/Spinner'
import { fadeTiming } from 'app/constants/values'
import React, { useEffect, useRef } from 'react'
import { Animated as RNAnimated, Easing, TouchableOpacity } from 'react-native'

import styles from './LayoutComponent.styles'

export type LayoutT = {
  type: 'loading' | 'search' | 'weather' | 'alert'
  onHide?: () => void
}

const LayoutComponent: React.FC<LayoutT> = ({ type, onHide }) => {
  const fadeAnimation = useRef(new RNAnimated.Value(0)).current

  const fadeIn = () => {
    RNAnimated.timing(fadeAnimation, {
      toValue: 1,
      easing: Easing.ease,
      duration: fadeTiming,
      useNativeDriver: false,
    }).start()
  }

  const fadeOut = () => {
    if (onHide) {
      RNAnimated.timing(fadeAnimation, {
        toValue: 0,
        easing: Easing.ease,
        duration: fadeTiming,
        useNativeDriver: false,
      }).start(() => onHide())
    }
  }

  useEffect(() => {
    fadeIn()
  }, [])

  const renderLoadingSpinner = () => <Spinner />

  const renderAlert = () => (
    <Bar position="top">
      <AlertView />
    </Bar>
  )

  const renderInfoView = () => (
    <Bar position="bottom">
      <WeatherInfoView />
    </Bar>
  )

  const renderSearchView = () => (
    <Bar position="top">
      <SearchView />
    </Bar>
  )

  const returnType = () => {
    switch (type) {
      case 'alert':
        return renderAlert()
      case 'weather':
        return renderInfoView()
      case 'search':
        return renderSearchView()
      case 'loading':
        return renderLoadingSpinner()
      default:
        return null
    }
  }

  return (
    <RNAnimated.View style={[styles.container, { opacity: fadeAnimation }]}>
      <TouchableOpacity
        style={styles.pressableArea}
        activeOpacity={1}
        onPress={() => fadeOut()}
      >
        {returnType()}
      </TouchableOpacity>
    </RNAnimated.View>
  )
}

export default LayoutComponent
