import UserLocationView from 'app/components/UI/UserLocationView/UserLocationView'
import WeatherGrid from 'app/components/UI/WeatherGrid/WeatherGrid'
import WeatherSheet from 'app/components/UI/WeatherSheet/WeatherSheet'
import { useTheme } from 'app/hooks'
import { SunPositionT } from 'app/store/types/theme'
import { themeHandler } from 'app/utils/themeHandler'
import React, { useEffect } from 'react'
import {
  Image,
  ImageSourcePropType,
  useWindowDimensions,
  View,
} from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'

import styles from './MainComponent.styles'

const MainComponent: React.FC = () => {
  const [{ theme, position }] = useTheme()
  const { width, height } = useWindowDimensions()
  const sunOffset = useSharedValue<SunPositionT>({
    ...position,
    top: position.top,
    right: width,
  })
  const mountainsOffset = useSharedValue(height)
  const eclipseOpacity = useSharedValue(0)

  const onInitialAnimation = () => {
    sunOffset.value = position
    mountainsOffset.value = 0
    eclipseOpacity.value = 1
  }

  const getMountainsAnimatedStyle = (index: number) =>
    useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: withDelay(
              index * 200,
              withTiming(mountainsOffset.value, {
                duration: 300,
                easing: Easing.bezier(0.1, 0.2, 0.3, 1),
              })
            ),
          },
        ],
      }
    })

  const getSunAnimatedStyle = () =>
    useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateX: withDelay(
              1000,
              withTiming(sunOffset.value.right, {
                duration: 300,
                easing: Easing.bezier(0.1, 0.2, 0.3, 1),
              })
            ),
          },
        ],
      }
    })

  const getEclipseAnimatedStyle = () =>
    useAnimatedStyle(() => {
      return {
        opacity: withDelay(
          1000,
          withTiming(eclipseOpacity.value, {
            duration: 300,
            easing: Easing.bezier(0.1, 0.2, 0.3, 1),
          })
        ),
      }
    })

  useEffect(() => {
    onInitialAnimation()
  }, [])

  const renderMountains = () => (
    <>
      <Animated.View style={styles.eclipse}>
        <Animated.Image
          style={getEclipseAnimatedStyle()}
          source={themeHandler(theme, 'eclipse')}
        />
      </Animated.View>
      {themeHandler(theme, 'mountains').map(
        (item: ImageSourcePropType, index: number) => (
          <Animated.View
            style={[styles.mountain, getMountainsAnimatedStyle(index)]}
            key={index}
          >
            <Image style={styles.mountainImage} source={item} />
          </Animated.View>
        )
      )}
    </>
  )

  const renderUserLocation = () => (
    <View style={styles.userLocationContainer}>
      <UserLocationView />
    </View>
  )

  const renderWeatherGrid = () => (
    <View style={styles.weatherGridContainer}>
      <WeatherGrid />
    </View>
  )

  const renderSun = () => (
    <Animated.Image
      style={[styles.sun, getSunAnimatedStyle()]}
      source={themeHandler(theme, 'sun')}
    />
  )

  const renderWeatherSheet = () => (
    <View style={styles.weatherSheetContainer}>
      <WeatherSheet />
    </View>
  )

  return (
    <View style={styles.container}>
      {renderUserLocation()}
      {renderWeatherGrid()}
      {renderSun()}
      {renderMountains()}
      {renderWeatherSheet()}
    </View>
  )
}

export default MainComponent
