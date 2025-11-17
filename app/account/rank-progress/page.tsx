"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"

export default function RankProgressPage() {
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
            <h1 className="text-2xl font-semibold">Rank Progress Details</h1>
          </div>

          <div className="space-y-6">
            {/* Current Progress */}
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Current Rank Progress</CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Current: Gold</Badge>
                        <span className="text-sm text-muted-foreground">→</span>
                        <Badge>Next: Platinum</Badge>
                      </div>
                      <span className="text-sm font-semibold">79%</span>
                    </div>
                    <div className="h-3 bg-muted overflow-hidden rounded-none">
                      <div className="h-full bg-primary rounded-none" style={{ width: "79%" }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Current Volume</p>
                      <p className="font-mono text-2xl">$7,900</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Remaining</p>
                      <p className="font-mono text-2xl">$2,100</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Goal</p>
                      <p className="font-mono text-2xl">$10,000</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rank Requirements */}
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Rank Requirements</CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">Rank</th>
                        <th className="text-right py-3 text-sm font-medium text-muted-foreground">Personal Volume</th>
                        <th className="text-right py-3 text-sm font-medium text-muted-foreground">Team Volume</th>
                        <th className="text-right py-3 text-sm font-medium text-muted-foreground">Active Members</th>
                        <th className="text-right py-3 text-sm font-medium text-muted-foreground">Commission Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { rank: "Platinum", personal: "$10,000", team: "$25,000", members: 10, rate: "25%" },
                        { rank: "Gold", personal: "$5,000", team: "$15,000", members: 7, rate: "20%", current: true },
                        { rank: "Silver", personal: "$2,500", team: "$7,500", members: 5, rate: "15%" },
                        { rank: "Bronze", personal: "$1,000", team: "$3,000", members: 3, rate: "10%" },
                        { rank: "Member", personal: "$0", team: "$0", members: 0, rate: "5%" },
                      ].map((row, i) => (
                        <tr key={i} className={`border-b last:border-0 ${row.current ? "bg-muted" : ""}`}>
                          <td className="py-3">
                            <Badge variant={row.current ? "default" : "outline"}>{row.rank}</Badge>
                          </td>
                          <td className="py-3 text-sm font-mono text-right">{row.personal}</td>
                          <td className="py-3 text-sm font-mono text-right">{row.team}</td>
                          <td className="py-3 text-sm font-mono text-right">{row.members}</td>
                          <td className="py-3 text-sm font-mono text-right">{row.rate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Historical Rank Progress */}
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Rank Achievement History</CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">Rank</th>
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">Achieved</th>
                        <th className="text-right py-3 text-sm font-medium text-muted-foreground">Volume at Time</th>
                        <th className="text-right py-3 text-sm font-medium text-muted-foreground">Team Size</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { rank: "Gold", date: "October 15, 2023", volume: "$5,240", team: 7 },
                        { rank: "Silver", date: "August 3, 2023", volume: "$2,680", team: 5 },
                        { rank: "Bronze", date: "May 20, 2023", volume: "$1,120", team: 3 },
                        { rank: "Member", date: "March 1, 2023", volume: "$0", team: 0 },
                      ].map((row, i) => (
                        <tr key={i} className="border-b last:border-0">
                          <td className="py-3">
                            <Badge variant="outline">{row.rank}</Badge>
                          </td>
                          <td className="py-3 text-sm">{row.date}</td>
                          <td className="py-3 text-sm font-mono text-right">{row.volume}</td>
                          <td className="py-3 text-sm font-mono text-right">{row.team}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
