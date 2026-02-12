"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/ui/AppIcon";

interface ProductFormProps {
  initialData?: any;
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();

  const [form, setForm] = useState({
    id: "",
    name: "",
    pricePerKg: 0,
    stock: 0,
    image: "",
    description: "",
    origin: "",
    category: "Fish",
    sustainability: true,
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      handleChange("image", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    const existing =
      JSON.parse(localStorage.getItem("freshcatch_products") || "[]");

    let updated;

    if (initialData) {
      updated = existing.map((p: any) =>
        p.id === form.id ? form : p
      );
    } else {
      updated = [...existing, { ...form, id: Date.now().toString() }];
    }

    localStorage.setItem("freshcatch_products", JSON.stringify(updated));

    router.push("/admin/products");
  };

  return (
    <div className="space-y-6 bg-slate-900 p-6 rounded-xl border border-slate-800">

      <h2 className="text-xl font-bold">
        {initialData ? "Edit Product" : "Add New Product"}
      </h2>

      <input
        type="text"
        placeholder="Product Name"
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
        className="w-full bg-slate-800 p-2 rounded-lg"
      />

      <input
        type="number"
        placeholder="Price"
        value={form.pricePerKg}
        onChange={(e) => handleChange("pricePerKg", Number(e.target.value))}
        className="w-full bg-slate-800 p-2 rounded-lg"
      />

      <input
        type="number"
        placeholder="Stock"
        value={form.stock}
        onChange={(e) => handleChange("stock", Number(e.target.value))}
        className="w-full bg-slate-800 p-2 rounded-lg"
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => handleChange("description", e.target.value)}
        className="w-full bg-slate-800 p-2 rounded-lg"
      />

      <input
        type="text"
        placeholder="Origin"
        value={form.origin}
        onChange={(e) => handleChange("origin", e.target.value)}
        className="w-full bg-slate-800 p-2 rounded-lg"
      />

      {/* Image Upload */}
      <div className="space-y-2">
        <label className="block text-sm">Upload Image</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {form.image && (
          <img
            src={form.image}
            alt="Preview"
            className="w-40 h-40 object-cover rounded-lg border border-slate-700"
          />
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-primary hover:bg-primary/90 px-4 py-2 rounded-lg flex items-center gap-2"
      >
        <Icon name="CheckIcon" size={18} />
        Save Product
      </button>
    </div>
  );
}
