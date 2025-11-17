"use client"

import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MinusIcon, PlusIcon, TrashIcon, UserGroupIcon } from "@heroicons/react/24/solid"
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
  const [discountCode, setDiscountCode] = useState("")
  const [ambassadorName, setAmbassadorName] = useState("")

  const addCustomer = () => {
    if (newCustomerName.trim()) {
      setCustomers([...customers, newCustomerName.trim()])
      setNewCustomerName("")
      setShowAddCustomer(false)
    }
  }

  const handleAmbassadorCodeChange = (code: string) => {
    const upperCode = code.toUpperCase()
    setAmbassadorCode(upperCode)
    // Mock validation - in real app this would be an API call
    if (upperCode === "JENNIFER10" || upperCode.length >= 6) {
      setAmbassadorName("Jennifer Davis")
    } else {
      setAmbassadorName("")
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
            <Button asChild size="lg">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <UserGroupIcon className="h-5 w-5 text-primary" />
                    <h3 className="font-medium text-sm">Ambassador Code</h3>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Enter ambassador code (optional)"
                      value={ambassadorCode}
                      onChange={(e) => handleAmbassadorCodeChange(e.target.value)}
                      className="font-mono uppercase flex-1"
                      aria-describedby="ambassador-code-requirement"
                    />
                    <Button
                      size="sm"
                      disabled={!ambassadorCode || ambassadorCode.length < 6}
                      aria-label="Apply ambassador code"
                    >
                      Apply
                    </Button>
                    <span id="ambassador-code-requirement" className="sr-only">
                      Ambassador code must be at least 6 characters
                    </span>
                  </div>
                  {ambassadorName && (
                    <p className="text-xs text-accent-purple mt-1">
                      Shopping with {ambassadorName}
                    </p>
                  )}
                </CardContent>
              </Card>

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
                      <Button size="sm" onClick={addCustomer}>
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
                  variant="default"
                  size="default"
                  onClick={() => setShowAddCustomer(true)}
                  className="w-full"
                >
                  <UserGroupIcon className="h-5 w-5 mr-2" />
                  Add Another Customer
                </Button>
              )}

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
                    <div key={customerId || "my-cart"} className="space-y-4">
                      {/* Customer Header */}
                      <div className="flex items-center justify-between rounded-md border border-border px-0 py-0 border-none bg-transparent">
                        <h3 className="text-lg font-semibold text-foreground">{customerId || "My Cart"}</h3>
                        <span className="font-mono text-card-foreground text-lg font-normal">
                          ${(customerSubtotal - customerSavings).toFixed(2)}
                        </span>
                      </div>

                      {/* Customer Items */}
                      {customerItems.map((item) => (
                        <Card key={item.id}>
                          <CardContent className="p-4">
                            <div className="flex gap-4 items-stretch flex-row">
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
                                      className="font-medium hover:text-primary transition-colors text-lg"
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
                                    aria-label={`Remove ${item.name} from cart`}
                                  >
                                    <TrashIcon className="h-4 w-4" />
                                  </Button>
                                </div>

                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center border border-border rounded-md">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                      aria-label="Decrease quantity"
                                    >
                                      <MinusIcon className="h-3 w-3" />
                                    </Button>
                                    <span className="w-10 text-center font-mono text-sm" aria-live="polite">{item.quantity}</span>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                      aria-label="Increase quantity"
                                    >
                                      <PlusIcon className="h-3 w-3" />
                                    </Button>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-mono text-lg">${item.price * item.quantity}</p>
                                    {item.isSubscription && (
                                      <p className="text-xs text-accent-purple font-mono">
                                        -${(item.price * item.quantity * 0.05).toFixed(2)} saved
                                      </p>
                                    )}
                                  </div>
                                </div>

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
                                    Subscribe & Save 5%
                                  </label>
                                </div>

                                <div className="flex items-center gap-2">
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
                    </div>
                  )
                })
              ) : (
                // Single customer or no grouping - show all items
                items.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4 items-stretch flex-row">
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
                                className="font-medium hover:text-primary transition-colors text-lg"
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
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center border border-border rounded-md">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                aria-label="Decrease quantity"
                              >
                                <MinusIcon className="h-3 w-3" />
                              </Button>
                              <span className="w-10 text-center font-mono text-sm" aria-live="polite">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                aria-label="Increase quantity"
                              >
                                <PlusIcon className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <p className="font-mono text-lg">${item.price * item.quantity}</p>
                              {item.isSubscription && (
                                <p className="text-xs text-accent-purple font-mono">
                                  -${(item.price * item.quantity * 0.05).toFixed(2)} saved
                                </p>
                              )}
                            </div>
                          </div>

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
                              Subscribe & Save 5%
                            </label>
                          </div>

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
                ))
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="mb-4 border-accent-purple/20 bg-accent-purple/5">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-purple/10 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-accent-purple"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1">Subscribe & Save 5%</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Get automatic deliveries and save on every order. Cancel anytime, no commitment required.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t border-accent-purple/10">
                      <svg
                        className="w-4 h-4 text-accent-purple flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-xs text-muted-foreground">Free shipping on subscription orders</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-4">
                  <div className="pb-4 border-b border-border">
                    <h3 className="font-medium text-sm mb-2">Discount Code</h3>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Enter code"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                        className="font-mono uppercase flex-1"
                      />
                      <Button size="sm" variant="default">
                        Apply
                      </Button>
                    </div>
                    {discountCode && (
                      <p className="text-xs text-accent-purple mt-1">Discount applied</p>
                    )}
                  </div>

                  <h2 className="text-xl font-bold">Order Summary</h2>

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
                          .reduce((sum, item) => sum + item.price * item.quantity * 0.05, 0)
                        return (
                          <div key={customerId || "my-cart"} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {customerId || "My Cart"} ({customerItems.length})
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
                        <span className="text-accent-purple">Subscription Savings (5%)</span>
                        <span className="font-mono text-accent-purple">-${subscriptionSavings.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-mono text-sm">Calculated at checkout</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="font-mono">${finalTotal.toFixed(2)}</span>
                  </div>
                  <Button asChild size="lg" className="w-full">
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full bg-transparent">
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
