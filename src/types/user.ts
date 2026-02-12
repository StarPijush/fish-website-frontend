export interface AdminUser {
  id: string
  name: string
  phone: string
  role: "owner"
  token?: string
}
