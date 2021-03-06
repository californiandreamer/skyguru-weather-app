import { PinIcon } from 'app/assets'
import StyledText from 'app/components/HOC/Text'
import {
  defaultIconSize,
  pressOpacity,
  resultsQuantity,
  smallFontSize,
} from 'app/constants/values'
import { IGeolocationData } from 'app/models'
import { fetchCurrentWeatherRequest } from 'app/store/actions/currentWeather'
import { fetchFutureWeatherRequest } from 'app/store/actions/futureWeather'
import { hideSearch } from 'app/store/actions/search'
import React, { useEffect, useRef, useState } from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'

import cities from '../../../data/cities.json'
import styles from './SearchView.styles'

export type CitiesT = {
  country: string
  lat: string
  lng: string
  city: string
}

const SearchView: React.FC = () => {
  const [value, setValue] = useState<string>('')
  const [results, setResults] = useState<CitiesT[]>([])

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
    const position: IGeolocationData = {
      latitude: parseInt(city.lat, 10),
      longitude: parseInt(city.lng, 10),
    }

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

  return (
    <View style={styles.container}>
      {renderSearchArea()}
      {renderResults()}
    </View>
  )
}

export default SearchView
