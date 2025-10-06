import { cn } from "@/lib/utils"

interface RecommendedBadgeProps {
  className?: string
  variant?: "default" | "compact"
}

export function RecommendedBadge({ className, variant = "default" }: RecommendedBadgeProps) {
  if (variant === "compact") {
    return (
      <div className={cn("bg-primary text-primary-foreground px-2.5 py-1.5 rounded-[4px]", className)}>
        <p className="font-semibold text-[12px]">Recommended</p>
      </div>
    )
  }

  return (
    <div className={cn("bg-primary text-primary-foreground px-1.5 rounded-xs py-0.5", className)}>
      <p className="font-semibold text-[12px]">Recommended</p>
    </div>
  )
}
