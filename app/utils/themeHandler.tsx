import {
  DayEclipseImage,
  DayMountainBottomImage,
  DayMountainMiddleImage,
  DayMountainTopImage,
  EveningEclipseImage,
  EveningMountainBottomImage,
  EveningMountainMiddleImage,
  EveningMountainTopImage,
  MoonImage,
  NightEclipseImage,
  NightMountainBottomImage,
  NightMountainMiddleImage,
  NightMountainTopImage,
  SunImage,
} from 'app/assets'
import { darkOrange, darkViolet, skyBlue } from 'app/constants/colors'
import { DayPartT } from 'app/store/types/theme'
import React from 'react'
import { SvgProps } from 'react-native-svg'

export type ObjectTypeT = 'mountains' | 'sky' | 'sun' | 'eclipse'
export type SunTypeT = 'sun' | 'moon'

export type ThemeHandlerT = React.FC<SvgProps> | null

export const themeHandler = (value: DayPartT | SunTypeT, type: ObjectTypeT) => {
  const dayMountains = [
    DayMountainTopImage,
    DayMountainMiddleImage,
    DayMountainBottomImage,
  ]

  const nightMountains = [
    NightMountainTopImage,
    NightMountainMiddleImage,
    NightMountainBottomImage,
  ]

  const eveningMountains = [
    EveningMountainTopImage,
    EveningMountainMiddleImage,
    EveningMountainBottomImage,
  ]

  const dayEclipse = DayEclipseImage
  const nightEclipse = NightEclipseImage
  const eveningEclipse = EveningEclipseImage

  const sun = SunImage
  const moon = MoonImage

  if (type === 'mountains') {
    switch (value) {
      case 'night':
        return nightMountains
      case 'morning':
        return eveningMountains
      case 'day':
        return dayMountains
      case 'evening':
        return eveningMountains
      default:
        return dayMountains
    }
  } else if (type === 'sun') {
    switch (value) {
      case 'day':
        return sun
      case 'night':
        return moon
      default:
        return sun
    }
  } else if (type === 'eclipse') {
    switch (value) {
      case 'night':
        return nightEclipse
      case 'morning':
        return eveningEclipse
      case 'day':
        return dayEclipse
      case 'evening':
        return eveningEclipse
      default:
        return dayEclipse
    }
  } else if (type === 'sky') {
    switch (value) {
      case 'night':
        return darkViolet
      case 'morning':
        return darkOrange
      case 'day':
        return skyBlue
      case 'evening':
        return darkOrange
      default:
        return skyBlue
    }
  }
}
