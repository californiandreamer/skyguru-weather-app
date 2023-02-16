import React from 'react'
import { View } from 'react-native'
import LottieView from 'lottie-react-native'
import { useDispatch } from 'react-redux'
import { hideSplash } from 'app/store/actions/splash'
import { styles } from './SplashScreen.styles'

const SplashScreen = () => {
  const dispatch = useDispatch()

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/animations/weather.json')}
        autoPlay
        loop={false}
        speed={1.5}
        onAnimationFinish={() => dispatch(hideSplash())}
      />
    </View>
  )
}

export default SplashScreen
