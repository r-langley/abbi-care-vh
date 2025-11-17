"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormField } from "@/components/form-field"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, subscriptionSavings, clearCart, customerGroups } = useCart()
  const { userInfo } = useAuth()
  const [formData, setFormData] = useState({
    email: userInfo?.email || "",
    firstName: userInfo?.firstName || "",
    lastName: userInfo?.lastName || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: `${userInfo?.firstName || ""} ${userInfo?.lastName || ""}`.trim(),
  })
  const [isProcessing, setIsProcessing] = useState(false)

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-muted">
          <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">Add some products to checkout</p>
            <Button asChild size="lg" className="font-mono">
              <Link href="/shop">Shop All Products</Link>
            </Button>
          </div>
        </main>
      </>
    )
  }

  const shipping = 9.99
  const tax = subtotal * 0.08
  const finalTotal = subtotal - subscriptionSavings + shipping + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const orderData = {
      orderNumber: `ORD-${Date.now()}`,
      items,
      subtotal,
      subscriptionSavings,
      shipping,
      tax,
      total: finalTotal,
      shippingAddress: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
      },
      email: formData.email,
      date: new Date().toISOString(),
    }

    localStorage.setItem("lastOrder", JSON.stringify(orderData))
    clearCart()
    router.push("/order-confirmation")
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-muted">
        <div className="container mx-auto px-5 py-5 max-w-[1200px]">
          <h1 className="text-2xl sm:text-3xl mb-6 font-semibold">Checkout</h1>

          <form onSubmit={handlePlaceOrder}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Checkout Forms */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      label="Email"
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="sarah.miller@example.com"
                    />
                  </CardContent>
                </Card>

                {/* Shipping Address */}
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        label="First Name"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                      <FormField
                        label="Last Name"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <FormField
                      label="Address"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      placeholder="123 Main St"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        label="City"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                      <FormField
                        label="State"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        label="ZIP Code"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                      <div className="flex flex-col gap-2">
                        <FormField
                          label="Country"
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={(value) => setFormData({ ...formData, country: value })}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      label="Card Number"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <FormField
                          label="Expiry Date"
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          required
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      <FormField
                        label="CVV"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                    <FormField
                      label="Name on Card"
                      id="nameOnCard"
                      name="nameOnCard"
                      value={formData.nameOnCard}
                      onChange={handleInputChange}
                      required
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4 max-h-[400px] overflow-y-auto">
                      {customerGroups.size > 1 ? (
                        // Multiple customers - show grouped
                        Array.from(customerGroups.entries()).map(([customerId, customerItems]) => {
                          const customerSubtotal = customerItems.reduce(
                            (sum, item) => sum + item.price * item.quantity,
                            0,
                          )
                          const customerSavings = customerItems
                            .filter((item) => item.isSubscription)
                            .reduce((sum, item) => sum + item.price * item.quantity * 0.05, 0)
                          
                          return (
                            <div key={customerId || "unassigned"} className="space-y-3">
                              <div className="flex items-center justify-between px-3 py-1.5 bg-muted rounded-md border border-border">
                                <h4 className="font-medium text-xs">{customerId || "Unassigned"}</h4>
                                <span className="text-xs font-mono">
                                  ${(customerSubtotal - customerSavings).toFixed(2)}
                                </span>
                              </div>
                              {customerItems.map((item) => (
                                <div key={item.id} className="flex gap-3 pl-3">
                                  <div className="relative w-12 h-12 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                                    <Image
                                      src={item.image || "/placeholder.svg"}
                                      alt={item.name}
                                      fill
                                      className="object-cover"
                                      sizes="48px"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium truncate">{item.name}</p>
                                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                    <p className="text-xs font-mono">${(item.price * item.quantity).toFixed(2)}</p>
                                    {item.isSubscription && (
                                      <p className="text-xs text-[#34c759] font-mono">
                                        -${(item.price * item.quantity * 0.05).toFixed(2)} saved
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )
                        })
                      ) : (
                        // Single customer - show all items
                        items.map((item) => (
                          <div key={item.id} className="flex gap-3">
                            <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                                sizes="64px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{item.name}</p>
                              <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                              <p className="text-sm font-mono">${(item.price * item.quantity).toFixed(2)}</p>
                              {item.isSubscription && (
                                <p className="text-xs text-[#34c759] font-mono">
                                  -${(item.price * item.quantity * 0.05).toFixed(2)} saved
                                </p>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-2 py-4 border-y border-border">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-mono">${subtotal.toFixed(2)}</span>
                      </div>
                      {subscriptionSavings > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-[#34c759]">Subscription Savings (5%)</span>
                          <span className="font-mono text-[#34c759]">-${subscriptionSavings.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="font-mono">${shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax</span>
                        <span className="font-mono">${tax.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="font-mono">${finalTotal.toFixed(2)}</span>
                    </div>

                    <Button type="submit" size="lg" className="w-full font-mono" disabled={isProcessing}>
                      {isProcessing ? "Processing..." : "Place Order"}
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
    </>
  )
}
