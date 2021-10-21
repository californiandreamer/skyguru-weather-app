import configureStore from 'app/store'
import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'

import UserLocationView from '../UserLocationView'

describe('UserLocationView component', () => {
  it('renders correctly', () => {
    const store = configureStore()

    const tree = renderer
      .create(
        <Provider store={store}>
          <UserLocationView />
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
