"use client"

import { useEffect, useState } from "react"
import { getSettings, updateSettings, Settings } from "@/lib/api/settings"

export default function AdminSettings() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    async function load() {
      const data = await getSettings()
      setSettings(data)
      setLoading(false)
    }
    load()
  }, [])

  const handleChange = (key: keyof Settings, value: any) => {
    if (!settings) return
    setSettings({ ...settings, [key]: value })
  }

  const handleSave = async () => {
    if (!settings) return
    setSaving(true)
    setSuccess(false)

    await updateSettings(settings)

    setSaving(false)
    setSuccess(true)

    setTimeout(() => setSuccess(false), 3000)
  }

  if (loading || !settings) {
    return <div className="p-6 text-white">Loading settings...</div>
  }

  return (
    <div className="p-4 md:p-6 space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-white">
          Business Settings
        </h1>
        <p className="text-slate-400 text-sm">
          Manage business information & login configuration
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">

        {/* Business Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="text-sm text-slate-400">Business Name</label>
            <input
              type="text"
              value={settings.businessName}
              onChange={(e) => handleChange("businessName", e.target.value)}
              className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="text-sm text-slate-400">Owner Name</label>
            <input
              type="text"
              value={settings.ownerName}
              onChange={(e) => handleChange("ownerName", e.target.value)}
              className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="text-sm text-slate-400">Owner Mobile Number</label>
            <input
              type="text"
              value={settings.ownerPhone}
              onChange={(e) => handleChange("ownerPhone", e.target.value)}
              className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="text-sm text-slate-400">WhatsApp Number</label>
            <input
              type="text"
              value={settings.whatsappNumber}
              onChange={(e) => handleChange("whatsappNumber", e.target.value)}
              className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="text-sm text-slate-400">Currency</label>
            <select
              value={settings.currency}
              onChange={(e) => handleChange("currency", e.target.value)}
              className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-slate-400">Business Address</label>
            <input
              type="text"
              value={settings.businessAddress}
              onChange={(e) => handleChange("businessAddress", e.target.value)}
              className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
            />
          </div>

        </div>

        {/* Login Options */}
        <div className="border-t border-slate-800 pt-6 space-y-4">

          <h2 className="text-lg font-semibold text-white">
            Login Options
          </h2>

          <div className="flex items-center justify-between">
            <span className="text-slate-300">Enable OTP Login</span>
            <input
              type="checkbox"
              checked={settings.enableOTPLogin}
              onChange={(e) => handleChange("enableOTPLogin", e.target.checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-300">Enable Password Login</span>
            <input
              type="checkbox"
              checked={settings.enablePasswordLogin}
              onChange={(e) => handleChange("enablePasswordLogin", e.target.checked)}
            />
          </div>

        </div>

        {/* Save Button */}
        <div className="pt-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-primary hover:bg-primary/90 px-6 py-2 rounded-lg text-white font-semibold transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          {success && (
            <p className="text-green-400 text-sm mt-2">
              Settings updated successfully.
            </p>
          )}
        </div>

      </div>

    </div>
  )
}
