import { useHieroTheme, useGlobalStyles } from '@hiero-wallet/shared'
import React from 'react'
import { View } from 'react-native'
import { SvgProps } from 'react-native-svg'

export const HieroLogo: React.FC<SvgProps> = (svgProps) => {
  const { Assets } = useHieroTheme()
  const globalStyles = useGlobalStyles()

  const { logo: SvgLogo } = Assets.svg

  return (
    <View style={globalStyles.logoContainer}>
      <SvgLogo style={{ marginBottom: 20 }} width={150} height={50} {...svgProps} />
    </View>
  )
}
