import { white } from 'app/constants/colors'
import { smallGap } from 'app/constants/values'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherStatusRow: {
    paddingBottom: smallGap,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherIcon: {
    paddingRight: smallGap,
    justifyContent: 'center',
    alignItems: 'center',
  },
  temperatureRow: {
    paddingVertical: smallGap,
    borderBottomColor: white,
    borderBottomWidth: 1,
    borderTopColor: white,
    borderTopWidth: 1,
  },
  temperatureValuesRow: {
    paddingTop: smallGap,
  },
  spinnerView: {
    maxHeight: 100,
  },
})
