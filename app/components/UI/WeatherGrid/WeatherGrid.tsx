import StyledText from 'app/components/HOC/Text'
import Spinner from 'app/components/UI/Spinner/Spinner'
import { largeFontSize, smallFontSize } from 'app/constants/values'
import { useTheme } from 'app/hooks'
import { RootState } from 'app/store/reducers/rootReducer'
import { weatherFormatter } from 'app/utils/weatherFormatter'
import { weatherIconHandler } from 'app/utils/weatherIconHandler'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'

import styles from './WeatherGrid.styles'

export type WeatherT = {
  temperature?: number
  minTemperature?: number
  maxTemperature?: number
  weatherInfo?: string[]
  weatherStatus?: string[]
}

const WeatherGrid: React.FC<WeatherT> = (props) => {
  const [data, setData] = useState<WeatherT | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ theme, position }, updateTheme] = useTheme()

  const { pending, currentWeather, error } = useSelector(
    (state: RootState) => state.currentWeather
  )

  const handleWeatherData = () => {
    const isPropsExist = Object.keys(props).length
    if (isPropsExist) {
      setData({ ...props })
    } else {
      if (currentWeather)
        setData({
          temperature: currentWeather?.main?.temp,
          minTemperature: currentWeather?.main?.temp_min,
          maxTemperature: currentWeather?.main?.temp_max,
          weatherInfo: currentWeather?.weather?.map((item) => item.main),
          weatherStatus: currentWeather?.weather?.map(
            (item) => item.description
          ),
        })
    }
  }

  useEffect(() => {
    handleWeatherData()
  }, [currentWeather, props])

  useEffect(() => {
    updateTheme({
      currentTime: currentWeather?.dt,
      sunrise: currentWeather?.sys.sunrise,
      sunset: currentWeather?.sys.sunset,
    })
  }, [currentWeather])

  const renderWeatherGrid = () => (
    <>
      <View style={styles.weatherStatusRow}>
        <View style={styles.weatherIcon}>
          {weatherIconHandler(
            data?.weatherStatus ? data?.weatherStatus[0] : undefined
          )}
        </View>
        <StyledText fontSize={smallFontSize}>{data?.weatherInfo}</StyledText>
      </View>
      <View style={styles.temperatureRow}>
        <StyledText fontSize={largeFontSize} lineHeight={80}>
          {weatherFormatter(data?.temperature, 'temperature')}
        </StyledText>
      </View>
      <View style={styles.temperatureValuesRow}>
        <StyledText fontSize={smallFontSize}>
          H: {weatherFormatter(data?.maxTemperature, 'temperature')} / L:{' '}
          {weatherFormatter(data?.minTemperature, 'temperature')}
        </StyledText>
      </View>
    </>
  )

  const renderSpinner = () => (
    <View style={styles.spinnerView}>
      <Spinner />
    </View>
  )

  return (
    <View style={styles.container}>
      {!pending && !error && data ? renderWeatherGrid() : renderSpinner()}
    </View>
  )
}

export default WeatherGrid
