import { themeTypes } from '../actionTypes/theme'
import { ThemeActions, ThemeState } from '../types/theme'

const initialState: ThemeState = {
  theme: 'day',
  position: { top: 20, right: 20, width: 200, height: 200 },
}

export default (state = initialState, action: ThemeActions): ThemeState => {
  switch (action.type) {
    case themeTypes.SET_THEME:
      return {
        ...state,
        theme: action.payload.theme,
        position: action.payload.position,
      }
    default:
      return {
        ...state,
      }
  }
}
