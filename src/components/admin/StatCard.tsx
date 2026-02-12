"use client"

export default function StatCard({
  title,
  value,
  danger = false,
}: {
  title: string
  value: string | number
  danger?: boolean
}) {
  return (
    <div
      className={`rounded-xl p-4 border ${
        danger
          ? "bg-red-950/30 border-red-800"
          : "bg-slate-900 border-slate-800"
      }`}
    >
      <p className="text-sm text-slate-400">
        {title}
      </p>
      <h3
        className={`text-2xl font-bold mt-2 ${
          danger ? "text-red-400" : "text-white"
        }`}
      >
        {value}
      </h3>
    </div>
  )
}
