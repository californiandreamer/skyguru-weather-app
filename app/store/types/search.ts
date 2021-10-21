import { searchTypes } from '../actionTypes/search'

export interface SearchState {
  isSearchShown: boolean
}

export interface ShowSearch {
  type: typeof searchTypes.SHOW_SEARCH
}

export type HideSearch = {
  type: typeof searchTypes.HIDE_SEARCH
}

export type SearchActions = ShowSearch | HideSearch
