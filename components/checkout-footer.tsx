"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CheckoutFooterProps {
  onSubmit: () => void
  total: number
  isProcessing?: boolean
  isFormComplete?: boolean
  missingFields?: string[]
  className?: string
}

export function CheckoutFooter({
  onSubmit,
  total,
  isProcessing = false,
  isFormComplete = false,
  missingFields = [],
  className,
}: CheckoutFooterProps) {
  const getButtonText = () => {
    if (isProcessing) return "PROCESSING..."
    if (isFormComplete) return `PAY $${total.toFixed(2)}`
    return "COMPLETE REQUIRED FIELDS"
  }

  const getHeadingText = () => {
    if (isFormComplete) return "Ready to complete your order?"
    if (missingFields.length > 0) {
      const fieldNames = missingFields.join(", ")
      return `Please complete: ${fieldNames}`
    }
    return "Please fill in all required fields"
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 border-t shadow-lg",
        "bg-[var(--cart-footer-border)]",
        className,
      )}
    >
      <div
        className={cn(
          "container mx-auto bg-[var(--cart-footer-bg)]",
          "px-[var(--cart-footer-padding)] py-[var(--cart-footer-padding)]",
        )}
      >
        <div className={cn("flex flex-col items-center", "gap-[var(--cart-footer-gap)]")}>
          <h3
            className={cn(
              "font-medium text-center text-[var(--cart-footer-text)]",
              "text-[length:var(--cart-footer-heading-size)]",
            )}
          >
            {getHeadingText()}
          </h3>
          <Button
            onClick={onSubmit}
            disabled={isProcessing || !isFormComplete}
            size="lg"
            className={cn(
              "w-full max-w-2xl font-medium font-mono py-6",
              "bg-[var(--cart-footer-button-bg)] text-[var(--cart-footer-button-text)]",
              "hover:bg-[var(--cart-footer-button-hover-bg)]/90",
              "text-[length:var(--cart-footer-button-size)]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          >
            {getButtonText()}
          </Button>
        </div>
      </div>
    </div>
  )
}
