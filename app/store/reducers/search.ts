import { searchTypes } from '../actionTypes/search'
import { SearchActions, SearchState } from '../types/search'

const initialState: SearchState = {
  isSearchShown: false,
}

export default (state = initialState, action: SearchActions): SearchState => {
  switch (action.type) {
    case searchTypes.SHOW_SEARCH:
      return {
        ...state,
        isSearchShown: true,
      }
    case searchTypes.HIDE_SEARCH:
      return {
        ...state,
        isSearchShown: false,
      }
    default:
      return {
        ...state,
      }
  }
}
