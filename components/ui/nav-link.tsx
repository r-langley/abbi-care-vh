import type * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface NavLinkProps extends React.ComponentProps<typeof Link> {
  variant?: "header" | "footer" | "mobile"
}

export function NavLink({ className, variant = "header", ...props }: NavLinkProps) {
  return (
    <Link
      className={cn(
        "transition-colors",
        variant === "header" && "text-sm hover:text-primary",
        variant === "footer" && "text-sm text-muted-foreground hover:text-foreground",
        variant === "mobile" && "text-lg hover:text-primary",
        className,
      )}
      {...props}
    />
  )
}
