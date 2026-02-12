"use client";

import { useState, useEffect } from "react";
import ProductCarousel from "./ProductCarousel";
import CartSummaryBar from "./CartSummaryBar";

export interface Fish {
  id: string;
  name: string;
  pricePerKg: number;
  stock: number;
  status: "in_stock" | "low_stock" | "out_of_stock";
  image: string;
  alt: string;
  description: string;
  origin: string;
  sustainability: boolean;
  category: string;
}

export default function ProductsInteractive() {
  const [products, setProducts] = useState<Fish[]>([]);
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // Load products
  useEffect(() => {
    const saved = localStorage.getItem("freshcatch_products");

    if (saved) {
      const parsed = JSON.parse(saved);

      // 🔥 Normalize data (important fix)
      const normalized = parsed.map((p: any) => ({
        ...p,
        pricePerKg: Number(p.pricePerKg || p.price || 0),
      }));

      setProducts(normalized);
    }
  }, []);

  // Load cart
  useEffect(() => {
    const savedCart = localStorage.getItem("freshcatch_cart");
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      const cartObj: { [key: string]: number } = {};

      cartData.forEach((item: any) => {
        cartObj[item.id] = item.quantity;
      });

      setCart(cartObj);
    }
  }, []);

  // Calculate totals
  useEffect(() => {
    let price = 0;
    let items = 0;

    Object.keys(cart).forEach((id) => {
      const product = products.find((p) => p.id === id);
      if (product) {
        price += Number(product.pricePerKg) * cart[id];
        items += cart[id];
      }
    });

    setTotalPrice(price);
    setTotalItems(items);

    // 🔥 Save full product info in cart (fix image issue)
    const cartArray = Object.keys(cart).map((id) => {
      const product = products.find((p) => p.id === id);
      return {
        id,
        name: product?.name || "",
        pricePerKg: Number(product?.pricePerKg || 0),
        quantity: cart[id],
        image: product?.image || "",
        alt: product?.alt || product?.name || "",
      };
    });

    localStorage.setItem("freshcatch_cart", JSON.stringify(cartArray));
    window.dispatchEvent(new Event("cart-updated"));
  }, [cart, products]);

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prev) => {
      if (quantity <= 0) {
        const newCart = { ...prev };
        delete newCart[id];
        return newCart;
      }
      return { ...prev, [id]: quantity };
    });
  };

  return (
    <>
      <ProductCarousel
        fish={products}
        cart={cart}
        updateQuantity={updateQuantity}
      />
      <CartSummaryBar totalItems={totalItems} totalPrice={totalPrice} />
    </>
  );
}
