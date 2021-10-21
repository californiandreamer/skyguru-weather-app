import { RootScreen } from 'app/screens'
import React from 'react'
import { Provider } from 'react-redux'

import configureStore from './store'

const Root = () => {
  const store = configureStore()

  return (
    <Provider store={store}>
      <RootScreen />
    </Provider>
  )
}

export default Root
