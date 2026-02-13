"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Icon from "@/components/ui/AppIcon"

interface SidebarProps {
  open?: boolean
  onClose?: () => void
}

export default function Sidebar({
  open = true,
  onClose,
}: SidebarProps) {
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
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static z-50
          top-0 left-0
          h-screen w-64
          bg-slate-900 border-r border-slate-800
          p-6 flex flex-col
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
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
                onClick={onClose}
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

        <div className="flex-1" />

        {/* Logout Button */}
        <button
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
        >
          <Icon name="ArrowLeftOnRectangleIcon" size={18} />
          <span className="text-sm">Logout</span>
        </button>
      </aside>
    </>
  )
}
