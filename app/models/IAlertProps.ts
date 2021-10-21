import { SvgProps } from 'react-native-svg'

export interface IAlertProps {
  illustration?: React.FC<SvgProps> | null
  text: string
  action?: () => void
}
