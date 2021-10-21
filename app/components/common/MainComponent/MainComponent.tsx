import UserLocationView from 'app/components/UI/UserLocationView/UserLocationView'
import WeatherGrid from 'app/components/UI/WeatherGrid/WeatherGrid'
import WeatherSheet from 'app/components/UI/WeatherSheet/WeatherSheet'
import { useTheme } from 'app/hooks'
import { themeHandler } from 'app/utils/themeHandler'
import React from 'react'
import { Image, ImageSourcePropType, View } from 'react-native'

import styles from './MainComponent.styles'

const MainComponent: React.FC = () => {
  const [{ theme, position }] = useTheme()

  const renderMountains = () => (
    <>
      <View style={styles.eclipse}>
        <Image source={themeHandler(theme, 'eclipse')} />
      </View>
      {themeHandler(theme, 'mountains').map(
        (item: ImageSourcePropType, index: number) => (
          <View style={styles.mountain} key={index}>
            <Image style={styles.mountainImage} source={item} />
          </View>
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
    <Image
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
    </View>
  )
}

export default MainComponent
