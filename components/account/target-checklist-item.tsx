import { Progress } from "@/components/ui/progress"

interface TargetChecklistItemProps {
  title: string
  subtitle: string
  progress: number
}

export function TargetChecklistItem({ title, subtitle, progress }: TargetChecklistItemProps) {
  return (
    <div className="flex flex-col gap-2 p-3 bg-muted rounded-md">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <span className="text-sm font-mono font-semibold text-accent-purple ml-2">{progress}%</span>
      </div>
      <Progress value={progress} className="h-1.5 rounded-full [&>div]:bg-accent-purple" />
    </div>
  )
}
