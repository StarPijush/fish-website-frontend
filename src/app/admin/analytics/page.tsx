"use client"

import { useEffect, useState } from "react"

interface Order {
  id: string
  customerName: string
  phone: string
  items: {
    id: string
    name: string
    pricePerKg: number
    quantity: number
  }[]
  total: number
  createdAt: string
}

export default function AdminAnalytics() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])

  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")

  const [monthlyRevenue, setMonthlyRevenue] = useState<
    { month: string; total: number }[]
  >([])

  // 🔥 Load Orders
  useEffect(() => {
    const saved = localStorage.getItem("freshcatch_orders")
    const parsed = saved ? JSON.parse(saved) : []
    setOrders(parsed)
    setFilteredOrders(parsed)
  }, [])

  // 🔥 Date Filtering
  useEffect(() => {
    if (!fromDate && !toDate) {
      setFilteredOrders(orders)
      return
    }

    const filtered = orders.filter((order) => {
      const date = new Date(order.createdAt)

      const afterFrom = fromDate ? date >= new Date(fromDate) : true
      const beforeTo = toDate ? date <= new Date(toDate) : true

      return afterFrom && beforeTo
    })

    setFilteredOrders(filtered)
  }, [fromDate, toDate, orders])

  // 🔥 Monthly Revenue Calculation
  useEffect(() => {
    const monthMap: Record<string, number> = {}

    filteredOrders.forEach((order) => {
      const date = new Date(order.createdAt)
      const month = date.toLocaleString("default", { month: "short", year: "numeric" })

      if (!monthMap[month]) monthMap[month] = 0
      monthMap[month] += order.total
    })

    const result = Object.entries(monthMap).map(([month, total]) => ({
      month,
      total,
    }))

    setMonthlyRevenue(result)
  }, [filteredOrders])

  const totalRevenue = filteredOrders.reduce(
    (sum, order) => sum + order.total,
    0
  )

  const exportToPDF = () => {
    const content = `
FreshCatch Analytics Report

Total Revenue: ₹${totalRevenue.toFixed(2)}

Orders:
${filteredOrders
  .map(
    (o) =>
      `Order ${o.id} - ₹${o.total.toFixed(2)} - ${new Date(
        o.createdAt
      ).toLocaleDateString()}`
  )
  .join("\n")}
`

    const blob = new Blob([content], { type: "application/pdf" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "freshcatch-analytics.pdf"
    a.click()

    URL.revokeObjectURL(url)
  }

  const maxRevenue =
    monthlyRevenue.length > 0
      ? Math.max(...monthlyRevenue.map((m) => m.total))
      : 0

  return (
    <div className="p-4 md:p-6 space-y-6">

      {/* Title */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Advanced Analytics
          </h1>
          <p className="text-slate-400 text-sm">
            Monthly revenue & filtered insights
          </p>
        </div>

        <button
          onClick={exportToPDF}
          className="bg-primary px-4 py-2 rounded-lg text-white hover:bg-primary/90 transition"
        >
          Export PDF
        </button>
      </div>

      {/* Date Range Filter */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4">

        <div>
          <label className="text-sm text-slate-400">From</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 mt-1 text-white"
          />
        </div>

        <div>
          <label className="text-sm text-slate-400">To</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 mt-1 text-white"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={() => {
              setFromDate("")
              setToDate("")
            }}
            className="w-full bg-slate-700 hover:bg-slate-600 rounded-lg p-2 text-white transition"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Revenue Summary */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <h2 className="text-lg font-semibold text-white mb-2">
          Total Revenue (Filtered)
        </h2>
        <p className="text-3xl font-bold text-green-400">
          ₹{totalRevenue.toFixed(2)}
        </p>
      </div>

      {/* Monthly Revenue Graph */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <h2 className="text-lg font-semibold text-white mb-4">
          Monthly Revenue
        </h2>

        {monthlyRevenue.length === 0 ? (
          <p className="text-slate-400 text-sm">
            No revenue data available.
          </p>
        ) : (
          <div className="space-y-4">
            {monthlyRevenue.map((month) => {
              const percentage =
                maxRevenue > 0
                  ? (month.total / maxRevenue) * 100
                  : 0

              return (
                <div key={month.month}>
                  <div className="flex justify-between text-sm text-slate-300 mb-1">
                    <span>{month.month}</span>
                    <span>₹{month.total.toFixed(2)}</span>
                  </div>

                  <div className="w-full bg-slate-800 rounded-full h-4">
                    <div
                      className="bg-primary h-4 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

    </div>
  )
}
