"use client"

import { useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { CheckCircleIcon } from "@heroicons/react/24/solid"

function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const { items, clearCart, subtotal } = useCart()
  const orderNumber = searchParams.get("orderNumber") || "ABBI-00000000"
  const total = searchParams.get("total") || subtotal.toFixed(2)

  useEffect(() => {
    // Clear cart after successful order
    if (items.length > 0) {
      clearCart()
    }
  }, [items.length, clearCart])

  return (
    <>
      <Header />
      <main className="min-h-screen pb-24">
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          {/* Success Message */}
          <div className="text-center mb-12 pb-8 border-b border-border">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Order Placed Successfully!</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Thank you for your purchase. Your order has been confirmed and will be shipped soon.
            </p>
            <div className="inline-block bg-muted px-6 py-3 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Order Number</p>
              <p className="text-2xl font-mono font-bold">{orderNumber}</p>
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-6 mb-12 pb-8 border-b border-border">
            <h2 className="text-xl font-bold">Order Details</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-3 border-b border-border last:border-0">
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-mono">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-mono">Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                <span>Total</span>
                <span className="font-mono">${total}</span>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-4">What's Next?</h2>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-mono text-sm flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-medium">Order Confirmation Email</p>
                  <p className="text-sm text-muted-foreground">
                    You'll receive a confirmation email with your order details shortly.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-mono text-sm flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-medium">Processing & Shipping</p>
                  <p className="text-sm text-muted-foreground">
                    Your order will be processed within 1-2 business days and shipped to your address.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-mono text-sm flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-medium">Tracking Information</p>
                  <p className="text-sm text-muted-foreground">
                    Once shipped, you'll receive tracking information to monitor your delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="flex-1 font-mono">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="flex-1 font-mono bg-transparent">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  )
}
