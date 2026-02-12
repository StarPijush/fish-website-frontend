import { apiClient } from "./client"
import { Product } from "@/types/product"

export const getProducts = () =>
  apiClient<Product[]>("/products")

export const createProduct = (data: Partial<Product>) =>
  apiClient<Product>("/products", {
    method: "POST",
    body: JSON.stringify(data),
  })

export const updateProduct = (id: string, data: Partial<Product>) =>
  apiClient<Product>(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })

export const deleteProduct = (id: string) =>
  apiClient<void>(`/products/${id}`, {
    method: "DELETE",
  })