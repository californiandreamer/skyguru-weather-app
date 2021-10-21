import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers/rootReducer'
import rootSaga from './sagas/rootSaga'

const saga = createSagaMiddleware()

const middleWares = [saga]

const configureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(...middleWares))
  saga.run(rootSaga)
  return store
}

export default configureStore
