"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { isAuthenticated } from "@/lib/api/auth"
import Sidebar from "@/components/admin/Sidebar"
import Topbar from "@/components/admin/Topbar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const loggedIn = isAuthenticated()

    if (!loggedIn && !pathname.includes("/admin/login")) {
      router.push("/admin/login")
    }
  }, [pathname, router])

  // Don't show layout on login page
  if (pathname.includes("/admin/login")) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white overflow-hidden">

      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Section */}
      <div className="flex-1 flex flex-col w-full">

        {/* Topbar */}
        <Topbar openSidebar={() => setSidebarOpen(true)} />

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
