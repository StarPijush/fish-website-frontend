"use client"

import { useEffect, useState } from "react"
import { getOrders } from "@/lib/api/orders"
import { Order } from "@/types/order"

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getOrders()
        setOrders(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { orders, loading }
}
