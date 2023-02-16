import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  userLocationContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  weatherGridContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  weatherSheetContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 30,
  },
  sun: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: -20,
    right: -20,
  },
  eclipse: {
    width: '100%',
    position: 'absolute',
    top: '20%',
    right: 0,
    resizeMode: 'contain',
  },
  mountain: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 0,
  },
  mountainImage: {
    width: '100%',
    top: '15%',
  },
})
