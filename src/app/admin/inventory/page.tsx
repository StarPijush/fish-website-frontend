"use client"

import { useEffect, useState } from "react"
import Icon from "@/components/ui/AppIcon"

interface Product {
  id: string
  name: string
  pricePerKg: number
  stock: number
  image: string
  category: string
  status: "in_stock" | "low_stock" | "out_of_stock"
}

export default function AdminInventory() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState("")

  // 🔥 Load products safely with proper typing
useEffect(() => {
  const saved = localStorage.getItem("freshcatch_products")

  if (!saved) {
    setProducts([])
    return
  }

  const parsed: any[] = JSON.parse(saved)

  const safeProducts: Product[] = parsed.map((p) => {
    let safeStatus: Product["status"] = "in_stock"

    if (p.status === "low_stock") safeStatus = "low_stock"
    else if (p.status === "out_of_stock") safeStatus = "out_of_stock"

    return {
      id: String(p.id),
      name: String(p.name),
      pricePerKg: Number(p.pricePerKg) || 0,
      stock: Number(p.stock) || 0,
      image: String(p.image || ""),
      category: String(p.category || "General"),
      status: safeStatus,
    }
  })

  setProducts(safeProducts)
}, [])

  // 🔥 Save products
  const saveProducts = (updated: Product[]) => {
    setProducts(updated)
    localStorage.setItem("freshcatch_products", JSON.stringify(updated))
  }

  // 🔥 Update stock
  const updateStock = (id: string, newStock: number) => {
    const updated = products.map((p) => {
      if (p.id === id) {
        let newStatus: Product["status"] = "in_stock"

        if (newStock <= 0) newStatus = "out_of_stock"
        else if (newStock <= 5) newStatus = "low_stock"

        return { ...p, stock: newStock, status: newStatus }
      }
      return p
    })

    saveProducts(updated)
  }

  // 🔥 Toggle Status
  const toggleStatus = (id: string) => {
    const updated = products.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          status:
            p.status === "out_of_stock" ? "in_stock" : "out_of_stock",
        }
      }
      return p
    })

    saveProducts(updated)
  }

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4 md:p-6 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Inventory Management
        </h1>
        <p className="text-slate-400 text-sm">
          Manage stock levels & availability
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Icon
          name="MagnifyingGlassIcon"
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Inventory Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-800 text-slate-400">
            <tr>
              <th className="text-left px-4 py-3">Product</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-left px-4 py-3">Stock</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr
                key={product.id}
                className="border-t border-slate-800 hover:bg-slate-800/50"
              >
                <td className="px-4 py-3 text-white">
                  {product.name}
                </td>

                <td className="px-4 py-3 text-slate-300">
                  {product.category}
                </td>

                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={product.stock}
                    min={0}
                    onChange={(e) =>
                      updateStock(product.id, Number(e.target.value))
                    }
                    className="w-20 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white"
                  />
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${product.status === "in_stock"
                        ? "bg-green-500/20 text-green-400"
                        : product.status === "low_stock"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                  >
                    {product.status.replace("_", " ")}
                  </span>
                </td>

                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => toggleStatus(product.id)}
                    className="text-slate-400 hover:text-white transition"
                  >
                    <Icon name="ArrowsRightLeftIcon" size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-10 text-slate-400">
            No products found.
          </div>
        )}
      </div>

      {/* Low Stock Warning */}
      {products.some((p) => p.status === "low_stock") && (
        <div className="bg-yellow-950/40 border border-yellow-800 rounded-xl p-4">
          <h2 className="text-yellow-400 font-semibold">
            ⚠ Low Stock Warning
          </h2>
          <p className="text-yellow-300 text-sm mt-1">
            Some products are running low.
          </p>
        </div>
      )}

    </div>
  )
}
