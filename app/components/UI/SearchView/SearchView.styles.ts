import { transparent, white } from 'app/constants/colors'
import {
  gap,
  largeGap,
  littleGap,
  smallFontSize,
  smallGap,
} from 'app/constants/values'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    padding: largeGap,
  },
  searchArea: {
    paddingTop: littleGap,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  locationIcon: {
    paddingRight: smallGap,
  },
  input: {
    height: 32,
    paddingTop: 2,
    flex: 1,
    backgroundColor: transparent,
    fontSize: smallFontSize,
    fontFamily: 'Gilroy-Regular',
    color: white,
  },
  spinner: {
    paddingBottom: largeGap,
  },
  resultsArea: {
    paddingTop: gap,
    paddingLeft: gap + smallGap,
  },
  resultsItem: {
    paddingVertical: smallGap,
  },
})
