"use client";

import { useState, useEffect } from 'react';
import ProductCarousel from './ProductCarousel';
import CartSummaryBar from './CartSummaryBar';

export interface Fish {
  id: string;
  name: string;
  pricePerKg: number;
  stock: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  image: string;
  alt: string;
  description: string;
  origin: string;
  sustainability: boolean;
  category: string;
}

const fishData: Fish[] = [
{
  id: 'fish_salmon',
  name: 'Atlantic Salmon',
  pricePerKg: 28.99,
  stock: 15,
  status: 'in_stock',
  image: "https://images.unsplash.com/photo-1673767413856-2cfc082c7ea5",
  alt: 'Fresh Atlantic salmon fillet with pink flesh on ice',
  description: 'Premium Norwegian salmon, rich in omega-3 fatty acids',
  origin: 'Norway',
  sustainability: true,
  category: 'Fish'
},
{
  id: 'fish_tuna',
  name: 'Yellowfin Tuna',
  pricePerKg: 35.99,
  stock: 8,
  status: 'in_stock',
  image: "https://images.unsplash.com/photo-1649730243029-13df7da2b843",
  alt: 'Red tuna steak with deep red color on white background',
  description: 'Sushi-grade tuna, perfect for steaks or sashimi',
  origin: 'Pacific Ocean',
  sustainability: true,
  category: 'Fish'
},
{
  id: 'fish_seabass',
  name: 'Sea Bass',
  pricePerKg: 24.99,
  stock: 3,
  status: 'low_stock',
  image: "https://images.unsplash.com/photo-1712064740743-f5d1cafbff97",
  alt: 'Whole sea bass fish with silver scales on ice',
  description: 'Delicate white flesh, ideal for grilling or baking',
  origin: 'Mediterranean',
  sustainability: false,
  category: 'Fish'
},
{
  id: 'fish_shrimp',
  name: 'Tiger Prawns',
  pricePerKg: 32.99,
  stock: 20,
  status: 'in_stock',
  image: "https://images.unsplash.com/photo-1568267641487-2c9405330c96",
  alt: 'Fresh tiger prawns with orange stripes on ice',
  description: 'Large, succulent prawns with sweet flavor',
  origin: 'Thailand',
  sustainability: true,
  category: 'Shellfish'
},
{
  id: 'fish_cod',
  name: 'Atlantic Cod',
  pricePerKg: 22.99,
  stock: 12,
  status: 'in_stock',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1aaa78188-1769202323812.png",
  alt: 'Fresh cod fish with white flaky meat',
  description: 'Mild, flaky white fish perfect for fish and chips',
  origin: 'Iceland',
  sustainability: true,
  category: 'Fish'
},
{
  id: 'fish_lobster',
  name: 'Maine Lobster',
  pricePerKg: 48.99,
  stock: 0,
  status: 'out_of_stock',
  image: "https://images.unsplash.com/photo-1558991725-f16337342394",
  alt: 'Live Maine lobster with red shell and claws',
  description: 'Premium lobster with sweet, tender meat',
  origin: 'Maine, USA',
  sustainability: true,
  category: 'Shellfish'
},
{
  id: 'fish_mackerel',
  name: 'Spanish Mackerel',
  pricePerKg: 18.99,
  stock: 25,
  status: 'in_stock',
  image: "https://images.unsplash.com/photo-1571079561822-f7d959982bf2",
  alt: 'Fresh Spanish mackerel with striped pattern',
  description: 'Oily fish rich in omega-3, great for grilling',
  origin: 'Spain',
  sustainability: true,
  category: 'Fish'
},
{
  id: 'fish_scallops',
  name: 'Sea Scallops',
  pricePerKg: 42.99,
  stock: 6,
  status: 'low_stock',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1742e0be9-1766767366250.png",
  alt: 'Fresh sea scallops with white meat',
  description: 'Sweet, buttery scallops perfect for searing',
  origin: 'Canada',
  sustainability: true,
  category: 'Shellfish'
},
{
  id: 'fish_mussels',
  name: 'Blue Mussels',
  pricePerKg: 14.99,
  stock: 30,
  status: 'in_stock',
  image: "https://images.unsplash.com/photo-1651972627542-c6e50468e581",
  alt: 'Fresh blue mussels with dark shells',
  description: 'Plump mussels, perfect for steaming',
  origin: 'New Zealand',
  sustainability: true,
  category: 'Shellfish'
},
{
  id: 'fish_squid',
  name: 'Fresh Squid',
  pricePerKg: 19.99,
  stock: 18,
  status: 'in_stock',
  image: "https://images.unsplash.com/photo-1623910270365-9b45727235c4",
  alt: 'Fresh squid with tentacles on ice',
  description: 'Tender squid, ideal for frying or grilling',
  origin: 'Japan',
  sustainability: true,
  category: 'Shellfish'
}];


export default function ProductsInteractive() {
  const [cart, setCart] = useState<{[key: string]: number;}>({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('freshcatch_cart');
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      const cartObj: {[key: string]: number;} = {};
      cartData.forEach((item: any) => {
        cartObj[item.id] = item.quantity;
      });
      setCart(cartObj);
    }
  }, []);

  useEffect(() => {
    // Calculate totals
    let price = 0;
    let items = 0;
    Object.keys(cart).forEach((fishId) => {
      const fish = fishData.find((f) => f.id === fishId);
      if (fish) {
        price += fish.pricePerKg * cart[fishId];
        items += cart[fishId];
      }
    });
    setTotalPrice(price);
    setTotalItems(items);

    // Save to localStorage
    const cartArray = Object.keys(cart).map((fishId) => {
      const fish = fishData.find((f) => f.id === fishId);
      return {
        id: fishId,
        name: fish?.name || '',
        pricePerKg: fish?.pricePerKg || 0,
        quantity: cart[fishId]
      };
    });
    localStorage.setItem('freshcatch_cart', JSON.stringify(cartArray));

    // Dispatch event for header to update
    window.dispatchEvent(new Event('cart-updated'));
  }, [cart]);

  const updateQuantity = (fishId: string, quantity: number) => {
    setCart((prev) => {
      if (quantity <= 0) {
        const newCart = { ...prev };
        delete newCart[fishId];
        return newCart;
      }
      return { ...prev, [fishId]: quantity };
    });
  };

  return (
    <>
      <ProductCarousel fish={fishData} cart={cart} updateQuantity={updateQuantity} />
      <CartSummaryBar totalItems={totalItems} totalPrice={totalPrice} />
    </>);

}