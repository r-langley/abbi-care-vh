"use client"

import { useAuth } from "@/lib/auth-context"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { ArrowUpIcon, ArrowDownIcon, ArrowTrendingUpIcon, UsersIcon, ShoppingBagIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline"

export default function AccountPage() {
  const { isLoggedIn, userRole } = useAuth()

  if (!isLoggedIn) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="p-8 text-center max-w-md">
            <h1 className="text-2xl font-semibold mb-4">Please Log In</h1>
            <p className="text-muted-foreground">You need to be logged in to view your account.</p>
          </Card>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-muted">
        <div className="max-w-[900px] mx-auto px-4 py-8">
          {userRole === "ambassador" ? <AmbassadorView /> : <MemberView />}
        </div>
      </div>
    </>
  )
}

function AmbassadorView() {
  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <Card className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center text-2xl font-semibold">
            SM
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-lg sm:text-xl font-semibold">Sarah Miller</h1>
            <p className="text-sm text-muted-foreground">Ambassador since March 2023</p>
            <Badge className="mt-2">Gold Level</Badge>
          </div>
        </div>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 sm:p-6">
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
            <ArrowUpIcon className="w-4 h-4 text-[#4b4262]" />
            <span className="text-[#4b4262] font-medium">12.5%</span>
            <span className="text-muted-foreground">vs last month</span>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
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
            <ArrowUpIcon className="w-4 h-4 text-[#4b4262]" />
            <span className="text-[#4b4262] font-medium">3 new</span>
            <span className="text-muted-foreground">this month</span>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
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
            <ArrowUpIcon className="w-4 h-4 text-[#4b4262]" />
            <span className="text-[#4b4262] font-medium">2 active</span>
            <span className="text-muted-foreground">this week</span>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
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
            <ArrowUpIcon className="w-4 h-4 text-[#4b4262]" />
            <span className="text-[#4b4262] font-medium">$234</span>
            <span className="text-muted-foreground">vs last month</span>
          </div>
        </Card>
      </div>

      {/* Rank Progress */}
      <Card className="p-4 sm:p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-lg">Rank Progress</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="space-y-4">
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

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div>
                <p className="text-sm text-muted-foreground">Current Volume</p>
                <p className="font-mono text-lg">$7,900</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p className="font-mono text-lg">$2,100</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Goal</p>
                <p className="font-mono text-lg">$10,000</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity & Team Performance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Activity */}
        <Card className="p-4 sm:p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="space-y-4">
              {[
                {
                  type: "sale",
                  customer: "Jessica Taylor",
                  action: "New order",
                  amount: "$124.50",
                  time: "2 hours ago",
                },
                {
                  type: "recruit",
                  customer: "Mike Johnson",
                  action: "Joined your team",
                  amount: null,
                  time: "1 day ago",
                },
                {
                  type: "sale",
                  customer: "Amanda Rodriguez",
                  action: "Reorder",
                  amount: "$89.00",
                  time: "2 days ago",
                },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.customer}</p>
                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                  </div>
                  <div className="text-right">
                    {activity.amount && <p className="font-mono text-sm">{activity.amount}</p>}
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card className="p-4 sm:p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg">Team Performance</CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="space-y-4">
              {[
                { name: "David Wilson", level: "Silver", sales: "$4,200", trend: "up" },
                { name: "Lisa Anderson", level: "Bronze", sales: "$2,800", trend: "up" },
                { name: "Mike Johnson", level: "Bronze", sales: "$1,450", trend: "down" },
              ].map((member, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{member.name}</p>
                      <Badge variant="outline" className="text-xs">
                        {member.level}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-sm">{member.sales}</p>
                    {member.trend === "up" ? (
                      <ArrowUpIcon className="w-4 h-4 text-[#4b4262]" />
                    ) : (
                      <ArrowDownIcon className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Tables */}
      <div className="space-y-4">
        {/* Rank Advancements */}
        <Card className="p-4 sm:p-6">
          <CardHeader className="px-0 pt-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent Rank Advancements</CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 text-sm font-medium text-muted-foreground">Name</th>
                    <th className="text-left py-2 text-sm font-medium text-muted-foreground">Previous Rank</th>
                    <th className="text-left py-2 text-sm font-medium text-muted-foreground">New Rank</th>
                    <th className="text-left py-2 text-sm font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Lisa Anderson", prev: "Member", new: "Bronze", date: "Dec 15" },
                    { name: "David Wilson", prev: "Bronze", new: "Silver", date: "Dec 10" },
                    { name: "Emma Thompson", prev: "Member", new: "Bronze", date: "Dec 5" },
                  ].map((advancement, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="py-3 text-sm">{advancement.name}</td>
                      <td className="py-3">
                        <Badge variant="outline" className="text-xs">
                          {advancement.prev}
                        </Badge>
                      </td>
                      <td className="py-3">
                        <Badge className="text-xs">{advancement.new}</Badge>
                      </td>
                      <td className="py-3 text-sm text-muted-foreground">{advancement.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Top Customers */}
        <Card className="p-4 sm:p-6">
          <CardHeader className="px-0 pt-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Top Customers This Month</CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 text-sm font-medium text-muted-foreground">Customer</th>
                    <th className="text-left py-2 text-sm font-medium text-muted-foreground">Orders</th>
                    <th className="text-left py-2 text-sm font-medium text-muted-foreground">Total Sales</th>
                    <th className="text-left py-2 text-sm font-medium text-muted-foreground">Last Order</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Amanda Rodriguez", orders: 8, sales: "$2,156.00", date: "Dec 18" },
                    { name: "Jessica Taylor", orders: 6, sales: "$1,245.00", date: "Dec 17" },
                    { name: "Michael Chen", orders: 5, sales: "$892.50", date: "Dec 15" },
                  ].map((customer, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="py-3 text-sm">{customer.name}</td>
                      <td className="py-3 text-sm font-mono">{customer.orders}</td>
                      <td className="py-3 text-sm font-mono">{customer.sales}</td>
                      <td className="py-3 text-sm text-muted-foreground">{customer.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function MemberView() {
  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <Card className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center text-2xl font-semibold">
            SM
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-lg sm:text-xl font-semibold">Sarah Miller</h1>
            <p className="text-sm text-muted-foreground">Member since March 2023</p>
          </div>
        </div>
      </Card>

      {/* Skin Scan History */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Skin Scan History</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Card className="p-4 sm:p-6">
            <p className="text-sm text-muted-foreground mb-1">Latest Scan</p>
            <p className="font-medium mb-2">December 15, 2023</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold">8.2</span>
              <span className="text-sm text-muted-foreground">/ 10</span>
            </div>
          </Card>
          <Card className="p-4 sm:p-6">
            <p className="text-sm text-muted-foreground mb-1">Previous Scan</p>
            <p className="font-medium mb-2">September 10, 2023</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold">7.8</span>
              <span className="text-sm text-muted-foreground">/ 10</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Order Tracking */}
      <Card className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Order Tracking</h2>
        <div className="space-y-4">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <p className="font-medium">Custom Formula #CF-2023-1245</p>
                <p className="text-sm text-muted-foreground">Ordered December 18, 2023</p>
              </div>
              <Badge>In Production</Badge>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-primary rounded-full" />
              <div className="flex-1 h-2 bg-primary rounded-full" />
              <div className="flex-1 h-2 bg-muted rounded-full" />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Ordered</span>
              <span>In Production</span>
              <span>Shipped</span>
            </div>
          </div>
        </div>
      </Card>

      {/* My Ambassador */}
      <Card className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">My Ambassador</h2>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-xl font-semibold">
            JD
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="font-medium">Jennifer Davis</p>
            <p className="text-sm text-muted-foreground mb-1">Skincare Specialist</p>
            <p className="text-sm text-muted-foreground truncate">jennifer.davis@example.com</p>
          </div>
          <Button size="sm">Contact</Button>
        </div>
      </Card>

      {/* Family Members */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-semibold">Family Members</h2>
          <Button size="sm">Add Family Member</Button>
        </div>
        <Card className="p-8 text-center bg-muted">
          <div className="w-16 h-16 rounded-full bg-background mx-auto mb-3 flex items-center justify-center">
            <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <p className="text-muted-foreground">No family members added yet</p>
        </Card>
      </div>

      {/* Purchase History */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Purchase History</h2>
        <div className="space-y-3">
          {[
            { name: "Custom Cream - Aloe Vera Base", date: "Dec 18, 2023", price: "$89.00" },
            { name: "Radiance Ritual Bundle", date: "Nov 5, 2023", price: "$59.95" },
            { name: "Hyaluronic Acid Serum", date: "Oct 22, 2023", price: "$34.00" },
          ].map((order, i) => (
            <Card key={i} className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex-1">
                  <p className="font-medium">{order.name}</p>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-mono">{order.price}</p>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
