type GtagConsentArg = 'default' | 'update'
type GtagStorageValue = 'granted' | 'denied'

interface GtagConsentParams {
  analytics_storage: GtagStorageValue
  ad_storage: GtagStorageValue
}

interface Window {
  gtag?: (
    command: 'consent',
    type: GtagConsentArg,
    params: GtagConsentParams
  ) => void
  dataLayer?: unknown[]
}

declare function gtag(
  command: 'consent',
  type: GtagConsentArg,
  params: GtagConsentParams
): void
