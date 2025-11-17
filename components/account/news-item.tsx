import { Badge } from "@/components/ui/badge"

interface NewsItemProps {
  type: string
  title: string
  date: string
  unread: boolean
  onClick?: () => void
}

export function NewsItem({ type, title, date, unread, onClick }: NewsItemProps) {
  return (
    <div
      className="flex items-center justify-between py-3 px-4 bg-muted rounded-md hover:bg-muted/70 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {unread && <div className="w-2 h-2 rounded-full bg-accent-purple" />}
        <div>
          <p className={`text-sm ${unread ? "font-semibold" : "font-medium"}`}>{title}</p>
          <p className="text-xs text-muted-foreground">{date}</p>
        </div>
      </div>
      <Badge variant="outline" className="text-xs">
        {type}
      </Badge>
    </div>
  )
}
