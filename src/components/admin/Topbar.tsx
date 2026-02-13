"use client"

import Icon from "@/components/ui/AppIcon"
import { logout } from "@/lib/api/auth"
import { useRouter } from "next/navigation"

export default function Topbar({
  openSidebar,
}: {
  openSidebar: () => void
}) {
  const router = useRouter()

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

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-400">
          Owner
        </span>

        <button
          onClick={() => {
            logout()
            router.push("/admin/login")
          }}
          className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg"
        >
          Logout
        </button>
      </div>

    </header>
  )
}
