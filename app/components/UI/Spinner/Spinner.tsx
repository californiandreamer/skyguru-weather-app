import { SunnyIcon } from 'app/assets/icons'
import { weatherIconSize } from 'app/constants/values'
import React, { useEffect, useRef } from 'react'
import { Animated as RNAnimated, Easing, View } from 'react-native'

import styles from './Spinner.styles'

const Spinner: React.FC = () => {
  const spinAnimation = useRef(new RNAnimated.Value(0)).current

  const interpolatedSpin = spinAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '9999deg'],
  })

  const startSpin = () => {
    RNAnimated.timing(spinAnimation, {
      toValue: 1,
      duration: 60000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start()
  }

  useEffect(() => {
    startSpin()
  }, [])

  return (
    <View style={styles.container}>
      <RNAnimated.View style={{ transform: [{ rotateZ: interpolatedSpin }] }}>
        <SunnyIcon width={weatherIconSize} height={weatherIconSize} />
      </RNAnimated.View>
    </View>
  )
}

export default Spinner
