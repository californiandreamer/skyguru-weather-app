import { themeTypes } from '../actionTypes/theme'
import { SetTheme, ThemeState } from '../types/theme'

export const setTheme = (payload: ThemeState): SetTheme => ({
  type: themeTypes.SET_THEME,
  payload,
})
