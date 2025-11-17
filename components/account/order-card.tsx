import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface OrderCardProps {
  name: string
  date: string
  price: string
  onViewDetails?: () => void
}

export function OrderCard({ name, date, price, onViewDetails }: OrderCardProps) {
  return (
    <Card className="p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex-1">
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="font-mono">{price}</p>
          <Button variant="outline" size="sm" onClick={onViewDetails}>
            View Details
          </Button>
        </div>
      </div>
    </Card>
  )
}
