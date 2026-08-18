'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { CartItem, Medicine } from './types'

interface CartContextValue {
  items: CartItem[]
  addItem: (medicine: Medicine, quantity: number) => void
  updateQuantity: (medicineId: string, quantity: number) => void
  removeItem: (medicineId: string) => void
  clearCart: () => void
  subtotal: number
  count: number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const raw = localStorage.getItem('oza_cart')
    if (raw) {
      try {
        setItems(JSON.parse(raw))
      } catch {
        // ignore corrupt cart data
      }
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) localStorage.setItem('oza_cart', JSON.stringify(items))
  }, [items, hydrated])

  function addItem(medicine: Medicine, quantity: number) {
    setItems((prev) => {
      const existing = prev.find((i) => i.medicineId === medicine.id)
      if (existing) {
        return prev.map((i) =>
          i.medicineId === medicine.id ? { ...i, quantity: i.quantity + quantity } : i
        )
      }
      return [
        ...prev,
        { medicineId: medicine.id, name: medicine.name, price: medicine.price, image: medicine.image, quantity },
      ]
    })
  }

  function updateQuantity(medicineId: string, quantity: number) {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.medicineId !== medicineId)
        : prev.map((i) => (i.medicineId === medicineId ? { ...i, quantity } : i))
    )
  }

  function removeItem(medicineId: string) {
    setItems((prev) => prev.filter((i) => i.medicineId !== medicineId))
  }

  function clearCart() {
    setItems([])
  }

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, removeItem, clearCart, subtotal, count }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
