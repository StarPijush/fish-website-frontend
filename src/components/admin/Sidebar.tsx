"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Icon from "@/components/ui/AppIcon"

export default function Sidebar({
  closeSidebar,
}: {
  closeSidebar?: () => void
}) {
  const pathname = usePathname()

  const links = [
    { name: "Dashboard", href: "/admin/dashboard", icon: "HomeIcon" },
    { name: "Products", href: "/admin/products", icon: "CubeIcon" },
    { name: "Orders", href: "/admin/orders", icon: "ShoppingCartIcon" },
    { name: "Inventory", href: "/admin/inventory", icon: "ArchiveBoxIcon" },
    { name: "Analytics", href: "/admin/analytics", icon: "ChartBarIcon" },
    { name: "Settings", href: "/admin/settings", icon: "Cog6ToothIcon" },
  ]

  return (
    <aside className="w-64 h-screen bg-slate-900 border-r border-slate-800 p-6 flex flex-col">

      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
          <Icon name="SparklesIcon" size={18} className="text-white" />
        </div>
        <span className="text-lg font-bold text-primary">
          FreshCatch
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {links.map((link) => {
          const active = pathname === link.href

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeSidebar}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                active
                  ? "bg-primary/20 text-primary"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon name={link.icon} size={18} />
              <span className="text-sm font-medium">
                {link.name}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Logout */}
      <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
        <Icon name="ArrowLeftOnRectangleIcon" size={18} />
        <span className="text-sm">Logout</span>
      </button>
    </aside>
  )
}
