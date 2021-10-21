import { white } from 'app/constants/colors'
import { defaultFontSize, defaultLineHeight } from 'app/constants/values'
import React from 'react'
import { Text, TextProps as RNTextProps, TextStyle } from 'react-native'

export type TextProps = RNTextProps & {
  children: React.ReactNode
  fontSize?: number
  lineHeight?: number
  textAlign?: 'left' | 'right' | 'center' | 'auto' | 'justify'
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
}

const StyledText: React.FC<TextProps> = ({
  children,
  fontSize = defaultFontSize,
  textAlign,
  lineHeight = defaultLineHeight,
  textTransform,
}) => {
  const textStyle: TextStyle = {
    fontSize: fontSize,
    textAlign: textAlign,
    lineHeight: lineHeight,
    textTransform: textTransform,
    fontFamily: 'Gilroy-Regular',
    color: white,
  }

  return <Text style={textStyle}>{children}</Text>
}

export default StyledText
