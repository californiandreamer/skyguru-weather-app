import configureStore from 'app/store'
import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'

import WeatherGrid, { WeatherT } from '../WeatherGrid'

describe('WeatherGrid component', () => {
  it('renders correctly', () => {
    const store = configureStore()

    const weatherGridProps: WeatherT = {
      temperature: 16,
      minTemperature: 14,
      maxTemperature: 20,
      weatherInfo: ['Clear'],
      weatherStatus: ['clear sky'],
    }

    const tree = renderer
      .create(
        <Provider store={store}>
          <WeatherGrid {...weatherGridProps} />
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
