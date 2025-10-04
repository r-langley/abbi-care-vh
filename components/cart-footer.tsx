"use client"

import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface CartFooterProps {
  headingText?: string
  buttonText?: string
  className?: string
  headingClassName?: string
  buttonClassName?: string
  containerClassName?: string
}

export function CartFooter({
  headingText = "Review your Routine",
  buttonText = "PAY",
  className,
  headingClassName,
  buttonClassName,
  containerClassName,
}: CartFooterProps = {}) {
  const { totalItems, subtotal } = useCart()

  if (totalItems === 0) {
    return null
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
          containerClassName,
        )}
      >
        <div className={cn("flex flex-col items-center", "gap-[var(--cart-footer-gap)]")}>
          <h3
            className={cn(
              "font-medium text-center text-[var(--cart-footer-text)]",
              "text-[length:var(--cart-footer-heading-size)]",
              headingClassName,
            )}
          >
            {headingText}
          </h3>
          <Link href="/cart" className="w-full max-w-2xl">
            <Button
              size="lg"
              className={cn(
                "w-full font-medium py-6",
                "bg-[var(--cart-footer-button-bg)] text-[var(--cart-footer-button-text)]",
                "hover:bg-[var(--cart-footer-button-hover-bg)]/90",
                "text-[length:var(--cart-footer-button-size)]",
                buttonClassName,
              )}
            >
              {buttonText} ${subtotal}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
