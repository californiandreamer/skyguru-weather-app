import { RootScreen } from 'app/screens'
import React from 'react'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'

import configureStore from './store'

const Root = () => {
  const store = configureStore()

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={styles.gestureHandlerView}>
        <RootScreen />
      </GestureHandlerRootView>
    </Provider>
  )
}

const styles = StyleSheet.create({
  gestureHandlerView: {
    flex: 1,
  },
})

export default Root
