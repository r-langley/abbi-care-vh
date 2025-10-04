import type * as React from "react"
import { cn } from "@/lib/utils"

interface SectionContainerProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "hero" | "muted"
  spacing?: "default" | "tight" | "loose"
}

export function SectionContainer({
  className,
  variant = "default",
  spacing = "default",
  ...props
}: SectionContainerProps) {
  return (
    <section
      className={cn(
        variant === "default" && "bg-background",
        variant === "hero" && "bg-background",
        variant === "muted" && "bg-muted/30",
        spacing === "tight" && "py-10 md:py-12",
        spacing === "default" && "py-16 md:py-20",
        spacing === "loose" && "py-20 md:py-24",
        className,
      )}
      {...props}
    />
  )
}
