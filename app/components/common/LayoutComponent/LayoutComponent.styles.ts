import { transparentGray } from 'app/constants/colors'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
  pressableArea: {
    flex: 1,
    backgroundColor: transparentGray,
  },
})
