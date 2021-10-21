import { searchTypes } from '../actionTypes/search'
import { ShowSearch, HideSearch } from '../types/search'

export const showSearch = (): ShowSearch => ({
  type: searchTypes.SHOW_SEARCH,
})

export const hideSearch = (): HideSearch => ({
  type: searchTypes.HIDE_SEARCH,
})
