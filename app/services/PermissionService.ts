import { isAndroid } from 'app/constants/platform'
import { PermissionsAndroid } from 'react-native'
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions'

export const PermissionService = async (): Promise<boolean> => {
  if (isAndroid) {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ])

    return (
      granted['android.permission.ACCESS_FINE_LOCATION'] === 'granted' &&
      granted['android.permission.ACCESS_COARSE_LOCATION'] === 'granted'
    )
  } else {
    const getIosPermission = async () => {
      const permission = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        .then((result) => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              return 'This feature is not available (on this device / in this context)'
            case RESULTS.DENIED:
              return 'The permission has not been requested / is denied but requestable'
            case RESULTS.LIMITED:
              return 'The permission is limited: some actions are possible'
            case RESULTS.BLOCKED:
              return 'The permission is blocked'
            case RESULTS.GRANTED:
              return result
          }
        })
        .catch((error) => error)

      return permission
    }

    const isGranted = await getIosPermission()

    return isGranted === 'granted'
  }
}
