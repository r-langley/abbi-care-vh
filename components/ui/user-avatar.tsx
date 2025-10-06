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
    <div className={cn("rounded-full bg-[#f5f6f5] overflow-hidden", sizeClasses[size], className)}>
      <div className="w-full h-full bg-gradient-to-br from-[#586158] to-[#3e463e]" />
    </div>
  )
}
