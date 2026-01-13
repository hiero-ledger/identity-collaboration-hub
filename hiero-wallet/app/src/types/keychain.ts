import { KeychainServices as BifoldKeychainServices } from '@hyperledger/aries-bifold-core/App/constants'

export enum WalletKeychainServices {
  OAuth = 'secret.hiero-wallet.oauth',
  Passkeys = 'secret.hiero-wallet.passkeys',
}

export type KeychainServices = WalletKeychainServices | BifoldKeychainServices

export const KeychainServicesList = [
  ...Object.values(WalletKeychainServices),
  ...Object.values(BifoldKeychainServices),
] as const
