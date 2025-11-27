"use client"

import { useEffect, useRef, useState } from "react"
import { CartDrawer } from "./cart-drawer"
import { useCart } from "@/lib/cart-context"

export function CartDrawerProvider() {
  const [isOpen, setIsOpen] = useState(false)
  const { setOnItemAdded } = useCart()
  const timeoutRef = useRef<NodeJS.Timeout>(undefined)

  useEffect(() => {
    // Set up the callback for when items are added
    setOnItemAdded(() => {
      console.log("[v0] Item added to cart, opening drawer")
      setIsOpen(true)

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // Auto-close after 5 seconds
      timeoutRef.current = setTimeout(() => {
        console.log("[v0] Auto-closing drawer after 5s")
        setIsOpen(false)
      }, 5000)
    })

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [setOnItemAdded])

  const handleOpenChange = (open: boolean) => {
    console.log("[v0] Drawer open state changed:", open)
    setIsOpen(open)

    // Clear timeout if manually closed
    if (!open && timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  return <CartDrawer open={isOpen} onOpenChange={handleOpenChange} />
}
