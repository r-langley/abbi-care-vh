import Link from "next/link"
import { Card } from "@/components/ui/card"

interface StatCardProps {
  label: string
  value: string
  icon: React.ReactNode
  href: string
}

export function StatCard({ label, value, icon, href }: StatCardProps) {
  return (
    <Link href={href}>
      <Card className="p-4 sm:p-6 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{label}</p>
            <p className="text-2xl font-semibold font-mono">{value}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            {icon}
          </div>
        </div>
      </Card>
    </Link>
  )
}
