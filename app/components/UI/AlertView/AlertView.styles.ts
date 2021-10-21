import { transparentGray } from 'app/constants/colors'
import { gap, largeGap } from 'app/constants/values'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    padding: largeGap,
  },
  connectionIcon: {
    padding: gap,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textArea: {
    paddingVertical: gap,
  },
  button: {
    padding: gap,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: transparentGray,
  },
})
