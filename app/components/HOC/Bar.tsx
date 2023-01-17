import { violet, white } from 'app/constants/colors'
import { isAndroid, isIos } from 'app/constants/platform'
import { gap } from 'app/constants/values'
import React, { useState } from 'react'
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

export type BarProps = {
  children: React.ReactNode
  position: 'top' | 'bottom'
  onHide?: () => void
}

const StyledText: React.FC<BarProps> = ({ children, position, onHide }) => {
  const isOnBottom = position === 'bottom'

  const [isBarRevealed, setIsBarRevealed] = useState(false)
  const { height } = useWindowDimensions()

  const yOffset = useSharedValue(0)
  const panRowWidth = useSharedValue(100)

  const onReveal = () => {
    yOffset.value = withTiming(-275)

    setIsBarRevealed(true)
  }

  const onDefaultPosition = () => {
    setIsBarRevealed(false)
    yOffset.value = withSpring(0)
  }

  const onHideDown = () => {
    yOffset.value = withTiming(500)

    setIsBarRevealed(false)
    onHide && onHide()
  }

  const narrowPanRowDown = (event: any) => {
    if (event.translationY < 0) {
      panRowWidth.value = withTiming(50)
    } else {
      panRowWidth.value = withTiming(100)
    }
  }

  const onGesture = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startY = yOffset.value
    },
    onActive: (event, ctx) => {
      if (event.translationY > (-height + 50) / 2) {
        if (!isBarRevealed && event.translationY < -250) {
          yOffset.value = ctx.startY + event.translationY

          runOnJS(narrowPanRowDown)(event)
        }

        if (isBarRevealed && event.translationY > -50) {
          yOffset.value = ctx.startY + event.translationY

          runOnJS(narrowPanRowDown)(event)
        } else if (!isBarRevealed) {
          yOffset.value = ctx.startY + event.translationY
        }
      }
    },
    onEnd: (event) => {
      panRowWidth.value = withTiming(100)

      if (event.translationY > 150) {
        runOnJS(onHideDown)()
      } else if (isBarRevealed && event.translationY < 50) {
        runOnJS(onReveal)()
      } else if (event.translationY < -50) {
        runOnJS(onReveal)()
      } else {
        runOnJS(onDefaultPosition)()
      }
    },
  })

  const barAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: yOffset.value,
        },
      ],
    }
  })

  const panRowAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: panRowWidth.value,
    }
  })

  const getInitialPosition = () => {
    if (!isOnBottom) {
      const topPosition: ViewStyle = { top: 0 }
      return { ...topPosition }
    } else if (isOnBottom) {
      const bottomPosition: ViewStyle = {
        bottom: -height + 340,
        height: height,
      }
      return { ...bottomPosition }
    }
  }

  return (
    <PanGestureHandler
      enabled={isOnBottom}
      maxPointers={1}
      minDist={20}
      onGestureEvent={onGesture}
    >
      <Animated.View
        style={[styles.container, barAnimatedStyle, getInitialPosition()]}
      >
        <TouchableOpacity activeOpacity={1}>
          {isOnBottom ? (
            <View style={styles.panHandlerWrapper}>
              <Animated.View
                style={[styles.panHandlerLine, panRowAnimatedStyle]}
              />
            </View>
          ) : null}
          {children}
        </TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
  )
}

export default StyledText

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: violet,
  },
  panHandlerWrapper: {
    paddingTop: gap,
    alignItems: 'center',
  },
  panHandlerLine: {
    width: 100,
    height: 4,
    backgroundColor: white,
  },
})
