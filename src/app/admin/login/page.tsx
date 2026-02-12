"use client"

import { useState } from "react"
import PasswordForm from "./PasswordForm"
import OtpForm from "./OtpForm"

export default function AdminLoginPage() {
  const [mobile, setMobile] = useState("")
  const [mode, setMode] = useState<"password" | "otp" | null>(null)

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#020617] via-[#0c4a6e] to-[#0369a1]">

      {/* Glow Background */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] top-[-150px] right-[-150px]" />
      <div className="absolute w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] bottom-[-120px] left-[-120px]" />

      <div className="relative w-full max-w-md p-10 rounded-3xl glass ocean-glow">

        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
          Admin Access
        </h1>

        {!mode && (
          <>
            <input
              type="tel"
              placeholder="Enter Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full p-4 rounded-xl input-dark mb-6 text-white placeholder-gray-400"
            />

            <div className="space-y-4">
              <button
                onClick={() => setMode("password")}
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition font-semibold shadow-lg shadow-cyan-500/30"
              >
                Login with Password
              </button>

              <button
                onClick={() => setMode("otp")}
                className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 transition font-semibold shadow-lg shadow-blue-500/30"
              >
                Login with OTP
              </button>
            </div>
          </>
        )}

        {mode === "password" && (
          <PasswordForm mobile={mobile} goBack={() => setMode(null)} />
        )}

        {mode === "otp" && (
          <OtpForm mobile={mobile} goBack={() => setMode(null)} />
        )}
      </div>
    </div>
  )
}
