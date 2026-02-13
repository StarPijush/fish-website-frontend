export interface Settings {
  businessName: string
  ownerName: string
  ownerPhone: string
  businessAddress: string
  currency: string
  whatsappNumber: string
  enableOTPLogin: boolean
  enablePasswordLogin: boolean
}

const STORAGE_KEY = "freshcatch_settings"

// 🔥 Simulated API GET
export async function getSettings(): Promise<Settings> {
  const saved = localStorage.getItem(STORAGE_KEY)

  if (saved) {
    return JSON.parse(saved)
  }

  // Default initial config
  const defaultSettings: Settings = {
    businessName: "FreshCatch",
    ownerName: "Owner",
    ownerPhone: "8509597935",
    businessAddress: "Ocean Street",
    currency: "INR",
    whatsappNumber: "8509597935",
    enableOTPLogin: true,
    enablePasswordLogin: true,
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSettings))
  return defaultSettings
}

// 🔥 Simulated API PUT
export async function updateSettings(data: Settings): Promise<void> {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}
