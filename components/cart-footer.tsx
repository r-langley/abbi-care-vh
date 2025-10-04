"use client"

import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CartFooter() {
  const { totalItems, subtotal } = useCart()

  if (totalItems === 0) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-primary text-primary-foreground border-t border-border shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col items-center gap-3">
          <h3 className="text-lg font-medium text-center">Review your Routine</h3>
          <Link href="/cart" className="w-full max-w-2xl">
            <Button
              size="lg"
              className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-xl font-medium py-6"
            >
              PAY ${subtotal}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
