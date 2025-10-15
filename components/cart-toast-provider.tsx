"use client"

import { useEffect, useState } from "react"
import { useCart } from "@/lib/cart-context"
import { CartToast } from "@/components/cart-toast"
import type { Product } from "@/lib/products"

export function CartToastProvider() {
  const { setOnItemAdded } = useCart()
  const [addedProduct, setAddedProduct] = useState<Product | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    console.log("[v0] CartToastProvider mounted, registering callback")
    setOnItemAdded((product: Product) => {
      console.log("[v0] Toast callback triggered for:", product.name)
      setAddedProduct(product)
      setIsVisible(true)

      setTimeout(() => {
        console.log("[v0] Hiding toast after 3s")
        setIsVisible(false)
      }, 3000)
    })
  }, [setOnItemAdded])

  const handleDismiss = () => {
    console.log("[v0] Toast dismissed manually")
    setIsVisible(false)
  }

  console.log("[v0] CartToastProvider render - isVisible:", isVisible, "product:", addedProduct?.name)

  if (!isVisible || !addedProduct) {
    return null
  }

  return (
    <div className="fixed top-[88px] left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 animate-in slide-in-from-top-2 duration-300">
      <CartToast product={addedProduct} onDismiss={handleDismiss} />
    </div>
  )
}
