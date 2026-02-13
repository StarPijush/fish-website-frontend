"use client"

import { useEffect, useState } from "react"
import StatCard from "@/components/admin/StatCard"
import { formatCurrency } from "@/utils/format"

interface Order {
  id: string
  total: number
  createdAt: string
}

interface Product {
  id: string
  name: string
  stock: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    revenueToday: 0,
    lowStock: 0,
  })

  const [recentOrders, setRecentOrders] = useState<Order[]>([])

  useEffect(() => {
    const productsRaw = localStorage.getItem("freshcatch_products")
    const ordersRaw = localStorage.getItem("freshcatch_orders")

    const products: Product[] = productsRaw ? JSON.parse(productsRaw) : []
    const orders: Order[] = ordersRaw ? JSON.parse(ordersRaw) : []

    // Total Products
    const totalProducts = products.length

    // Total Orders
    const totalOrders = orders.length

    // Revenue Today
    const today = new Date().toDateString()

    const revenueToday = orders
      .filter((order) => new Date(order.createdAt).toDateString() === today)
      .reduce((sum, order) => sum + order.total, 0)

    // Low Stock (less than 5)
    const lowStock = products.filter((p) => p.stock <= 5).length

    setStats({
      totalProducts,
      totalOrders,
      revenueToday,
      lowStock,
    })

    // Set recent 3 orders (latest first)
    const sorted = [...orders].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )

    setRecentOrders(sorted.slice(0, 3))
  }, [])

  return (
    <div className="p-4 md:p-6 space-y-6">

      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Dashboard Overview
        </h1>
        <p className="text-slate-400 text-sm">
          Quick summary of your seafood business
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
        />
        <StatCard
          title="Today's Revenue"
          value={formatCurrency(stats.revenueToday)}
        />
        <StatCard
          title="Low Stock Items"
          value={stats.lowStock}
          danger
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
        <h2 className="text-lg font-semibold text-white mb-4">
          Recent Orders
        </h2>

        {recentOrders.length === 0 ? (
          <p className="text-slate-400 text-sm">
            No recent orders yet.
          </p>
        ) : (
          <div className="space-y-3 text-sm">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex justify-between text-slate-300"
              >
                <span>#{order.id.slice(-6)}</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Low Stock Alert */}
      {stats.lowStock > 0 && (
        <div className="bg-red-950/40 border border-red-800 rounded-xl p-4">
          <h2 className="text-lg font-semibold text-red-400">
            ⚠ Low Stock Alert
          </h2>
          <p className="text-sm text-red-300 mt-2">
            {stats.lowStock} products are running low. Update inventory soon.
          </p>
        </div>
      )}

    </div>
  )
}
