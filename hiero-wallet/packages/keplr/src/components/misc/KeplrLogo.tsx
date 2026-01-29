import { useGlobalStyles } from '@hiero-wallet/shared'
import React from 'react'
import { View } from 'react-native'

import SvgLogo from '../../../assets/logo.svg'

export const KeplrLogo = () => {
  const globalStyles = useGlobalStyles()

  return (
    <View style={globalStyles.logoContainer}>
      <SvgLogo width={'100%'} />
    </View>
  )
}
