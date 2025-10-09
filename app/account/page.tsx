"use client"

import { useAuth } from "@/lib/auth-context"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

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
          <div className="w-20 h-20 rounded-full overflow-hidden bg-muted">
            <Image
              src="/images/sarah-avatar.jpg"
              alt="Sarah Miller"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-lg sm:text-xl font-semibold">Sarah Miller</h1>
            <p className="text-sm text-muted-foreground">Ambassador since March 2023</p>
            <Badge className="mt-2">Gold Level</Badge>
          </div>
        </div>
      </Card>

      {/* My Information */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold mb-4">My Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Email</p>
            <p className="font-medium truncate">sarah.miller@example.com</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Phone</p>
            <p className="font-medium">(555) 123-4567</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Ambassador ID</p>
            <p className="font-mono break-all">AMB-2023-8472</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Join Date</p>
            <p className="font-medium">March 15, 2023</p>
          </Card>
        </div>
      </div>

      {/* My Customers */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-semibold">My Customers</h2>
          <Button size="sm">Add Customer</Button>
        </div>
        <div className="space-y-3">
          {[
            { name: "Jessica Taylor", email: "j.taylor@email.com", sales: "$1,245.00" },
            { name: "Michael Chen", email: "m.chen@email.com", sales: "$892.50" },
            { name: "Amanda Rodriguez", email: "a.rodriguez@email.com", sales: "$2,156.00" },
          ].map((customer, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-semibold">
                  {customer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{customer.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{customer.email}</p>
                </div>
                <p className="font-mono text-sm">{customer.sales}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* My Legs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-semibold">My Legs</h2>
          <Button size="sm">Recruit Ambassador</Button>
        </div>
        <div className="space-y-3">
          {[
            { name: "David Wilson", level: "Silver", customers: 12, volume: "$4,200" },
            { name: "Lisa Anderson", level: "Bronze", customers: 8, volume: "$2,800" },
          ].map((leg, i) => (
            <Card key={i} className="p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-semibold">
                  {leg.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{leg.name}</p>
                    <Badge variant="outline">{leg.level}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {leg.customers} customers • {leg.volume} monthly volume
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Sales Performance */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Sales Performance</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="p-4 sm:p-6 bg-muted">
            <h3 className="font-semibold mb-4">Product Category Breakdown</h3>
            <div className="space-y-3">
              {[
                { category: "Creams", amount: "$3,200", percentage: 40 },
                { category: "Simple Solutions", amount: "$2,400", percentage: 30 },
                { category: "Essentials", amount: "$2,400", percentage: 30 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.category}</span>
                    <span className="font-mono">{item.amount}</span>
                  </div>
                  <div className="h-2 overflow-hidden bg-muted rounded-none">
                    <div className="h-full bg-primary" style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <div className="space-y-4">
            <Card className="p-4 sm:p-6">
              <h3 className="font-semibold mb-3">This Month</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Personal Sales</span>
                  <span className="font-mono">$5,200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Team Sales</span>
                  <span className="font-mono">$7,000</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-semibold">Total Volume</span>
                  <span className="font-mono font-semibold">$12,200</span>
                </div>
              </div>
            </Card>
            <Card className="p-4 sm:p-6">
              <h3 className="font-semibold mb-3">Commissions</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Personal</span>
                  <span className="font-mono">$1,040</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Team Bonus</span>
                  <span className="font-mono">$420</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-semibold">Total Earned</span>
                  <span className="font-mono font-semibold">$1,460</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Performance to Goal */}
      <Card className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Performance to Goal</h2>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Progress to Platinum Level</span>
            <span className="font-semibold">79%</span>
          </div>
          <div className="h-3 bg-muted overflow-hidden rounded-none">
            <div className="h-full bg-primary rounded-none" style={{ width: "79%" }} />
          </div>
          <div className="flex justify-between text-sm">
            <div>
              <p className="text-muted-foreground">Current Volume</p>
              <p className="font-mono">$7,900</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground">Remaining</p>
              <p className="font-mono">$2,100</p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground">Goal</p>
              <p className="font-mono">$10,000</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

function MemberView() {
  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <Card className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-muted">
            <Image
              src="/images/sarah-avatar.jpg"
              alt="Sarah Miller"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
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
