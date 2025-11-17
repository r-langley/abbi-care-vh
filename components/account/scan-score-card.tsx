import { Card } from "@/components/ui/card"

interface ScanScoreCardProps {
  label: string
  date: string
  score: number
  maxScore?: number
}

export function ScanScoreCard({ label, date, score, maxScore = 10 }: ScanScoreCardProps) {
  return (
    <Card className="p-4 sm:p-6">
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="font-medium mb-2">{date}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-semibold">{score}</span>
        <span className="text-sm text-muted-foreground">/ {maxScore}</span>
      </div>
    </Card>
  )
}
