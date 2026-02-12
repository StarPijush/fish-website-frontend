"use client"

import Icon from "@/components/ui/AppIcon"

export default function Topbar({
  openSidebar,
}: {
  openSidebar: () => void
}) {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 md:px-6">

      {/* Mobile Sidebar Button */}
      <button
        onClick={openSidebar}
        className="md:hidden text-slate-400 hover:text-white"
      >
        <Icon name="Bars3Icon" size={24} />
      </button>

      {/* Title */}
      <h2 className="text-lg font-semibold text-white">
        Admin Panel
      </h2>

      {/* Right Side */}
      <div className="text-sm text-slate-400">
        Owner
      </div>
    </header>
  )
}
