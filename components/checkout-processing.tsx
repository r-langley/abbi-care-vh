"use client"

import { useEffect, useState } from "react"

export function CheckoutProcessing() {
  const [dots, setDots] = useState("")
  const [step, setStep] = useState(1)

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."))
    }, 500)

    const stepInterval = setInterval(() => {
      setStep((prev) => (prev < 3 ? prev + 1 : prev))
    }, 1000)

    return () => {
      clearInterval(dotsInterval)
      clearInterval(stepInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <div className="text-center space-y-6 px-4">
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
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs ${
                step >= 1 ? "bg-primary text-primary-foreground" : "border-2 border-muted"
              }`}
            >
              {step >= 1 && "✓"}
            </div>
            <span className={step >= 1 ? "font-medium" : "text-muted-foreground"}>Validating payment information</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                step >= 2 ? "bg-primary" : "border-2 border-muted"
              }`}
            >
              {step >= 2 && <div className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse"></div>}
            </div>
            <span className={step >= 2 ? "font-medium" : "text-muted-foreground"}>Processing payment</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                step >= 3 ? "bg-primary" : "border-2 border-muted"
              }`}
            >
              {step >= 3 && <div className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse"></div>}
            </div>
            <span className={step >= 3 ? "font-medium" : "text-muted-foreground"}>Confirming order</span>
          </div>
        </div>
      </div>
    </div>
  )
}
