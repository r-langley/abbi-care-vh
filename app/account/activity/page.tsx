"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"

export default function ActivityPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-muted">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="sm" asChild>
              <Link href="/account">
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-2xl font-semibold">Recent Activity</h1>
          </div>

          <Card className="p-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle>All Activity</CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Type</th>
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Customer</th>
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Action</th>
                      <th className="text-right py-3 text-sm font-medium text-muted-foreground">Amount</th>
                      <th className="text-right py-3 text-sm font-medium text-muted-foreground">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { type: "Sale", customer: "Jessica Taylor", action: "New order", amount: "$124.50", date: "Dec 18, 2023 - 2:30 PM" },
                      { type: "Recruit", customer: "Mike Johnson", action: "Joined your team", amount: null, date: "Dec 17, 2023 - 10:15 AM" },
                      { type: "Sale", customer: "Amanda Rodriguez", action: "Reorder", amount: "$89.00", date: "Dec 16, 2023 - 4:20 PM" },
                      { type: "Sale", customer: "Michael Chen", action: "New order", amount: "$156.75", date: "Dec 15, 2023 - 11:45 AM" },
                      { type: "Sale", customer: "Sarah Williams", action: "Subscription renewal", amount: "$67.50", date: "Dec 14, 2023 - 9:00 AM" },
                      { type: "Recruit", customer: "Emma Thompson", action: "Joined your team", amount: null, date: "Dec 13, 2023 - 3:30 PM" },
                      { type: "Sale", customer: "David Lee", action: "New order", amount: "$203.25", date: "Dec 12, 2023 - 1:15 PM" },
                      { type: "Achievement", customer: "David Wilson", action: "Promoted to Silver", amount: null, date: "Dec 10, 2023 - 8:00 AM" },
                      { type: "Sale", customer: "Lisa Anderson", action: "Reorder", amount: "$112.00", date: "Dec 9, 2023 - 5:45 PM" },
                      { type: "Sale", customer: "Robert Martinez", action: "New order", amount: "$98.50", date: "Dec 8, 2023 - 2:00 PM" },
                    ].map((row, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="py-3">
                          <Badge variant={row.type === "Sale" ? "default" : "outline"}>{row.type}</Badge>
                        </td>
                        <td className="py-3 text-sm">{row.customer}</td>
                        <td className="py-3 text-sm text-muted-foreground">{row.action}</td>
                        <td className="py-3 text-sm font-mono text-right">{row.amount || "—"}</td>
                        <td className="py-3 text-sm text-muted-foreground text-right">{row.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
