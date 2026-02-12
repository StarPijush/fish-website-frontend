export function formatCurrency(amount: number) {
  return `₹${amount.toFixed(2)}`
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString()
}
