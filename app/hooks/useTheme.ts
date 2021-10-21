import { setTheme } from 'app/store/actions/theme'
import { RootState } from 'app/store/reducers/rootReducer'
import { DayPartT, SunPositionT } from 'app/store/types/theme'
import { useDispatch, useSelector } from 'react-redux'

export type ThemeT = {
  currentTime?: number
  sunset?: number
  sunrise?: number
}

export const useTheme = (): readonly [
  { readonly theme: DayPartT; readonly position: SunPositionT },
  (data: ThemeT) => void
] => {
  const dispatch = useDispatch()

  const updateTheme = ({ currentTime, sunset, sunrise }: ThemeT) => {
    let partOfDay: DayPartT = 'day'
    let sunPosition: SunPositionT = {
      top: -20,
      right: -20,
      width: 200,
      height: 200,
    }

    if (currentTime && sunset && sunrise) {
      const night = currentTime < sunrise
      const morning = currentTime >= sunrise && currentTime <= sunrise + 7200
      const day = currentTime >= sunrise + 7200 && currentTime <= sunset - 7200
      const evening = currentTime > sunset + 7200

      if (night) {
        partOfDay = 'night'
        sunPosition = {
          top: 20,
          right: 20,
          width: 100,
          height: 100,
        }
      } else if (morning) {
        partOfDay = 'morning'
      } else if (day) {
        partOfDay = 'day'
      } else if (evening) {
        partOfDay = 'evening'
      } else {
        partOfDay = 'day'
      }
    }

    dispatch(setTheme({ theme: partOfDay, position: sunPosition }))
  }

  const { theme, position } = useSelector((state: RootState) => state.theme)

  return [{ theme, position }, updateTheme] as const
}
