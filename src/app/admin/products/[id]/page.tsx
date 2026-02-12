"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductForm from "../ProductForm";

export default function EditProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const products =
      JSON.parse(localStorage.getItem("freshcatch_products") || "[]");

    const found = products.find((p: any) => p.id === id);
    setProduct(found);
  }, [id]);

  if (!product) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <ProductForm initialData={product} />
    </div>
  );
}
