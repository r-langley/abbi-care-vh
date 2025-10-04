import type * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--button-default-bg)] text-[var(--button-default-text)] hover:opacity-[var(--button-default-hover-opacity)] transition-[var(--button-transition)]",
        destructive:
          "bg-[var(--button-destructive-bg)] text-[var(--button-destructive-text)] hover:opacity-[var(--button-destructive-hover-opacity)] focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 transition-[var(--button-transition)]",
        outline:
          "border bg-[var(--button-outline-bg)] shadow-xs hover:bg-[var(--button-outline-hover-bg)] hover:text-[var(--button-outline-hover-text)] dark:bg-input/30 dark:border-input dark:hover:bg-input/50 transition-[var(--button-transition)]",
        secondary:
          "bg-[var(--button-secondary-bg)] text-[var(--button-secondary-text)] hover:opacity-[var(--button-secondary-hover-opacity)] transition-[var(--button-transition)]",
        ghost:
          "hover:bg-[var(--button-ghost-hover-bg)] hover:text-[var(--button-ghost-hover-text)] dark:hover:bg-accent/50 transition-[var(--button-transition)]",
        link: "text-primary underline-offset-4 hover:underline",
        textLink:
          "inline font-mono text-foreground underline underline-offset-4 decoration-1 decoration-foreground/40 hover:decoration-foreground transition-colors px-0 py-0 h-auto rounded-none justify-start",
      },
      size: {
        default:
          "h-[var(--button-height-default)] px-[var(--button-padding-x-default)] py-[var(--button-padding-y)] has-[>svg]:px-3 rounded-[var(--button-border-radius)]",
        sm: "h-[var(--button-height-sm)] px-[var(--button-padding-x-sm)] gap-1.5 has-[>svg]:px-2.5 rounded-[var(--button-border-radius)]",
        lg: "h-[var(--button-height-lg)] px-[var(--button-padding-x-lg)] has-[>svg]:px-4 rounded-[var(--button-border-radius)]",
        icon: "size-[var(--button-height-icon)] rounded-[var(--button-border-radius)]",
        "icon-sm": "size-[var(--button-height-icon-sm)] rounded-[var(--button-border-radius)]",
        "icon-lg": "size-[var(--button-height-icon-lg)] rounded-[var(--button-border-radius)]",
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
