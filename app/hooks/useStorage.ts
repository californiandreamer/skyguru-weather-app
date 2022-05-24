import { MMKV } from 'react-native-mmkv'

type DataType = string | number | boolean

export type StorageType = {
  userName: string
  userType: 'admin' | 'user'
  userId: number
}

export type SetStorageItemType = {
  key: string
  value: string | number | boolean
}

export type GetStorageItemType = {
  key: string
  type: DataType
}

export const useStorage = () => {
  const storage = new MMKV()

  const setItemToStorage = ({ key, value }: SetStorageItemType): void => {
    storage.set(key, value)
  }

  const getItemFromStorage = ({
    key,
    type,
  }: GetStorageItemType): DataType | undefined => {
    switch (type) {
      case 'string':
        return storage.getString(key)
      case 'number':
        return storage.getNumber(key)
      case 'boolean':
        return storage.getBoolean(key)
      default:
        return undefined
    }
  }

  const removeItemFromStorage = (key: string): void => {
    const keyExists = checkStorageKey(key)
    keyExists && storage.delete(key)
  }

  const checkStorageKey = (key: string): boolean => {
    const hasKey = storage.contains(key)
    return hasKey
  }

  const getStorageKeys = (): string[] => {
    const keys = storage.getAllKeys()
    return keys
  }

  const clearStorage = (): void => {
    storage.clearAll()
  }

  return {
    setItemToStorage,
    getItemFromStorage,
    removeItemFromStorage,
    checkStorageKey,
    getStorageKeys,
    clearStorage,
  }
}
