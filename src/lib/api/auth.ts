import { apiClient } from "./client"

export const loginWithPassword = (phone: string, password: string) =>
  apiClient<{ token: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ phone, password }),
  })

export const loginWithOtp = (phone: string, otp: string) =>
  apiClient<{ token: string }>("/auth/otp", {
    method: "POST",
    body: JSON.stringify({ phone, otp }),
  })