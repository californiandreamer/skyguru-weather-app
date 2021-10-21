import { littleGap, smallGap } from 'app/constants/values'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    paddingVertical: smallGap,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationIcon: {
    paddingRight: littleGap,
  },
})
