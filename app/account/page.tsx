"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OrderCard } from "@/components/account/order-card"
import { ScanScoreCard } from "@/components/account/scan-score-card"

export default function AccountPage() {
  const { isLoggedIn, userRole } = useAuth()
  const router = useRouter()

  // Removing the redirect to ambassador page
  // useEffect(() => {
  //   if (isLoggedIn && userRole === "ambassador") {
  //     router.push("/ambassador")
  //   }
  // }, [isLoggedIn, userRole, router])

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
          <MemberView />
        </div>
      </div>
    </>
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
          <ScanScoreCard label="Latest Scan" date="December 15, 2023" score={8.2} />
          <ScanScoreCard label="Previous Scan" date="September 10, 2023" score={7.8} />
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
          <OrderCard name="Custom Cream - Aloe Vera Base" date="Dec 18, 2023" price="$89.00" />
          <OrderCard name="Radiance Ritual Bundle" date="Nov 5, 2023" price="$59.95" />
          <OrderCard name="Hyaluronic Acid Serum" date="Oct 22, 2023" price="$34.00" />
        </div>
      </div>
    </div>
  )
}
