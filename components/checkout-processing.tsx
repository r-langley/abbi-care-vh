"use client"

import { useEffect, useState } from "react"

export function CheckoutProcessing() {
  const [dots, setDots] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."))
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <div className="text-center space-y-6">
        {/* Animated Spinner */}
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 border-4 border-muted rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Processing Text */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Processing Your Order{dots}</h2>
          <p className="text-muted-foreground">Please wait while we confirm your payment</p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-md mx-auto space-y-3 pt-8">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-mono text-xs">
              ✓
            </div>
            <span className="text-muted-foreground">Validating payment information</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse"></div>
            </div>
            <span className="font-medium">Processing payment</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-6 h-6 rounded-full border-2 border-muted"></div>
            <span className="text-muted-foreground">Confirming order</span>
          </div>
        </div>
      </div>
    </div>
  )
}
