"use client"

import { useState } from "react"

export default function PasswordForm({
  mobile,
  goBack,
}: {
  mobile: string
  goBack: () => void
}) {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    await new Promise((res) => setTimeout(res, 1000))
    setLoading(false)
    alert("Login successful (demo)")
  }

  return (
    <>
      <p className="text-sm mb-3 text-cyan-200">Mobile: {mobile}</p>

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-4 rounded-xl input-dark mb-5 text-white placeholder-gray-400"
       />

      <button
        onClick={handleLogin}
        disabled={loading}
        className= "w-full bg-cyan-500 hover:bg-cyan-600 transition rounded-xl py-3 font-semibold shadow-lg shadow-cyan-500/30 mb-4"
 
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <button
        onClick={goBack}
        className="text-sm text-cyan-300 hover:underline"
      >
        ← Back
      </button>
    </>
  )
}
