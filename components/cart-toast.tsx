"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/products"

interface CartToastProps {
  product: Product
  onDismiss: () => void
}

export function CartToast({ product, onDismiss }: CartToastProps) {
  const { items, updateQuantity } = useCart()

  // Find the current item in cart to get its quantity
  const cartItem = items.find((item) => item.id === product.id)
  const quantity = cartItem?.quantity || 1

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-muted">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              loading="lazy"
              sizes="80px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium text-sm leading-tight">{product.name}</p>
                <p className="text-xs text-muted-foreground">{product.category}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={onDismiss} className="flex-shrink-0 h-6 w-6">
                <XMarkIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center border border-border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                >
                  <MinusIcon className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center font-mono text-sm">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                >
                  <PlusIcon className="h-3 w-3" />
                </Button>
              </div>
              <Link href="/cart" className="text-sm font-medium text-primary hover:underline" onClick={onDismiss}>
                View Cart
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
