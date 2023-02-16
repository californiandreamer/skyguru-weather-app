import StyledText from 'app/components/HOC/Text'
import { daysQuantity, pressOpacity } from 'app/constants/values'
import { IDayWeather } from 'app/models'
import { showWeatherInfo } from 'app/store/actions/weatherInfo'
import { RootState } from 'app/store/reducers/rootReducer'
import { dayOfWeekHandler } from 'app/utils/dayOfWeekHandler'
import { weatherFormatter } from 'app/utils/weatherFormatter'
import { weatherIconHandler } from 'app/utils/weatherIconHandler'
import React, { useEffect, useState } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import styles from './WeatherSheet.styles'

type WeatherSheetT = {
  onTouchMoveDown: (locationY: number) => void
  onTouchMoveEnd: () => void
}

const WeatherSheet: React.FC<WeatherSheetT> = ({
  onTouchMoveDown,
  onTouchMoveEnd,
}) => {
  const dispatch = useDispatch()

  const [data, setData] = useState<IDayWeather[] | null>(null)
  const slicedData = data?.slice(0, daysQuantity)

  const { futureWeather } = useSelector((state: RootState) => {
    return state.futureWeather
  })

  const handleWeatherData = () => {
    if (futureWeather) {
      setData(futureWeather.daily)
    }
  }

  useEffect(() => {
    handleWeatherData()
  }, [futureWeather])

  const renderWeatherItem = (item: IDayWeather) => (
    <TouchableOpacity
      style={styles.item}
      key={item.dt}
      activeOpacity={pressOpacity}
      accessibilityLabel="daily item"
      onPress={() => {
        dispatch(showWeatherInfo(item))
      }}
    >
      <StyledText>{dayOfWeekHandler(item.dt)}</StyledText>
      <View style={styles.itemWrapper}>
        <StyledText>
          {weatherFormatter(item.temp.day, 'temperature')}
        </StyledText>
        <View style={styles.itemIcon}>
          {weatherIconHandler(
            item.weather.map((weatherItem) => weatherItem.description)[0]
          )}
        </View>
      </View>
    </TouchableOpacity>
  )

  const renderWeatherItems = () => (
    <FlatList
      data={slicedData}
      renderItem={({ item }) => renderWeatherItem(item)}
      keyExtractor={(item) => item.dt.toString()}
      // TODO: implement pull-to-refresh logic
      // bounces={true}
      // bouncesZoom={true}
      // refreshing={false}
      // showsVerticalScrollIndicator={false}
      // onRefresh={() => {
      //   // TODO: add common data fetch saga
      // }}
      // onTouchMove={({ nativeEvent }) => {
      //   if (nativeEvent.locationY > 40 && nativeEvent.locationY < 180) {
      //     onTouchMoveDown(nativeEvent.locationY)
      //   }
      // }}
      // onTouchEnd={() => onTouchMoveEnd()}
    />
  )

  return <View style={styles.container}>{renderWeatherItems()}</View>
}

export default WeatherSheet
