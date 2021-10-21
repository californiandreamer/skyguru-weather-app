import createSagaMiddleware from '@redux-saga/core'
import { IGeolocationData } from 'app/models'
import { fetchCurrentWeatherRequest } from 'app/store/actions/currentWeather'
import createMockStore from 'redux-mock-store'

jest.setTimeout(15000)

describe('currentWeather saga', () => {
  const saga = createSagaMiddleware()
  const middlewares = [saga]
  const mockStore = createMockStore(middlewares)
  const position: IGeolocationData = {
    latitude: 34.052235,
    longitude: -118.243683,
  }

  const expectedRequest = [
    {
      type: 'FETCH_CURRENT_WEATHER_REQUEST',
      payload: {
        position,
      },
    },
  ]

  it('makes right the API request', () => {
    const mock = mockStore({})

    mock.dispatch(fetchCurrentWeatherRequest({ position }))
    mock.getActions()

    expect(mock.getActions()).toEqual(expectedRequest)
  })
})
