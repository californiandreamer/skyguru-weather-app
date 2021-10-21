import { alertTypes } from '../actionTypes/alert'
import { AlertActions, AlertPropsState } from '../types/alert'

const initialState: AlertPropsState = {
  props: { illustration: null, text: '', action: () => null },
  isAlertShown: false,
}

export default (
  state = initialState,
  action: AlertActions
): AlertPropsState => {
  switch (action.type) {
    case alertTypes.SHOW_ALERT:
      return {
        ...state,
        props: action.payload,
        isAlertShown: true,
      }
    case alertTypes.HIDE_ALERT:
      return {
        ...state,
        isAlertShown: false,
      }
    default:
      return {
        ...state,
      }
  }
}
