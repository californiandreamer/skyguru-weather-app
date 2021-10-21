import { IAlertProps } from 'app/models'

import { alertTypes } from '../actionTypes/alert'

export interface AlertPropsState {
  props: IAlertProps
  isAlertShown: boolean
}

export interface ShowAlert {
  type: typeof alertTypes.SHOW_ALERT
  payload: IAlertProps
}

export type HideAlert = {
  type: typeof alertTypes.HIDE_ALERT
}

export type AlertActions = ShowAlert | HideAlert
