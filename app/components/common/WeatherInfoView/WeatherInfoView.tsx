import StyledText from 'app/components/HOC/Text'
import Spinner from 'app/components/UI/Spinner/Spinner'
import UserLocationView from 'app/components/UI/UserLocationView/UserLocationView'
import WeatherGrid, {
  WeatherT,
} from 'app/components/UI/WeatherGrid/WeatherGrid'
import { littleFontSize } from 'app/constants/values'
import { IWeatherInfo } from 'app/models'
import { RootState } from 'app/store/reducers/rootReducer'
import { dateFormatHandler } from 'app/utils/dateFormatHandler'
import { weatherFormatter } from 'app/utils/weatherFormatter'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'

import styles from './WeatherInfoView.styles'

const WeatherInfoView: React.FC = () => {
  const weatherInfo = useSelector((state: RootState) => state.weatherInfo.props)

  const gridProps: WeatherT | null = weatherInfo
    ? {
        temperature: weatherInfo.temp.day,
        minTemperature: weatherInfo.temp.min,
        maxTemperature: weatherInfo.temp.max,
        weatherInfo: weatherInfo.weather.map((item) => item.main),
        weatherStatus: weatherInfo.weather.map((item) => item.description),
      }
    : weatherInfo

  const [data, setData] = useState<IWeatherInfo[] | null>(null)

  const handleWeatherData = () => {
    if (weatherInfo)
      setData([
        {
          key: 'Realfeel',
          value: weatherFormatter(weatherInfo.feels_like.day, 'temperature'),
        },
        {
          key: 'Winds',
          value: weatherFormatter(weatherInfo.wind_speed, 'wind'),
        },
        {
          key: 'Humidity',
          value: weatherFormatter(weatherInfo.humidity, 'humidity'),
        },
        {
          key: 'Pressure',
          value: weatherFormatter(weatherInfo.wind_speed, 'pressure'),
        },
        {
          key: 'Sunrise',
          value: dateFormatHandler(weatherInfo.sunrise, 'time'),
        },
        { key: 'Sunset', value: dateFormatHandler(weatherInfo.sunset, 'time') },
      ])
  }

  useEffect(() => {
    handleWeatherData()
  }, [weatherInfo])

  const renderUserLocation = () => (
    <View style={styles.userLocationArea}>
      <UserLocationView isDisabled={true} />
    </View>
  )

  const renderWeatherGrid = () => (
    <View style={styles.weatherGridArea}>
      <WeatherGrid {...gridProps} />
    </View>
  )

  const renderWeatherInfo = () => (
    <View style={styles.weatherInfoArea}>
      <View style={styles.weatherInfoColumn}>
        {data?.map((item) => (
          <StyledText fontSize={littleFontSize} key={item.key}>
            {item.key}:
          </StyledText>
        ))}
      </View>
      <View style={styles.weatherInfoColumn}>
        {data?.map((item) => (
          <StyledText fontSize={littleFontSize} key={item.key}>
            {item.value}
          </StyledText>
        ))}
      </View>
    </View>
  )

  const renderSpinner = () => (
    <View style={styles.spinner}>
      <Spinner />
    </View>
  )

  return (
    <View style={styles.container}>
      {data ? (
        <>
          {renderUserLocation()}
          <View style={styles.infoWrapper}>
            {renderWeatherGrid()}
            {renderWeatherInfo()}
          </View>
        </>
      ) : (
        renderSpinner()
      )}
    </View>
  )
}

export default WeatherInfoView
