import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline"

interface TargetChecklistItemProps {
  title: string
  subtitle: string
  achieved: boolean
}

export function TargetChecklistItem({ title, subtitle, achieved }: TargetChecklistItemProps) {
  return (
    <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
      {achieved ? (
        <CheckCircleIcon className="w-6 h-6 text-accent-purple flex-shrink-0" />
      ) : (
        <XCircleIcon className="w-6 h-6 text-muted-foreground flex-shrink-0" />
      )}
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  )
}
