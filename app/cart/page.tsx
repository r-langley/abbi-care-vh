"use client"

import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { CartFooter } from "@/components/cart-footer"
import { Button } from "@/components/ui/button"
import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { useCart } from "@/lib/cart-context"

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCart()

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen">
          <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">Add some products to get started</p>
            <Button asChild size="lg" className="font-mono">
              <Link href="/shop">Shop All Products</Link>
            </Button>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pb-32">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Your Cart ({items.length} {items.length === 1 ? "item" : "items"})
          </h1>

          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="border-b border-border pb-6">
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <Link href={`/product/${item.id}`} className="font-medium hover:text-primary transition-colors">
                          {item.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="flex-shrink-0">
                        <XMarkIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <MinusIcon className="h-3 w-3" />
                        </Button>
                        <span className="w-10 text-center font-mono text-sm">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <PlusIcon className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="font-mono text-lg">${item.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <Button asChild size="lg" variant="outline" className="w-full font-mono bg-transparent">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </main>
      <CartFooter />
    </>
  )
}
