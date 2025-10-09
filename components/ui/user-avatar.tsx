import Image from "next/image"
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
      <Image
        src="/images/sarah-avatar.jpg"
        alt="Sarah Miller"
        width={80}
        height={80}
        className="w-full h-full object-cover"
      />
    </div>
  )
}
