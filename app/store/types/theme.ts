import { themeTypes } from '../actionTypes/theme'

export type DayPartT = 'night' | 'morning' | 'day' | 'evening'

export type SunPositionT = {
  top: number
  right: number
  width: number
  height: number
}

export interface ThemeState {
  theme: DayPartT
  position: SunPositionT
}

export interface SetTheme {
  type: typeof themeTypes.SET_THEME
  payload: ThemeState
}

export type ThemeActions = SetTheme
