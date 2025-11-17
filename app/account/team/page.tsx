"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeftIcon, ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline"

export default function TeamPage() {
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
            <h1 className="text-2xl font-semibold">Team Performance</h1>
          </div>

          <Card className="p-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle>All Team Members</CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Member</th>
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Rank</th>
                      <th className="text-right py-3 text-sm font-medium text-muted-foreground">Sales This Month</th>
                      <th className="text-right py-3 text-sm font-medium text-muted-foreground">Total Sales</th>
                      <th className="text-right py-3 text-sm font-medium text-muted-foreground">Joined</th>
                      <th className="text-right py-3 text-sm font-medium text-muted-foreground">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "David Wilson", rank: "Silver", monthSales: "$4,200", totalSales: "$18,450", joined: "Mar 2023", trend: "up" },
                      { name: "Lisa Anderson", rank: "Bronze", monthSales: "$2,800", totalSales: "$9,340", joined: "Jun 2023", trend: "up" },
                      { name: "Mike Johnson", rank: "Bronze", monthSales: "$1,450", totalSales: "$1,450", joined: "Dec 2023", trend: "down" },
                      { name: "Emma Thompson", rank: "Bronze", monthSales: "$1,120", totalSales: "$3,890", joined: "Sep 2023", trend: "up" },
                      { name: "Robert Chen", rank: "Member", monthSales: "$890", totalSales: "$5,670", joined: "Apr 2023", trend: "up" },
                      { name: "Sarah Williams", rank: "Member", monthSales: "$650", totalSales: "$4,230", joined: "May 2023", trend: "down" },
                      { name: "James Martinez", rank: "Member", monthSales: "$420", totalSales: "$2,890", joined: "Aug 2023", trend: "up" },
                      { name: "Jennifer Davis", rank: "Member", monthSales: "$280", totalSales: "$1,670", joined: "Oct 2023", trend: "up" },
                    ].map((row, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
                              {row.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <span className="text-sm font-medium">{row.name}</span>
                          </div>
                        </td>
                        <td className="py-3">
                          <Badge variant="outline" className="text-xs">
                            {row.rank}
                          </Badge>
                        </td>
                        <td className="py-3 text-sm font-mono text-right">{row.monthSales}</td>
                        <td className="py-3 text-sm font-mono text-right">{row.totalSales}</td>
                        <td className="py-3 text-sm text-muted-foreground text-right">{row.joined}</td>
                        <td className="py-3 text-right">
                          {row.trend === "up" ? (
                            <ArrowUpIcon className="w-4 h-4 text-accent-purple inline" />
                          ) : (
                            <ArrowDownIcon className="w-4 h-4 text-muted-foreground inline" />
                          )}
                        </td>
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
