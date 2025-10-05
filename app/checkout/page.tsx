"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/lib/cart-context"
import { CheckoutProcessing } from "@/components/checkout-processing"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  // Form state
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [subscribeAndSave, setSubscribeAndSave] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [ambassadorCode, setAmbassadorCode] = useState("")

  const shipping = 0 // Free shipping
  const discount = promoCode ? subtotal * 0.1 : 0 // 10% discount if promo code applied
  const subscriptionDiscount = subscribeAndSave ? subtotal * 0.15 : 0 // 15% off for subscription
  const total = subtotal + shipping - discount - subscriptionDiscount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Generate order number
    const orderNumber = `ABBI-${Date.now().toString().slice(-8)}`

    // Navigate to order confirmation
    router.push(`/order-confirmation?orderNumber=${orderNumber}&total=${total.toFixed(2)}`)
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen">
          <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">Add some products to checkout</p>
            <Button asChild size="lg" className="font-mono">
              <Link href="/shop">Shop All Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (isProcessing) {
    return <CheckoutProcessing />
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Email Section */}
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold">Contact Information</h2>
                      {!showLogin && (
                        <Button
                          type="button"
                          variant="textLink"
                          className="font-mono text-sm"
                          onClick={() => setShowLogin(true)}
                        >
                          Already have an account? Log in
                        </Button>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <p className="text-xs text-muted-foreground">We'll send your order confirmation here</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Address */}
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h2 className="text-xl font-bold">Shipping Address</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        placeholder="123 Main St"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          placeholder="CA"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          placeholder="90210"
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h2 className="text-xl font-bold">Payment Details</h2>
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Subscribe & Save */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="subscribeAndSave"
                        checked={subscribeAndSave}
                        onChange={(e) => setSubscribeAndSave(e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                      />
                      <div className="flex-1">
                        <Label htmlFor="subscribeAndSave" className="cursor-pointer">
                          Subscribe & Save 15%
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Get your products delivered every 30 days and save 15% on every order. Cancel anytime.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Promo & Ambassador Codes */}
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="promoCode">Promo Code</Label>
                      <div className="flex gap-2">
                        <Input
                          id="promoCode"
                          placeholder="Enter promo code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <Button type="button" variant="outline" className="font-mono bg-transparent">
                          Apply
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ambassadorCode">Ambassador Code</Label>
                      <div className="flex gap-2">
                        <Input
                          id="ambassadorCode"
                          placeholder="Enter ambassador code"
                          value={ambassadorCode}
                          onChange={(e) => setAmbassadorCode(e.target.value)}
                        />
                        <Button type="button" variant="outline" className="font-mono bg-transparent">
                          Apply
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardContent className="p-6 space-y-4">
                    <h2 className="text-xl font-bold">Order Summary</h2>

                    {/* Cart Items */}
                    <div className="space-y-3 py-4 border-y border-border max-h-64 overflow-y-auto">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                            <p className="text-sm font-mono">${item.price * item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pricing Breakdown */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-mono">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="font-mono text-sm">Free</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Promo Discount</span>
                          <span className="font-mono">-${discount.toFixed(2)}</span>
                        </div>
                      )}
                      {subscriptionDiscount > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Subscribe & Save</span>
                          <span className="font-mono">-${subscriptionDiscount.toFixed(2)}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between text-lg font-bold pt-4 border-t border-border">
                      <span>Total</span>
                      <span className="font-mono">${total.toFixed(2)}</span>
                    </div>

                    <Button type="submit" size="lg" className="w-full font-mono">
                      Place Order
                    </Button>

                    <Button asChild size="lg" variant="outline" className="w-full font-mono bg-transparent">
                      <Link href="/cart">Back to Cart</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
