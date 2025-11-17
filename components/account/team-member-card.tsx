import { Badge } from "@/components/ui/badge"
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline"

interface TeamMemberCardProps {
  name: string
  level: string
  sales: string
  trend: "up" | "down"
}

export function TeamMemberCard({ name, level, sales, trend }: TeamMemberCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <div className="flex items-center justify-between py-2 border-b last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
          {initials}
        </div>
        <div>
          <p className="font-medium text-sm">{name}</p>
          <Badge variant="outline" className="text-xs">
            {level}
          </Badge>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p className="font-mono text-sm">{sales}</p>
        {trend === "up" ? (
          <ArrowUpIcon className="w-4 h-4 text-accent-purple" />
        ) : (
          <ArrowDownIcon className="w-4 h-4 text-muted-foreground" />
        )}
      </div>
    </div>
  )
}
