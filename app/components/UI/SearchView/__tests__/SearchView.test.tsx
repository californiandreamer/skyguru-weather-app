import { render, fireEvent, cleanup } from '@testing-library/react-native'
import configureStore from 'app/store'
import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'

import SearchView from '../SearchView'

jest.useRealTimers()

jest.mock('app/hooks/useGeolocation', () => ({
  useGeolocation: () => [{ latitude: '52.2167', longitude: '21.0333' }],
}))

describe('SearchView component', () => {
  const store = configureStore()
  const textToCheck = 'War'
  const textToEnter = 'Warsaw'
  const autocompleteResult = 'Warsaw, Poland'

  const component = (
    <Provider store={store}>
      <SearchView />
    </Provider>
  )

  afterEach(cleanup)

  it('returns right city', () => {
    const tree = render(component)
    const { getByPlaceholderText, getByText } = tree
    const input = getByPlaceholderText('Search city')
    expect(input).toBeTruthy()

    fireEvent.changeText(input, textToEnter)
    const result = getByText(autocompleteResult)
    expect(result).toBeTruthy()
  })

  it('returns correct quantity of results', () => {
    const tree = render(component)
    const { getByPlaceholderText, getAllByLabelText } = tree
    const input = getByPlaceholderText('Search city')
    expect(input).toBeTruthy()

    fireEvent.changeText(input, textToCheck)
    const result = getAllByLabelText('result item')

    expect(result.length).toBe(2)
  })

  it('does not show results if it is not enough letters', () => {
    const tree = render(component)
    const { getByPlaceholderText, getByTestId } = tree
    const input = getByPlaceholderText('Search city')
    expect(input).toBeTruthy()

    fireEvent.changeText(input, 'Wa')
    const result = getByTestId('results area')
    expect(result.props.children.length).toBe(0)
  })

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <SearchView />
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
