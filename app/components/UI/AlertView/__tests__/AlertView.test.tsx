import configureStore from 'app/store'
import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'

import AlertView from '../AlertView'

describe('AlertView component', () => {
  it('renders correctly', () => {
    const store = configureStore()

    const tree = renderer
      .create(
        <Provider store={store}>
          <AlertView />
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
