import { PinIcon } from 'app/assets'
import StyledText from 'app/components/HOC/Text'
import {
  defaultIconSize,
  pressOpacity,
  smallFontSize,
} from 'app/constants/values'
import { showSearch } from 'app/store/actions/search'
import { RootState } from 'app/store/reducers/rootReducer'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import styles from './UserLocationView.styles'

type UserLocationViewType = {
  isDisabled?: boolean
}

const UserLocationView = ({ isDisabled = false }: UserLocationViewType) => {
  const dispatch = useDispatch()

  const { pending, currentWeather, error } = useSelector(
    (state: RootState) => state.currentWeather
  )

  const city = currentWeather?.name

  return (
    <TouchableOpacity
      disabled={isDisabled}
      style={styles.container}
      activeOpacity={pressOpacity}
      onPress={() => dispatch(showSearch())}
    >
      {!pending && !error && city ? (
        <>
          <View style={styles.locationIcon}>
            <PinIcon width={defaultIconSize} height={defaultIconSize} />
          </View>
          <StyledText fontSize={smallFontSize}>{city}</StyledText>
        </>
      ) : null}
    </TouchableOpacity>
  )
}

export default UserLocationView
