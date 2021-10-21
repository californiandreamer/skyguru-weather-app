import createSagaMiddleware from '@redux-saga/core'
import { render } from '@testing-library/react-native'
import { daysQuantity } from 'app/constants/values'
import { dayOfWeekHandler } from 'app/utils/dayOfWeekHandler'
import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import createMockStore from 'redux-mock-store'

import WeatherSheet from '../WeatherSheet'

jest.useRealTimers()

describe('WeatherSheet component', () => {
  const dayTimestamp = 86400
  const timestamp = Date.now() / 1000
  const initialState = {
    futureWeather: {
      futureWeather: {
        daily: [
          {
            dt: timestamp,
            temp: { day: 15 },
            weather: [{ description: 'clear sky' }],
          },
          {
            dt: timestamp + dayTimestamp,
            temp: { day: 15 },
            weather: [{ description: 'clear sky' }],
          },
          {
            dt: timestamp + dayTimestamp * 2,
            temp: { day: 15 },
            weather: [{ description: 'clear sky' }],
          },
          {
            dt: timestamp + dayTimestamp * 3,
            temp: { day: 15 },
            weather: [{ description: 'clear sky' }],
          },
          {
            dt: timestamp + dayTimestamp * 4,
            temp: { day: 15 },
            weather: [{ description: 'clear sky' }],
          },
          {
            dt: timestamp + dayTimestamp * 5,
            temp: { day: 15 },
            weather: [{ description: 'clear sky' }],
          },
          {
            dt: timestamp + dayTimestamp * 6,
            temp: { day: 15 },
            weather: [{ description: 'clear sky' }],
          },
          {
            dt: timestamp + dayTimestamp * 7,
            temp: { day: 15 },
            weather: [{ description: 'clear sky' }],
          },
        ],
      },
    },
  }
  const saga = createSagaMiddleware()
  const middlewares = [saga]
  const mockStore = createMockStore(middlewares)

  const mock = mockStore(initialState)

  const component = (
    <Provider store={mock}>
      <WeatherSheet />
    </Provider>
  )

  it('returns correct quantity of days', () => {
    const tree = render(component)
    const { getAllByLabelText } = tree

    const result = getAllByLabelText('daily item')

    expect(result.length).toBe(daysQuantity)
  })

  it('returns correct day', () => {
    const tree = render(component)
    const { getByText } = tree

    const result = getByText(dayOfWeekHandler(timestamp))

    expect(result.props.children).toBe(dayOfWeekHandler(timestamp))
  })

  it('renders correctly', () => {
    const tree = renderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
