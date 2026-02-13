"use client"

import { useEffect, useState } from "react"
import Icon from "@/components/ui/AppIcon"

interface OrderItem {
  id: string
  name: string
  pricePerKg: number
  quantity: number
}

interface Order {
  id: string
  customerName: string
  phone: string
  items: OrderItem[]
  total: number
  status: "pending" | "confirmed" | "delivered" | "cancelled"
  createdAt: string
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filter, setFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  // 🔥 Load Orders
  useEffect(() => {
    const saved = localStorage.getItem("freshcatch_orders")
    const parsed = saved ? JSON.parse(saved) : []
    setOrders(parsed)
  }, [])

  // 🔥 Save Orders
  const saveOrders = (updated: Order[]) => {
    setOrders(updated)
    localStorage.setItem("freshcatch_orders", JSON.stringify(updated))
  }

  // 🔥 Update Status
  const updateStatus = (id: string, newStatus: Order["status"]) => {
    const updated = orders.map((o) =>
      o.id === id ? { ...o, status: newStatus } : o
    )
    saveOrders(updated)
  }

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((o) => o.status === filter)

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)

  return (
    <div className="p-4 md:p-6 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Orders</h1>
        <p className="text-slate-400 text-sm">
          Manage customer orders
        </p>
      </div>

      {/* Revenue Summary */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <p className="text-slate-400 text-sm">Total Revenue</p>
        <h2 className="text-2xl font-bold text-green-400">
          ₹{totalRevenue.toFixed(2)}
        </h2>
      </div>

      {/* Filter */}
      <div className="flex gap-3 flex-wrap">
        {["all", "pending", "confirmed", "delivered", "cancelled"].map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                filter === status
                  ? "bg-primary text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {status}
            </button>
          )
        )}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-4"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-white">
                  #{order.id}
                </h3>
                <p className="text-sm text-slate-400">
                  {order.customerName} • {order.phone}
                </p>
                <p className="text-xs text-slate-500">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold text-green-400">
                  ₹{order.total.toFixed(2)}
                </p>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    order.status === "pending"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : order.status === "confirmed"
                      ? "bg-blue-500/20 text-blue-400"
                      : order.status === "delivered"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-4 flex-wrap">
              <button
                onClick={() => setSelectedOrder(order)}
                className="text-sm text-slate-300 hover:text-white"
              >
                View Details
              </button>

              <select
                value={order.status}
                onChange={(e) =>
                  updateStatus(
                    order.id,
                    e.target.value as Order["status"]
                  )
                }
                className="bg-slate-800 text-white text-sm rounded px-2 py-1"
              >
                <option value="pending">pending</option>
                <option value="confirmed">confirmed</option>
                <option value="delivered">delivered</option>
                <option value="cancelled">cancelled</option>
              </select>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-10 text-slate-400">
            No orders found.
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-white">
                Order #{selectedOrder.id}
              </h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-white"
              >
                <Icon name="XMarkIcon" size={20} />
              </button>
            </div>

            <div className="space-y-3">
              {selectedOrder.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm"
                >
                  <span>
                    {item.name} ({item.quantity} kg)
                  </span>
                  <span>
                    ₹{(item.quantity * item.pricePerKg).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 mt-4 pt-4 flex justify-between font-bold">
              <span>Total</span>
              <span>₹{selectedOrder.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
