import { IAlertProps } from 'app/models'

import { alertTypes } from '../actionTypes/alert'
import { HideAlert, ShowAlert } from '../types/alert'

export const showAlert = (payload: IAlertProps): ShowAlert => ({
  type: alertTypes.SHOW_ALERT,
  payload,
})

export const hideAlert = (): HideAlert => ({
  type: alertTypes.HIDE_ALERT,
})
