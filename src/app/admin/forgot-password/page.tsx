"use client"

import { useState } from "react"

export default function ForgotPasswordPage() {
  const [mobile, setMobile] = useState("")
  const [step, setStep] = useState<"mobile" | "otp" | "reset">("mobile")

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#0369a1] to-[#0ea5e9] p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-cyan-300/20 rounded-2xl p-8 shadow-2xl">

        <h1 className="text-xl font-bold text-cyan-300 mb-6 text-center">
          Reset Password
        </h1>

        {step === "mobile" && (
          <>
            <input
              type="tel"
              placeholder="Enter Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full p-3 rounded-lg bg-black/30 border border-cyan-400/30 mb-4"
            />
            <button
              onClick={() => setStep("otp")}
              className="w-full bg-cyan-500 hover:bg-cyan-600 rounded-lg py-3"
            >
              Send OTP
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-3 rounded-lg bg-black/30 border border-cyan-400/30 mb-4"
            />
            <button
              onClick={() => setStep("reset")}
              className="w-full bg-cyan-500 hover:bg-cyan-600 rounded-lg py-3"
            >
              Verify OTP
            </button>
          </>
        )}

        {step === "reset" && (
          <>
            <input
              type="password"
              placeholder="New Password"
              className="w-full p-3 rounded-lg bg-black/30 border border-cyan-400/30 mb-4"
            />
            <button
              className="w-full bg-green-600 hover:bg-green-700 rounded-lg py-3"
            >
              Update Password
            </button>
          </>
        )}
      </div>
    </div>
  )
}
