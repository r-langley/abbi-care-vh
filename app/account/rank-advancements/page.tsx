"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"

export default function RankAdvancementsPage() {
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
            <h1 className="text-2xl font-semibold">Rank Advancements</h1>
          </div>

          <Card className="p-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle>All Rank Advancements</CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Name</th>
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Previous Rank</th>
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">New Rank</th>
                      <th className="text-right py-3 text-sm font-medium text-muted-foreground">Volume at Time</th>
                      <th className="text-right py-3 text-sm font-medium text-muted-foreground">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Lisa Anderson", prev: "Member", new: "Bronze", volume: "$1,240", date: "Dec 15, 2023" },
                      { name: "David Wilson", prev: "Bronze", new: "Silver", volume: "$2,680", date: "Dec 10, 2023" },
                      { name: "Emma Thompson", prev: "Member", new: "Bronze", volume: "$1,120", date: "Dec 5, 2023" },
                      { name: "Mike Johnson", prev: "Member", new: "Bronze", volume: "$1,050", date: "Nov 28, 2023" },
                      { name: "Robert Chen", prev: "Member", new: "Bronze", volume: "$1,345", date: "Nov 15, 2023" },
                      { name: "Sarah Williams", prev: "Member", new: "Bronze", volume: "$1,180", date: "Oct 30, 2023" },
                      { name: "Sarah Miller", prev: "Silver", new: "Gold", volume: "$5,240", date: "Oct 15, 2023" },
                      { name: "James Martinez", prev: "Member", new: "Bronze", volume: "$1,090", date: "Sep 22, 2023" },
                      { name: "Sarah Miller", prev: "Bronze", new: "Silver", volume: "$2,680", date: "Aug 3, 2023" },
                      { name: "David Wilson", prev: "Member", new: "Bronze", volume: "$1,120", date: "Jul 18, 2023" },
                    ].map((row, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="py-3 text-sm">{row.name}</td>
                        <td className="py-3">
                          <Badge variant="outline" className="text-xs">
                            {row.prev}
                          </Badge>
                        </td>
                        <td className="py-3">
                          <Badge className="text-xs">{row.new}</Badge>
                        </td>
                        <td className="py-3 text-sm font-mono text-right">{row.volume}</td>
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
