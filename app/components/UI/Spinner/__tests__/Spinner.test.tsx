import React from 'react'
import renderer from 'react-test-renderer'

import Spinner from '../Spinner'

describe('Spinner component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Spinner />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
