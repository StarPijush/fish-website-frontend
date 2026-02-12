"use client"

import { useEffect, useState } from "react"
import StatCard from "@/components/admin/StatCard"
import { formatCurrency } from "@/utils/format"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    revenueToday: 0,
    lowStock: 0,
  })

  useEffect(() => {
    // Dummy data for now
    setStats({
      totalProducts: 24,
      totalOrders: 12,
      revenueToday: 8420,
      lowStock: 3,
    })
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

      {/* Recent Orders Section */}
      <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
        <h2 className="text-lg font-semibold text-white mb-4">
          Recent Orders
        </h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-slate-300">
            <span>#ORD1021</span>
            <span>₹1,240</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>#ORD1020</span>
            <span>₹890</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>#ORD1019</span>
            <span>₹2,140</span>
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      <div className="bg-red-950/40 border border-red-800 rounded-xl p-4">
        <h2 className="text-lg font-semibold text-red-400">
          ⚠ Low Stock Alert
        </h2>
        <p className="text-sm text-red-300 mt-2">
          3 products are running low. Update inventory soon.
        </p>
      </div>

    </div>
  )
}
