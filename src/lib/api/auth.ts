// src/lib/api/auth.ts

import bcrypt from "bcryptjs"

/* =========================================================
   CONFIG
========================================================= */

const DEFAULT_OWNER_PHONE = "918509597935" // India format with country code
const DEFAULT_ADMIN_PASSWORD = "Admin@123"
const SESSION_KEY = "freshcatch_admin_session"
const OWNER_PHONE_KEY = "freshcatch_owner_phone"
const PASSWORD_HASH_KEY = "freshcatch_admin_hash"

const OTP_KEY = "freshcatch_admin_otp"
const OTP_EXPIRY_KEY = "freshcatch_admin_otp_expiry"

const ATTEMPT_KEY = "freshcatch_admin_attempts"
const LOCK_KEY = "freshcatch_admin_lock_until"

const SESSION_DURATION = 1000 * 60 * 60 * 2 // 2 hours
const OTP_DURATION = 1000 * 60 * 5 // 5 minutes
const MAX_ATTEMPTS = 5
const LOCK_TIME = 1000 * 60 * 10 // 10 minutes

/* =========================================================
   TYPES
========================================================= */

interface SessionData {
  token: string
  expiresAt: number
}

/* =========================================================
   SESSION MANAGEMENT
========================================================= */

export function createSession() {
  const session: SessionData = {
    token: crypto.randomUUID(),
    expiresAt: Date.now() + SESSION_DURATION,
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function isAuthenticated(): boolean {
  const raw = localStorage.getItem(SESSION_KEY)
  if (!raw) return false

  try {
    const session: SessionData = JSON.parse(raw)

    if (Date.now() > session.expiresAt) {
      logout()
      return false
    }

    return true
  } catch {
    logout()
    return false
  }
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
}

/* =========================================================
   OWNER CONFIG
========================================================= */

export function setOwnerPhone(phone: string) {
  localStorage.setItem(OWNER_PHONE_KEY, phone)
}

export function getOwnerPhone() {
  return localStorage.getItem(OWNER_PHONE_KEY)|| DEFAULT_OWNER_PHONE
}

/* =========================================================
   PASSWORD MANAGEMENT
========================================================= */

export async function setPassword(newPassword: string) {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(newPassword, salt)
  localStorage.setItem(PASSWORD_HASH_KEY, hash)
}

export async function loginWithPassword(
  phone: string,
  password: string
): Promise<boolean> {
  if (isLocked()) return false

  const savedPhone = getOwnerPhone()
  const savedHash = localStorage.getItem(PASSWORD_HASH_KEY)

  if (!savedPhone || !savedHash) return false
  if (phone !== savedPhone) return registerFailure()

  const match = await bcrypt.compare(password, savedHash)

  if (!match) return registerFailure()

  clearFailures()
  createSession()
  return true
}

/* =========================================================
   OTP MANAGEMENT
========================================================= */

export async function sendOTP(phone: string): Promise<boolean> {
  if (isLocked()) return false

  const ownerPhone = getOwnerPhone()
  if (!ownerPhone || phone !== ownerPhone) {
    registerFailure()
    return false
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString()

  localStorage.setItem(OTP_KEY, otp)
  localStorage.setItem(
    OTP_EXPIRY_KEY,
    (Date.now() + OTP_DURATION).toString()
  )

  // ⚠ DEV MODE ONLY
  console.log("DEV OTP:", otp)

  return true
}

export async function verifyOTP(entered: string): Promise<boolean> {
  if (isLocked()) return false

  const saved = localStorage.getItem(OTP_KEY)
  const expiry = Number(localStorage.getItem(OTP_EXPIRY_KEY))

  if (!saved || !expiry || Date.now() > expiry) {
    registerFailure()
    return false
  }

  if (entered !== saved) {
    registerFailure()
    return false
  }

  clearFailures()
  createSession()

  localStorage.removeItem(OTP_KEY)
  localStorage.removeItem(OTP_EXPIRY_KEY)

  return true
}

/* =========================================================
   BRUTE FORCE PROTECTION
========================================================= */

function registerFailure(): false {
  let attempts = Number(localStorage.getItem(ATTEMPT_KEY) || 0)
  attempts++

  localStorage.setItem(ATTEMPT_KEY, attempts.toString())

  if (attempts >= MAX_ATTEMPTS) {
    localStorage.setItem(
      LOCK_KEY,
      (Date.now() + LOCK_TIME).toString()
    )
  }

  return false
}

function clearFailures() {
  localStorage.removeItem(ATTEMPT_KEY)
  localStorage.removeItem(LOCK_KEY)
}

function isLocked(): boolean {
  const lockUntil = Number(localStorage.getItem(LOCK_KEY))

  if (!lockUntil) return false

  if (Date.now() > lockUntil) {
    clearFailures()
    return false
  }

  return true
}
