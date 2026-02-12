export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "delivered"
  | "cancelled"

export interface OrderItem {
  productId: string
  name: string
  quantity: number
  pricePerKg: number
}

export interface Order {
  id: string
  customerName: string
  customerPhone: string
  items: OrderItem[]
  totalAmount: number
  status: OrderStatus
  paymentMethod: "whatsapp" | "upi" | "cash"
  createdAt: string
}
