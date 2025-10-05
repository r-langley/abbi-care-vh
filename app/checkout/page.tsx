"use client"
import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/lib/cart-context"
import { CheckoutProcessing } from "@/components/checkout-processing"
import { CheckoutFooter } from "@/components/checkout-footer"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)

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

  const isFormComplete = useMemo(() => {
    return (
      email.trim() !== "" &&
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      address.trim() !== "" &&
      city.trim() !== "" &&
      state.trim() !== "" &&
      zipCode.trim() !== "" &&
      cardNumber.trim() !== "" &&
      expiryDate.trim() !== "" &&
      cvv.trim() !== ""
    )
  }, [email, firstName, lastName, address, city, state, zipCode, cardNumber, expiryDate, cvv])

  const missingFields = useMemo(() => {
    const fields = []
    if (!email.trim()) fields.push("email")
    if (!firstName.trim() || !lastName.trim()) fields.push("name")
    if (!address.trim() || !city.trim() || !state.trim() || !zipCode.trim()) fields.push("address")
    if (!cardNumber.trim() || !expiryDate.trim() || !cvv.trim()) fields.push("payment")
    return fields
  }, [email, firstName, lastName, address, city, state, zipCode, cardNumber, expiryDate, cvv])

  const handleSubmit = async () => {
    if (!isFormComplete) return

    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Generate order number
    const orderNumber = `ABBI-${Date.now().toString().slice(-8)}`

    // Navigate to order confirmation
    router.push(`/order-confirmation?orderNumber=${orderNumber}&total=${total.toFixed(2)}`)
  }

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  if (isProcessing) {
    return <CheckoutProcessing />
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pb-32">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Checkout</h1>

          <div className="space-y-8">
            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Contact Information</h2>
                <Link
                  href="/login"
                  className="text-sm font-mono underline decoration-[var(--text-link-decoration-color)] underline-offset-4 hover:decoration-[var(--text-link-decoration-hover-color)]"
                >
                  Already have an account? Log in
                </Link>
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
            </div>

            {/* Shipping Address */}
            <div className="space-y-4 pt-6 border-t border-border">
              <h2 className="text-xl font-bold">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
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
            </div>

            {/* Payment Details */}
            <div className="space-y-4 pt-6 border-t border-border">
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
                  <Input id="cvv" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
                </div>
              </div>
            </div>

            {/* Subscribe & Save */}
            <div className="pt-6 border-t border-border">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="subscribeAndSave"
                  checked={subscribeAndSave}
                  onChange={(e) => setSubscribeAndSave(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                <div className="flex-1">
                  <Label htmlFor="subscribeAndSave" className="cursor-pointer font-bold">
                    Subscribe & Save 15%
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Get your products delivered every 30 days and save 15% on every order. Cancel anytime.
                  </p>
                </div>
              </div>
            </div>

            {/* Promo & Ambassador Codes */}
            <div className="space-y-4 pt-6 border-t border-border">
              <div className="space-y-2">
                <Label htmlFor="promoCode">Promo Code</Label>
                <Input
                  id="promoCode"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ambassadorCode">Ambassador Code</Label>
                <Input
                  id="ambassadorCode"
                  placeholder="Enter ambassador code"
                  value={ambassadorCode}
                  onChange={(e) => setAmbassadorCode(e.target.value)}
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-3 pt-6 border-t border-border">
              <h2 className="text-xl font-bold">Order Summary</h2>
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
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="font-mono">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <CheckoutFooter
        onSubmit={handleSubmit}
        total={total}
        isProcessing={isProcessing}
        isFormComplete={isFormComplete}
        missingFields={missingFields}
      />
    </>
  )
}
