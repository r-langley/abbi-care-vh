"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef } from "react"
import type { Product } from "@/lib/products"
import { STORAGE_KEYS } from "@/lib/constants"

interface CartItem extends Product {
  quantity: number
  customerId?: string // For multi-customer shopping
  isSubscription: boolean // Auto-ship/subscribe to save
}

interface CartContextType {
  items: CartItem[]
  ambassadorCode: string
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  updateItemCustomer: (productId: string, customerId: string | undefined) => void
  toggleSubscription: (productId: string) => void
  setAmbassadorCode: (code: string) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
  subscriptionSavings: number
  customerGroups: Map<string | undefined, CartItem[]>
  onItemAdded?: (product: Product) => void
  setOnItemAdded: (callback: (product: Product) => void) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [ambassadorCode, setAmbassadorCode] = useState("")
  const onItemAddedRef = useRef<((product: Product) => void) | undefined>()

  useEffect(() => {
    const savedCart = localStorage.getItem(STORAGE_KEYS.CART)
    const savedAmbassadorCode = localStorage.getItem(STORAGE_KEYS.AMBASSADOR_CODE)
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
    if (savedAmbassadorCode) {
      setAmbassadorCode(savedAmbassadorCode)
    }
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(items))
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [items])

  // Save ambassador code to localStorage
  useEffect(() => {
    if (ambassadorCode) {
      localStorage.setItem(STORAGE_KEYS.AMBASSADOR_CODE, ambassadorCode)
    } else {
      localStorage.removeItem(STORAGE_KEYS.AMBASSADOR_CODE)
    }
  }, [ambassadorCode])

  const addItem = useCallback((product: Product, quantity = 1) => {
    console.log("[v0] addItem called with:", product.name, "quantity:", quantity)
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id)
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }
      return [...currentItems, { ...product, quantity, isSubscription: false }]
    })
    if (onItemAddedRef.current) {
      console.log("[v0] Calling onItemAdded callback")
      onItemAddedRef.current(product)
    } else {
      console.log("[v0] No onItemAdded callback registered")
    }
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== productId))
  }, [])

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId)
        return
      }
      setItems((currentItems) => currentItems.map((item) => (item.id === productId ? { ...item, quantity } : item)))
    },
    [removeItem],
  )

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const setOnItemAdded = useCallback((callback: (product: Product) => void) => {
    console.log("[v0] setOnItemAdded called")
    onItemAddedRef.current = callback
  }, [])

  const updateItemCustomer = useCallback((productId: string, customerId: string | undefined) => {
    setItems((currentItems) =>
      currentItems.map((item) => (item.id === productId ? { ...item, customerId } : item)),
    )
  }, [])

  const toggleSubscription = useCallback((productId: string) => {
    setItems((currentItems) =>
      currentItems.map((item) => (item.id === productId ? { ...item, isSubscription: !item.isSubscription } : item)),
    )
  }, [])

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items])

  const subscriptionSavings = useMemo(
    () => items.filter((item) => item.isSubscription).reduce((sum, item) => sum + item.price * item.quantity * 0.05, 0),
    [items],
  )

  // Group items by customer for split order display
  const customerGroups = useMemo(() => {
    const groups = new Map<string | undefined, CartItem[]>()
    items.forEach((item) => {
      const key = item.customerId
      if (!groups.has(key)) {
        groups.set(key, [])
      }
      groups.get(key)?.push(item)
    })
    return groups
  }, [items])

  return (
    <CartContext.Provider
      value={{
        items,
        ambassadorCode,
        addItem,
        removeItem,
        updateQuantity,
        updateItemCustomer,
        toggleSubscription,
        setAmbassadorCode,
        clearCart,
        totalItems,
        subtotal,
        subscriptionSavings,
        customerGroups,
        onItemAdded: onItemAddedRef.current,
        setOnItemAdded,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
