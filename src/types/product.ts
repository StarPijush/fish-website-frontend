export type ProductStatus = "in_stock" | "low_stock" | "out_of_stock"

export interface Product {
  id: string
  name: string
  description: string
  pricePerKg: number
  image: string
  origin: string
  sustainability: boolean
  status: ProductStatus
  createdAt: string
  updatedAt: string
}