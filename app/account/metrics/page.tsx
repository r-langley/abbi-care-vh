"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeftIcon, ArrowUpIcon, ArrowDownIcon, CurrencyDollarIcon, UsersIcon, ArrowTrendingUpIcon, ShoppingBagIcon } from "@heroicons/react/24/outline"

export default function MetricsPage() {
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
            <h1 className="text-2xl font-semibold">Performance Metrics</h1>
          </div>

          <div className="space-y-6">
            {/* Current Period Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Sales</p>
                    <p className="text-2xl font-semibold font-mono">$12,450</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <CurrencyDollarIcon className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2 text-sm">
                  <ArrowUpIcon className="w-4 h-4 text-accent-purple" />
                  <span className="text-accent-purple font-medium">12.5%</span>
                  <span className="text-muted-foreground">vs last month</span>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Customers</p>
                    <p className="text-2xl font-semibold font-mono">24</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <UsersIcon className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2 text-sm">
                  <ArrowUpIcon className="w-4 h-4 text-accent-purple" />
                  <span className="text-accent-purple font-medium">3 new</span>
                  <span className="text-muted-foreground">this month</span>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Team Size</p>
                    <p className="text-2xl font-semibold font-mono">8</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <ArrowTrendingUpIcon className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2 text-sm">
                  <ArrowUpIcon className="w-4 h-4 text-accent-purple" />
                  <span className="text-accent-purple font-medium">2 active</span>
                  <span className="text-muted-foreground">this week</span>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Commission</p>
                    <p className="text-2xl font-semibold font-mono">$1,867</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <ShoppingBagIcon className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2 text-sm">
                  <ArrowUpIcon className="w-4 h-4 text-accent-purple" />
                  <span className="text-accent-purple font-medium">$234</span>
                  <span className="text-muted-foreground">vs last month</span>
                </div>
              </Card>
            </div>

            {/* Historical Data */}
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Monthly Performance History</CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">Month</th>
                        <th className="text-right py-3 text-sm font-medium text-muted-foreground">Sales</th>
                        <th className="text-right py-3 text-sm font-medium text-muted-foreground">Customers</th>
                        <th className="text-right py-3 text-sm font-medium text-muted-foreground">Team Size</th>
                        <th className="text-right py-3 text-sm font-medium text-muted-foreground">Commission</th>
                        <th className="text-right py-3 text-sm font-medium text-muted-foreground">Growth</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { month: "December 2023", sales: "$12,450", customers: 24, team: 8, commission: "$1,867", growth: 12.5 },
                        { month: "November 2023", sales: "$11,070", customers: 22, team: 7, commission: "$1,661", growth: 8.3 },
                        { month: "October 2023", sales: "$10,220", customers: 21, team: 7, commission: "$1,533", growth: -2.1 },
                        { month: "September 2023", sales: "$10,440", customers: 20, team: 6, commission: "$1,566", growth: 15.7 },
                        { month: "August 2023", sales: "$9,025", customers: 19, team: 6, commission: "$1,354", growth: 5.4 },
                        { month: "July 2023", sales: "$8,560", customers: 18, team: 5, commission: "$1,284", growth: 10.2 },
                      ].map((row, i) => (
                        <tr key={i} className="border-b last:border-0">
                          <td className="py-3 text-sm">{row.month}</td>
                          <td className="py-3 text-sm font-mono text-right">{row.sales}</td>
                          <td className="py-3 text-sm font-mono text-right">{row.customers}</td>
                          <td className="py-3 text-sm font-mono text-right">{row.team}</td>
                          <td className="py-3 text-sm font-mono text-right">{row.commission}</td>
                          <td className="py-3 text-sm text-right">
                            <div className="flex items-center justify-end gap-1">
                              {row.growth > 0 ? (
                                <>
                                  <ArrowUpIcon className="w-4 h-4 text-accent-purple" />
                                  <span className="text-accent-purple font-medium">{row.growth}%</span>
                                </>
                              ) : (
                                <>
                                  <ArrowDownIcon className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-muted-foreground font-medium">{Math.abs(row.growth)}%</span>
                                </>
                              )}
                            </div>
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
      </div>
    </>
  )
}
