"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"

export default function CustomersPage() {
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
            <h1 className="text-2xl font-semibold">All Customers</h1>
          </div>

          <Card className="p-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle>Customer Details</CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Customer</th>
                      <th className="text-right py-3 text-sm font-medium text-muted-foreground">Orders This Month</th>
                      <th className="text-right py-3 text-sm font-medium text-muted-foreground">Total Orders</th>
                      <th className="text-right py-3 text-sm font-medium text-muted-foreground">This Month Sales</th>
                      <th className="text-right py-3 text-sm font-medium text-muted-foreground">Total Sales</th>
                      <th className="text-right py-3 text-sm font-medium text-muted-foreground">Last Order</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Amanda Rodriguez", monthOrders: 8, totalOrders: 32, monthSales: "$2,156.00", totalSales: "$8,640.00", lastOrder: "Dec 18, 2023" },
                      { name: "Jessica Taylor", monthOrders: 6, totalOrders: 24, monthSales: "$1,245.00", totalSales: "$5,890.00", lastOrder: "Dec 17, 2023" },
                      { name: "Michael Chen", monthOrders: 5, totalOrders: 18, monthSales: "$892.50", totalSales: "$4,120.00", lastOrder: "Dec 15, 2023" },
                      { name: "Sarah Williams", monthOrders: 4, totalOrders: 28, monthSales: "$756.00", totalSales: "$7,340.00", lastOrder: "Dec 14, 2023" },
                      { name: "David Lee", monthOrders: 4, totalOrders: 15, monthSales: "$689.25", totalSales: "$3,560.00", lastOrder: "Dec 12, 2023" },
                      { name: "Lisa Anderson", monthOrders: 3, totalOrders: 22, monthSales: "$567.00", totalSales: "$6,230.00", lastOrder: "Dec 9, 2023" },
                      { name: "Robert Martinez", monthOrders: 3, totalOrders: 12, monthSales: "$445.50", totalSales: "$2,890.00", lastOrder: "Dec 8, 2023" },
                      { name: "Emma Thompson", monthOrders: 2, totalOrders: 8, monthSales: "$334.00", totalSales: "$1,780.00", lastOrder: "Dec 6, 2023" },
                      { name: "James Wilson", monthOrders: 2, totalOrders: 16, monthSales: "$298.75", totalSales: "$4,450.00", lastOrder: "Dec 5, 2023" },
                      { name: "Jennifer Davis", monthOrders: 2, totalOrders: 6, monthSales: "$223.00", totalSales: "$1,340.00", lastOrder: "Dec 3, 2023" },
                    ].map((row, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="py-3 text-sm">{row.name}</td>
                        <td className="py-3 text-sm font-mono text-right">{row.monthOrders}</td>
                        <td className="py-3 text-sm font-mono text-right">{row.totalOrders}</td>
                        <td className="py-3 text-sm font-mono text-right">{row.monthSales}</td>
                        <td className="py-3 text-sm font-mono text-right">{row.totalSales}</td>
                        <td className="py-3 text-sm text-muted-foreground text-right">{row.lastOrder}</td>
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
