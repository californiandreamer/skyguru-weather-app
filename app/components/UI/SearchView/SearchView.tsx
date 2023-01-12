import { PinIcon } from 'app/assets'
import StyledText from 'app/components/HOC/Text'
import {
  defaultIconSize,
  pressOpacity,
  resultsQuantity,
  smallFontSize,
} from 'app/constants/values'
import { useGeolocation } from 'app/hooks'
import { IGeolocationData } from 'app/models'
import { fetchCurrentWeatherRequest } from 'app/store/actions/currentWeather'
import { fetchFutureWeatherRequest } from 'app/store/actions/futureWeather'
import { hideSearch } from 'app/store/actions/search'
import React, { useEffect, useRef, useState } from 'react'
import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import { useDispatch } from 'react-redux'

import styles from './SearchView.styles'
import cities from '../../../data/cities.json'

export type CitiesT = {
  country: string
  lat: string
  lng: string
  city: string
}

const SearchView: React.FC = () => {
  const [value, setValue] = useState<string>('')
  const [results, setResults] = useState<CitiesT[]>([])
  const [position] = useGeolocation()

  const dispatch = useDispatch()
  const inputRef = useRef<TextInput>(null)

  const focusInput = () => inputRef?.current?.focus()

  const filterCities = (text: string): void => {
    setValue(text)

    if (text.length > 2) {
      const filtered: CitiesT[] = cities.filter(
        (item: { city: string | string[] }) => item.city.includes(text)
      )
      const firstItems = filtered.slice(0, resultsQuantity)

      setResults(firstItems)
    } else {
      setResults([])
    }
  }

  const handleResultPress = (city: CitiesT) => {
    const cityPosition: IGeolocationData = {
      latitude: parseFloat(city.lat),
      longitude: parseFloat(city.lng),
    }

    dispatch(fetchCurrentWeatherRequest({ position: cityPosition }))
    dispatch(fetchFutureWeatherRequest({ position: cityPosition }))
    dispatch(hideSearch())
  }

  const handleOwnLocationPress = () => {
    dispatch(fetchCurrentWeatherRequest({ position }))
    dispatch(fetchFutureWeatherRequest({ position }))
    dispatch(hideSearch())
  }

  useEffect(() => {
    focusInput()
  }, [])

  const renderSearchArea = () => (
    <View style={styles.searchArea}>
      <View style={styles.locationIcon}>
        <PinIcon width={defaultIconSize} height={defaultIconSize} />
      </View>
      <TextInput
        style={styles.input}
        value={value}
        ref={inputRef}
        placeholder="Search city"
        accessibilityLabel="answer input"
        onChangeText={filterCities}
      />
    </View>
  )

  const renderResults = () => (
    <View style={styles.resultsArea} testID="results area">
      {results.map((item, index) => {
        console.log('item', item)

        return (
          <TouchableOpacity
            style={styles.resultsItem}
            activeOpacity={pressOpacity}
            key={index}
            accessibilityLabel="result item"
            onPress={() => handleResultPress(item)}
          >
            <StyledText fontSize={smallFontSize}>
              {item.city}, {item.country}
            </StyledText>
          </TouchableOpacity>
        )
      })}
    </View>
  )

  const renderLocationButton = () => (
    <View style={styles.locationButtonArea}>
      <TouchableOpacity
        style={styles.locationButton}
        activeOpacity={pressOpacity}
        accessibilityLabel="location button"
        onPress={handleOwnLocationPress}
      >
        <Text style={styles.locationButtonText}>Use my location</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      {renderSearchArea()}
      {renderResults()}
      {renderLocationButton()}
    </View>
  )
}

export default SearchView
