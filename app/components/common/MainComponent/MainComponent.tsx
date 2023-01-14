import UserLocationView from 'app/components/UI/UserLocationView/UserLocationView'
import WeatherGrid from 'app/components/UI/WeatherGrid/WeatherGrid'
import WeatherSheet from 'app/components/UI/WeatherSheet/WeatherSheet'
import { useTheme } from 'app/hooks'
import { themeHandler } from 'app/utils/themeHandler'
import React, { useEffect } from 'react'
import {
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

import styles from './MainComponent.styles'

const MainComponent: React.FC = () => {
  const { height } = useWindowDimensions()
  const [{ theme, position }] = useTheme()
  const screenOffset = useSharedValue(height)

  const getMountainsAnimatedStyle = (index: number) =>
    useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: withDelay(
              index * 200,
              withTiming(screenOffset.value, {
                duration: 300,
                easing: Easing.bezier(0.1, 0.2, 0.3, 1),
              })
            ),
          },
        ],
      }
    })

  const onInitialAnimation = () => {
    screenOffset.value = 0
  }

  // useEffect(() => {
  //   console.log('offset', offset.value)
  // }, [offset.value])

  useEffect(() => {
    onInitialAnimation()
  }, [])

  const renderMountains = () => (
    <>
      <View style={styles.eclipse}>
        <Image source={themeHandler(theme, 'eclipse')} />
      </View>
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
      style={[styles.sun, { ...position }]}
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
      {/* <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          backgroundColor: 'gray',
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: 100,
        }}
        onPress={onInitialAnimation}
      /> */}
    </View>
  )
}

export default MainComponent
