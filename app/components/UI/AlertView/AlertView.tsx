import StyledText from 'app/components/HOC/Text'
import {
  largeIconSize,
  pressOpacity,
  smallFontSize,
} from 'app/constants/values'
import { RootState } from 'app/store/reducers/rootReducer'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'

import styles from './AlertView.styles'

const AlertView: React.FC = () => {
  const {
    illustration: Illustration,
    text,
    action,
  } = useSelector((state: RootState) => state.alert.props)

  const renderIcon = () => (
    <View style={styles.connectionIcon}>
      {Illustration ? (
        <Illustration width={largeIconSize} height={largeIconSize} />
      ) : null}
    </View>
  )

  const renderText = () => (
    <View style={styles.textArea}>
      <StyledText fontSize={smallFontSize}>{text}</StyledText>
    </View>
  )

  const renderButton = () => (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={pressOpacity}
      onPress={() => (action ? action() : null)}
    >
      <StyledText>Try again</StyledText>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      {renderIcon()}
      {renderText()}
      {action ? renderButton() : null}
    </View>
  )
}

export default AlertView
