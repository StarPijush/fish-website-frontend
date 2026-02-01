"use client";

import { useState, useEffect } from 'react';
import CartItemsList from './CartItemsList';
import OrderSummary from './OrderSummary';
import WhatsAppCTA from './WhatsAppCTA';
import EmptyCart from './EmptyCart';

interface CartItem {
  id: string;
  name: string;
  pricePerKg: number;
  quantity: number;
  image?: string;
  alt?: string;
}

export default function CartInteractive() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    loadCart();
  }, []);

  const loadCart = () => {
    const savedCart = localStorage.getItem('freshcatch_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }

    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('freshcatch_cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cart-updated'));
  };

  const removeItem = (itemId: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('freshcatch_cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cart-updated'));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.pricePerKg * item.quantity, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const deliveryFee = subtotal > 0 ? 5.99 : 0;
    return subtotal + deliveryFee;
  };

  if (!isHydrated) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-black text-foreground mb-2">
          Your Order
        </h1>
        <p className="text-lg text-foreground/70">
          Review your items before placing your order
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-7">
          <CartItemsList
            items={cartItems}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
          />
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <OrderSummary
              subtotal={calculateSubtotal()}
              deliveryFee={cartItems.length > 0 ? 5.99 : 0}
              total={calculateTotal()}
            />
          </div>
        </div>
      </div>

      {/* WhatsApp CTA */}
      <WhatsAppCTA cartItems={cartItems} total={calculateTotal()} />
    </section>
  );
}