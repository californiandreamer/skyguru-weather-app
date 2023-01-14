import { RootScreen } from 'app/screens'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'

import configureStore from './store'

const Root = () => {
  const store = configureStore()

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootScreen />
      </GestureHandlerRootView>
    </Provider>
  )
}

export default Root
