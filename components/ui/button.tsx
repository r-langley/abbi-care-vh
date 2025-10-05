import type * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-[#586158] text-[#f5f6f5] hover:opacity-90 rounded-[8px] font-semibold",
        destructive:
          "bg-[var(--button-destructive-bg)] text-[var(--button-destructive-text)] hover:opacity-90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 rounded-[8px]",
        outline:
          "border border-[#586158] bg-transparent text-[#586158] hover:bg-[#586158] hover:text-[#f5f6f5] rounded-[8px] font-semibold",
        secondary:
          "bg-[#f5f6f5] text-[#586158] hover:opacity-80 rounded-[8px] font-semibold",
        ghost:
          "hover:bg-[#f5f6f5] hover:text-[#586158] rounded-[8px]",
        link: 
          "text-[#586158] underline-offset-4 hover:underline font-medium",
        textLink:
          "inline font-large text-[#586158] underline underline-offset-4 decoration-2 decoration-[#586158]/40 hover:decoration-[#586158] transition-colors px-0 py-0 h-auto rounded-none justify-start",
      },
      size: {
        default:
          "h-[40px] px-[16px] py-[8px] text-[12px]",
        sm: 
          "h-[32px] px-[12px] py-[6px] text-[12px]",
        lg: 
          "h-[40px] px-[20px] py-[10px] text-[14px]",
        icon: 
          "size-[40px] rounded-[8px]",
        "icon-sm": 
          "size-[32px] rounded-[8px]",
        "icon-lg": 
          "size-[48px] rounded-[8px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
