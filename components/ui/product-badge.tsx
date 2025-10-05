import type * as React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ProductBadgeProps extends React.ComponentProps<typeof Badge> {
  badgeType?: "recommended" | "category" | "trait"
}

export function ProductBadge({ badgeType = "trait", className, ...props }: ProductBadgeProps) {
  return (
    <Badge
      variant={badgeType === "recommended" ? "default" : badgeType === "category" ? "secondary" : "outline"}
      className={cn(
        "font-mono text-xs rounded-xs",
        badgeType === "recommended" && "bg-primary text-primary-foreground",
        className,
      )}
      {...props}
    />
  )
}
