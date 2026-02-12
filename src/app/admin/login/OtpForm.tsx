"use client"

import { useState } from "react"

export default function OtpForm({
  mobile,
  goBack,
}: {
  mobile: string
  goBack: () => void
}) {
  const [otp, setOtp] = useState("")
  const [sent, setSent] = useState(false)

  const sendOtp = async () => {
    await new Promise((res) => setTimeout(res, 1000))
    setSent(true)
  }

  const verifyOtp = async () => {
    await new Promise((res) => setTimeout(res, 1000))
    alert("OTP verified (demo)")
  }

  return (
    <>
      <p className="text-sm mb-3 text-cyan-200">Mobile: {mobile}</p>

      {!sent ? (
        <button
          onClick={sendOtp}
          className="w-full bg-blue-700 hover:bg-blue-800 transition rounded-lg py-3 font-semibold mb-3"
        >
          Send OTP
        </button>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-3 rounded-lg bg-black/30 border border-cyan-400/30 focus:outline-none focus:border-cyan-400 mb-4"
          />

          <button
            onClick={verifyOtp}
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition rounded-lg py-3 font-semibold mb-3"
          >
            Verify OTP
          </button>
        </>
      )}

      <button
        onClick={goBack}
        className="text-sm text-cyan-300 hover:underline"
      >
        ← Back
      </button>
    </>
  )
}
