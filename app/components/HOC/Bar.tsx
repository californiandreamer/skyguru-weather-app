import { violet } from 'app/constants/colors'
import React from 'react'
import { SafeAreaView, TouchableOpacity, ViewStyle } from 'react-native'

export type BarProps = {
  children: React.ReactNode
  position: 'top' | 'bottom'
}

const StyledText: React.FC<BarProps> = ({ children, position }) => {
  const getPosition = () => {
    if (position === 'top') {
      const topPosition: ViewStyle = { top: 0 }
      return { ...topPosition }
    } else if (position === 'bottom') {
      const bottomPosition: ViewStyle = { bottom: 0 }
      return { ...bottomPosition }
    }
  }

  const barStyles: ViewStyle = {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: violet,
  }

  return (
    <SafeAreaView style={[barStyles, getPosition()]}>
      <TouchableOpacity activeOpacity={1}>{children}</TouchableOpacity>
    </SafeAreaView>
  )
}

export default StyledText
