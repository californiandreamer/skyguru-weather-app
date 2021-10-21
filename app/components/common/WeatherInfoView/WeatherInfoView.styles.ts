import { gap, largeGap, littleGap } from 'app/constants/values'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    paddingHorizontal: littleGap,
    paddingVertical: largeGap,
  },
  userLocationArea: {},
  infoWrapper: {
    paddingVertical: gap,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherGridArea: {
    flex: 1,
  },
  weatherInfoArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  weatherInfoColumn: {
    paddingHorizontal: littleGap,
  },
  weatherInfoGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherInfoItem: {
    width: 100,
    padding: 10,
  },
  spinner: {},
})
