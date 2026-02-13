"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  loginWithPassword,
  sendOTP,
  verifyOTP,
} from "@/lib/api/auth"

export default function AdminLogin() {
  const router = useRouter()

  const [mode, setMode] = useState<"password" | "otp">("password")
  const [step, setStep] = useState<
    "login" | "otpVerify" | "resetOtp" | "newPassword"
  >("login")

  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""])
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const fullOTP = otp.join("")

  const handlePasswordLogin = async () => {
    setLoading(true)
    const success = await loginWithPassword(phone, password)

    if (success) router.push("/admin/dashboard")
    else setError("Invalid credentials")

    setLoading(false)
  }

  const handleSendOTP = async () => {
    setLoading(true)
    const success = await sendOTP(phone)

    if (success) {
      setStep("otpVerify")
    } else {
      setError("Invalid mobile number")
    }

    setLoading(false)
  }

  const handleVerifyOTP = async () => {
    setLoading(true)
    const success = await verifyOTP(fullOTP)

    if (success) {
      if (step === "resetOtp") setStep("newPassword")
      else router.push("/admin/dashboard")
    } else {
      setError("Invalid OTP")
    }

    setLoading(false)
  }

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    localStorage.setItem("freshcatch_admin_password", newPassword)
    setStep("login")
    setError("")
  }

  const handleOTPChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return

    const updated = [...otp]
    updated[index] = value
    setOtp(updated)

    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`)
      next?.focus()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 to-slate-900 text-white p-4">

      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-lg border border-slate-800 rounded-2xl p-8 space-y-6 shadow-2xl">

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">
            FreshCatch Admin
          </h1>
          <p className="text-slate-400 text-sm">
            Secure access to your dashboard
          </p>
        </div>

        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}

        {step === "login" && (
          <>
            <input
              type="text"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary"
            />

            <div className="flex justify-center gap-6 text-sm">
              <button
                onClick={() => setMode("password")}
                className={mode === "password" ? "text-primary" : "text-slate-400"}
              >
                Password
              </button>
              <button
                onClick={() => setMode("otp")}
                className={mode === "otp" ? "text-primary" : "text-slate-400"}
              >
                OTP
              </button>
            </div>

            {mode === "password" && (
              <>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
                />

                <button
                  onClick={handlePasswordLogin}
                  className="w-full bg-primary py-3 rounded-xl font-semibold hover:scale-105 transition"
                >
                  Login
                </button>
              </>
            )}

            {mode === "otp" && (
              <button
                onClick={handleSendOTP}
                className="w-full bg-primary py-3 rounded-xl font-semibold"
              >
                Send OTP
              </button>
            )}

            <button
              onClick={() => {
                setStep("resetOtp")
                sendOTP(phone)
              }}
              className="text-xs text-slate-400 hover:text-white text-center w-full"
            >
              Forgot Password?
            </button>
          </>
        )}

        {(step === "otpVerify" || step === "resetOtp") && (
          <>
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  value={digit}
                  onChange={(e) => handleOTPChange(e.target.value, index)}
                  maxLength={1}
                  className="w-12 h-12 text-center text-xl bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary"
                />
              ))}
            </div>

            <button
              onClick={handleVerifyOTP}
              className="w-full bg-primary py-3 rounded-xl font-semibold"
            >
              Verify OTP
            </button>
          </>
        )}

        {step === "newPassword" && (
          <>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
            />

            <button
              onClick={handleResetPassword}
              className="w-full bg-primary py-3 rounded-xl font-semibold"
            >
              Update Password
            </button>
          </>
        )}

      </div>
    </div>
  )
}
