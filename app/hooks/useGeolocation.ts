import Geolocation from '@react-native-community/geolocation'
import { IGeolocationData } from 'app/models'
import { useState, useEffect } from 'react'

import cities from '../data/cities.json'

type GeolocationErrorT = string | null

export const useGeolocation = (): [IGeolocationData, GeolocationErrorT] => {
  const [error, setError] = useState<GeolocationErrorT>(null)
  const [position, setPosition] = useState<IGeolocationData>({
    latitude: parseInt(cities[0].lat, 10),
    longitude: parseInt(cities[0].lng, 10),
  })

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (currentPosition) => {
        setError(null)
        setPosition({
          latitude: currentPosition.coords.latitude,
          longitude: currentPosition.coords.longitude,
        })
      },
      (err) => setError(err.message)
    )
  }, [])

  return [position, error]
}
