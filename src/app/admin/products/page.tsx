"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/ui/AppIcon";

interface Product {
  id: string;
  name: string;
  category: string;
  pricePerKg: number;
  stock: number;
  status: "in_stock" | "low_stock" | "out_of_stock";
  image: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("freshcatch_products");
    if (stored) {
      setProducts(JSON.parse(stored));
    }
  }, []);

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("freshcatch_products", JSON.stringify(updated));
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Products Management</h1>

        <button
          onClick={() => router.push("/admin/products/new")}
          className="bg-primary hover:bg-primary/90 px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
        >
          <Icon name="PlusIcon" size={18} />
          Add Product
        </button>
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
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-800 text-slate-400">
            <tr>
              <th className="text-left px-4 py-3">Image</th>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-left px-4 py-3">Price</th>
              <th className="text-left px-4 py-3">Stock</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr key={product.id} className="border-t border-slate-800 hover:bg-slate-800/50">
                <td className="px-4 py-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                </td>
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3">${product.pricePerKg}</td>
                <td className="px-4 py-3">{product.stock}</td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button
                    onClick={() => router.push(`/admin/products/${product.id}`)}
                    className="text-slate-400 hover:text-white"
                  >
                    <Icon name="PencilIcon" size={16} />
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="text-slate-400 hover:text-red-400"
                  >
                    <Icon name="TrashIcon" size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filtered.map((product) => (
          <div key={product.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-slate-400">{product.category}</p>
              </div>
            </div>

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg"
            />

            <div className="flex justify-between text-sm">
              <span>${product.pricePerKg}</span>
              <span>Stock: {product.stock}</span>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => router.push(`/admin/products/${product.id}`)}
                className="text-slate-400 hover:text-white"
              >
                <Icon name="PencilIcon" size={18} />
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                className="text-slate-400 hover:text-red-400"
              >
                <Icon name="TrashIcon" size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
