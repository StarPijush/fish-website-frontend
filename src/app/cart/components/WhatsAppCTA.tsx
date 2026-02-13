"use client"

import { useState } from "react"
import Icon from "@/components/ui/AppIcon"
import { getOwnerPhone } from "@/lib/api/auth"

interface CartItem {
  id: string
  name: string
  pricePerKg: number
  quantity: number
}

interface WhatsAppCTAProps {
  cartItems: CartItem[]
  total: number
}

export default function WhatsAppCTA({ cartItems, total }: WhatsAppCTAProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const generateWhatsAppMessage = (locationLink?: string) => {
    let message = `🐟 *FreshCatch Order*\n\n`
    message += `📦 *Items:*\n`

    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - ${item.quantity} kg @ ₹${item.pricePerKg.toFixed(2)}/kg = ₹${(item.quantity * item.pricePerKg).toFixed(2)}\n`
    })

    message += `\n💰 *Total: ₹${total.toFixed(2)}*\n\n`

    if (locationLink) {
      message += `📍 *Live Location:*\n${locationLink}\n\n`
    }

    message += `Please confirm my order. Thank you 🙏`

    return encodeURIComponent(message)
  }

  const handleWhatsAppOrder = async () => {
    if (cartItems.length === 0) return

    setLoading(true)
    setError("")

    if (!navigator.geolocation) {
      setError("Location not supported on this device.")
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const locationLink = `https://www.google.com/maps?q=${latitude},${longitude}`

        const phone = getOwnerPhone()
        const message = generateWhatsAppMessage(locationLink)
        const url = `https://wa.me/${phone}?text=${message}`

        window.open(url, "_blank")
        setLoading(false)
      },
      () => {
        // If location denied, still send order without location
        const phone = getOwnerPhone()
        const message = generateWhatsAppMessage()
        const url = `https://wa.me/${phone}?text=${message}`
        window.open(url, "_blank")
        setLoading(false)
      }
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 pb-6">
      <div className="container mx-auto max-w-4xl">
        <button
          onClick={handleWhatsAppOrder}
          disabled={loading}
          className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50"
        >
          <Icon name="ChatBubbleLeftRightIcon" size={24} />
          <span>
            {loading ? "Fetching Location..." : "Order via WhatsApp"}
          </span>
        </button>

        {error && (
          <p className="text-center text-red-400 text-sm mt-2">{error}</p>
        )}
      </div>
    </div>
  )
}
