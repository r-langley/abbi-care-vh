interface ActivityItemProps {
  customer: string
  action: string
  amount?: string | null
  time: string
}

export function ActivityItem({ customer, action, amount, time }: ActivityItemProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-0">
      <div className="flex-1">
        <p className="font-medium text-sm">{customer}</p>
        <p className="text-xs text-muted-foreground">{action}</p>
      </div>
      <div className="text-right">
        {amount && <p className="font-mono text-sm">{amount}</p>}
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  )
}
