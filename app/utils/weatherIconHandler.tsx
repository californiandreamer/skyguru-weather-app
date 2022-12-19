import {
  CloudyIcon,
  FoggyIcon,
  FrostIcon,
  NAIcon,
  RainyIcon,
  ShowerIcon,
  SnowyIcon,
  SunnyCloudyIcon,
  SunnyIcon,
  RainySnowyIcon,
  ThunderstormIcon,
} from 'app/assets'
import { weatherIconSize } from 'app/constants/values'
import React from 'react'

export type IconHandlerT = string | undefined

export const weatherIconHandler = (type: IconHandlerT) => {
  let Illustration = NAIcon

  if (type)
    switch (type) {
      case 'clear sky':
        Illustration = SunnyIcon
        break
      case 'few clouds':
        Illustration = SunnyCloudyIcon
        break
      case 'scattered clouds':
      case 'broken clouds':
      case 'overcast clouds':
        Illustration = CloudyIcon
        break
      case 'shower rain':
      case 'moderate rain':
        Illustration = ShowerIcon
        break
      case 'rain':
      case 'light rain':
        Illustration = RainyIcon
        break
      case 'thunderstorm':
        Illustration = ThunderstormIcon
        break
      case 'rain and snow':
        Illustration = RainySnowyIcon
        break
      case 'snow':
        Illustration = FrostIcon
        break
      case 'light snow':
        Illustration = SnowyIcon
        break
      case 'mist':
        Illustration = FoggyIcon
        break
      default:
        Illustration = NAIcon
    }
  return <Illustration width={weatherIconSize} height={weatherIconSize} />
}
