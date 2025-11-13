"use client"

import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MinusIcon, PlusIcon, XMarkIcon, UserGroupIcon } from "@heroicons/react/24/solid"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    subtotal,
    subscriptionSavings,
    ambassadorCode,
    setAmbassadorCode,
    toggleSubscription,
    updateItemCustomer,
    customerGroups,
  } = useCart()

  const [customers, setCustomers] = useState<string[]>(["Customer 1", "Customer 2"])
  const [newCustomerName, setNewCustomerName] = useState("")
  const [showAddCustomer, setShowAddCustomer] = useState(false)

  const addCustomer = () => {
    if (newCustomerName.trim()) {
      setCustomers([...customers, newCustomerName.trim()])
      setNewCustomerName("")
      setShowAddCustomer(false)
    }
  }

  const finalTotal = subtotal - subscriptionSavings

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
      <main className="min-h-screen bg-muted">
        <div className="container mx-auto px-5 py-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Ambassador Code Section */}
              <Card className="border-[#586158]/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <UserGroupIcon className="h-5 w-5 text-[#586158]" />
                    <h3 className="font-medium text-sm">Ambassador Code</h3>
                  </div>
                  <Input
                    type="text"
                    placeholder="Enter ambassador code (optional)"
                    value={ambassadorCode}
                    onChange={(e) => setAmbassadorCode(e.target.value.toUpperCase())}
                    className="font-mono uppercase"
                  />
                  {ambassadorCode && (
                    <p className="text-xs text-[#34c759] mt-1">Ambassador code applied</p>
                  )}
                </CardContent>
              </Card>

              {/* Cart Items */}
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          loading="lazy"
                          sizes="96px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <Link
                              href={`/product/${item.id}`}
                              className="font-medium hover:text-[#586158] transition-colors"
                            >
                              {item.name}
                            </Link>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="flex-shrink-0"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between mb-3">
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
                          <div className="text-right">
                            <p className="font-mono text-lg">${item.price * item.quantity}</p>
                            {item.isSubscription && (
                              <p className="text-xs text-[#34c759] font-mono">
                                -${(item.price * item.quantity * 0.15).toFixed(2)} saved
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Subscription Toggle */}
                        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border">
                          <Checkbox
                            id={`subscribe-${item.id}`}
                            checked={item.isSubscription}
                            onCheckedChange={() => toggleSubscription(item.id)}
                          />
                          <label
                            htmlFor={`subscribe-${item.id}`}
                            className="text-sm font-medium cursor-pointer select-none"
                          >
                            Subscribe & Save 15%
                          </label>
                        </div>

                        {/* Customer Assignment */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground whitespace-nowrap">Assign to:</span>
                          <Select
                            value={item.customerId || "none"}
                            onValueChange={(value) => updateItemCustomer(item.id, value === "none" ? undefined : value)}
                          >
                            <SelectTrigger className="h-7 text-xs">
                              <SelectValue placeholder="No assignment" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">No assignment</SelectItem>
                              {customers.map((customer) => (
                                <SelectItem key={customer} value={customer}>
                                  {customer}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Add Customer Button */}
              {showAddCustomer ? (
                <Card className="border-dashed">
                  <CardContent className="p-4">
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Enter customer name"
                        value={newCustomerName}
                        onChange={(e) => setNewCustomerName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addCustomer()}
                        className="flex-1"
                      />
                      <Button size="sm" onClick={addCustomer} className="bg-[#586158]">
                        Add
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setShowAddCustomer(false)}>
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddCustomer(true)}
                  className="w-full border-dashed"
                >
                  <UserGroupIcon className="h-4 w-4 mr-2" />
                  Add Another Customer
                </Button>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-bold">Order Summary</h2>

                  {/* Split Order Breakdown */}
                  {customerGroups.size > 1 && (
                    <div className="space-y-2 pb-4 border-b border-border">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Split Order</h3>
                      {Array.from(customerGroups.entries()).map(([customerId, customerItems]) => {
                        const customerSubtotal = customerItems.reduce(
                          (sum, item) => sum + item.price * item.quantity,
                          0,
                        )
                        const customerSavings = customerItems
                          .filter((item) => item.isSubscription)
                          .reduce((sum, item) => sum + item.price * item.quantity * 0.15, 0)
                        return (
                          <div key={customerId || "unassigned"} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {customerId || "Unassigned"} ({customerItems.length})
                            </span>
                            <span className="font-mono">${(customerSubtotal - customerSavings).toFixed(2)}</span>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  <div className="space-y-2 py-4 border-y border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-mono">${subtotal.toFixed(2)}</span>
                    </div>
                    {subscriptionSavings > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[#34c759]">Subscription Savings (15%)</span>
                        <span className="font-mono text-[#34c759]">-${subscriptionSavings.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-mono text-sm">Calculated at checkout</span>
                    </div>
                    {ambassadorCode && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[#586158]">Ambassador Code</span>
                        <span className="font-mono text-xs text-[#586158]">{ambassadorCode}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
<<<<<<< HEAD
                    <span className="font-mono">${subtotal.toFixed(2)}</span>
                  </div>
                  <Button asChild size="lg" className="w-full font-mono">
                    <Link href="/checkout">Proceed to Checkout</Link>
=======
                    <span className="font-mono">${finalTotal.toFixed(2)}</span>
                  </div>
                  <Button size="lg" className="w-full font-mono bg-[#586158] hover:bg-[#586158]/90">
                    Proceed to Checkout
>>>>>>> 06490c8 (feat: add multi-customer shopping, subscriptions, and ambassador code to cart)
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full font-mono bg-transparent">
                    <Link href="/shop">Continue Shopping</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
