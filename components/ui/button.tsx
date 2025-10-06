import type * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:opacity-90 rounded-[8px] font-semibold",
        destructive:
          "bg-[var(--button-destructive-bg)] text-[var(--button-destructive-text)] hover:opacity-90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 rounded-[8px]",
        outline:
          "border border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground rounded-[8px] font-semibold",
        secondary: "bg-accent text-accent-foreground hover:opacity-80 rounded-[8px] font-semibold",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded-[8px]",
        link: "text-primary underline-offset-4 hover:underline font-medium px-0 py-0 h-auto rounded-none",
        textLink:
          "!inline text-primary underline underline-offset-4 decoration-2 decoration-primary/40 hover:decoration-primary transition-colors !p-0 !h-auto rounded-none",
      },
      size: {
        default: "h-[40px] px-[16px] py-[8px] text-[12px]",
        sm: "h-[32px] px-[12px] py-[6px] text-[12px]",
        lg: "h-[40px] px-[20px] py-[10px] text-[14px]",
        icon: "size-[40px] rounded-[8px]",
        "icon-sm": "size-[32px] rounded-[8px]",
        "icon-lg": "size-[48px] rounded-[8px]",
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
