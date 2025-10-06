import { cn } from "@/lib/utils"

interface UserAvatarProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function UserAvatar({ size = "md", className }: UserAvatarProps) {
  const sizeClasses = {
    sm: "size-6",
    md: "size-8",
    lg: "size-10",
  }

  return (
    <div className={cn("rounded-full bg-muted overflow-hidden", sizeClasses[size], className)}>
      <div className="w-full h-full bg-gradient-to-br from-primary to-[var(--evergreen)]" />
    </div>
  )
}
