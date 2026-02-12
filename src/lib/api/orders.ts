import { apiClient } from "./client"
import { Order } from "@/types/order"

export const getOrders = () =>
  apiClient<Order[]>("/orders")

export const updateOrderStatus = (id: string, status: string) =>
  apiClient<Order>(`/orders/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  })