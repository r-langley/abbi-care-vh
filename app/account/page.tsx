"use client"

import { useAuth } from "@/lib/auth-context"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { StatCard } from "@/components/account/stat-card"
import { TargetChecklistItem } from "@/components/account/target-checklist-item"
import { NewsItem } from "@/components/account/news-item"
import { ActivityItem } from "@/components/account/activity-item"
import { TeamMemberCard } from "@/components/account/team-member-card"
import { OrderCard } from "@/components/account/order-card"
import { ScanScoreCard } from "@/components/account/scan-score-card"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpIcon, ArrowDownIcon, ArrowTrendingUpIcon, UsersIcon, ShoppingBagIcon, CurrencyDollarIcon, CheckCircleIcon } from "@heroicons/react/24/outline"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

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
      {/* Promotional Carousel */}
      <Card className="overflow-hidden">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            <CarouselItem>
              <div className="relative w-full h-48">
                <Image
                  src="/placeholder.svg?height=400&width=1200"
                  alt="ABBI Skincare Products"
                  fill
                  className="object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative w-full h-48">
                <Image
                  src="/placeholder.svg?height=400&width=1200"
                  alt="Premium Beauty Products"
                  fill
                  className="object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative w-full h-48">
                <Image
                  src="/placeholder.svg?height=400&width=1200"
                  alt="Skincare Lifestyle"
                  fill
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </Card>

      {/* Business Overview */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Business Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            label="Personal Sales"
            value="$2,000.00"
            icon={<CurrencyDollarIcon className="w-5 h-5" />}
            href="/account/personal-sales"
          />
          <StatCard
            label="Team Sales"
            value="$15,000.00"
            icon={<UsersIcon className="w-5 h-5" />}
            href="/account/team-sales"
          />
          <StatCard
            label="Capped Volume"
            value="$15,000.00"
            icon={<ShoppingBagIcon className="w-5 h-5" />}
            href="/account/capped-volume"
          />
          <StatCard
            label="Qualified Legs"
            value="8"
            icon={<ArrowTrendingUpIcon className="w-5 h-5" />}
            href="/account/qualified-legs"
          />
          <StatCard
            label="New Scans"
            value="10"
            icon={<UsersIcon className="w-5 h-5" />}
            href="/account/new-scans"
          />
        </div>
      </div>

      {/* Targets */}
      <Card className="p-4 sm:p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-lg mb-4">Targets</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <Tabs defaultValue="rank" className="w-full">
            <TabsList variant="underline" className="mb-6">
              <TabsTrigger value="rank" variant="underline">Rank</TabsTrigger>
              <TabsTrigger value="commission" variant="underline">Enhanced Commission</TabsTrigger>
            </TabsList>

            {/* Rank Tab Content */}
            <TabsContent value="rank" className="space-y-6">
              {/* Progress to Next Level */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Current: Gold</Badge>
                    <span className="text-lg text-foreground font-medium">Level 5 Progress</span>
                    <Badge>Next: Level 6</Badge>
                  </div>
                  <span className="text-3xl font-semibold font-mono text-accent-purple">75%</span>
                </div>
                <Progress value={75} className="h-4 rounded-full [&>div]:bg-accent-purple" />
                <p className="text-sm text-muted-foreground mt-2">TO LEVEL 6</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TargetChecklistItem
                  title="Personal Sales Target"
                  subtitle="$5,000 reached"
                  achieved={true}
                />
                <TargetChecklistItem
                  title="Team Sales"
                  subtitle="$15,000 / $20,000"
                  achieved={false}
                />
                <TargetChecklistItem
                  title="Qualified Legs"
                  subtitle="8 / 6 required"
                  achieved={true}
                />
                <TargetChecklistItem
                  title="Active Team Members"
                  subtitle="12 / 15 required"
                  achieved={false}
                />
              </div>

              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/account/rank-progress">View Full Details</Link>
                </Button>
              </div>
            </TabsContent>

            {/* Enhanced Commission Tab Content */}
            <TabsContent value="commission" className="space-y-6">
              {/* Commission Overview */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Currently at</span>
                    <span className="text-3xl font-semibold font-mono text-accent-purple">20%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Next target</span>
                    <span className="text-2xl font-semibold font-mono text-accent-purple">25%</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Current Sales</p>
                  <p className="text-xl font-semibold font-mono">$119</p>
                  <p className="text-sm text-muted-foreground mt-2">Sales to Next Target</p>
                  <p className="text-lg font-semibold font-mono text-accent-purple">$81</p>
                </div>
              </div>

              {/* Commission Tiers with Progress Bars */}
              <div className="space-y-4">
                <p className="text-sm font-medium text-muted-foreground">Commission Tiers</p>
                
                {/* 20% Tier - Current */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-accent-purple">20%</span>
                    <span className="font-mono">$119 of $200</span>
                  </div>
                  <Progress value={59.5} className="h-3 rounded-full [&>div]:bg-accent-purple" />
                </div>

                {/* 25% Tier - Next Target */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-accent-purple">25%</span>
                    <span className="font-mono">$119 of $1,499.99</span>
                  </div>
                  <Progress value={7.9} className="h-3 rounded-full [&>div]:bg-accent-purple" />
                </div>

                {/* 30% Tier */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-muted-foreground">30%</span>
                    <span className="font-mono text-muted-foreground">$0 of $2,999.99</span>
                  </div>
                  <Progress value={0} className="h-3 rounded-full [&>div]:bg-muted-foreground" />
                </div>

                {/* 35% Tier */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-muted-foreground">35%</span>
                    <span className="font-mono text-muted-foreground">$0 of $5,000.00</span>
                  </div>
                  <Progress value={0} className="h-3 rounded-full [&>div]:bg-muted-foreground" />
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/account/commission-details">View Full Details</Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Company News & Resources */}
      <Card className="p-4 sm:p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-lg">Company News & Resources</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="space-y-3">
            <NewsItem
              type="email"
              title="December Newsletter: Year End Celebration"
              date="Dec 18, 2023"
              unread={true}
            />
            <NewsItem
              type="email"
              title="New Product Training Materials Available"
              date="Dec 15, 2023"
              unread={true}
            />
            <NewsItem
              type="zoom"
              title="Leadership Training - Recording Available"
              date="Dec 12, 2023"
              unread={false}
            />
            <NewsItem
              type="event"
              title="Regional Conference 2024 - Early Bird Registration"
              date="Dec 10, 2023"
              unread={false}
            />
          </div>
        </CardContent>
        <div className="flex justify-end mt-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/account/news">View All Updates</Link>
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Activity */}
        <Card className="p-4 sm:p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="space-y-4">
              <ActivityItem
                customer="Jessica Taylor"
                action="New order"
                amount="$124.50"
                time="2 hours ago"
              />
              <ActivityItem
                customer="Mike Johnson"
                action="Joined your team"
                amount={null}
                time="1 day ago"
              />
              <ActivityItem
                customer="Amanda Rodriguez"
                action="Reorder"
                amount="$89.00"
                time="2 days ago"
              />
            </div>
          </CardContent>
          <div className="flex justify-end mt-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/account/activity">View All Activity</Link>
            </Button>
          </div>
        </Card>

        {/* Team Performance */}
        <Card className="p-4 sm:p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg">Team Performance</CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="space-y-4">
              <TeamMemberCard
                name="David Wilson"
                level="Silver"
                sales="$4,200"
                trend="up"
              />
              <TeamMemberCard
                name="Lisa Anderson"
                level="Bronze"
                sales="$2,800"
                trend="up"
              />
              <TeamMemberCard
                name="Mike Johnson"
                level="Bronze"
                sales="$1,450"
                trend="down"
              />
            </div>
          </CardContent>
          <div className="flex justify-end mt-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/account/team">View All Team Members</Link>
            </Button>
          </div>
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
          <ScanScoreCard
            label="Latest Scan"
            date="December 15, 2023"
            score={8.2}
          />
          <ScanScoreCard
            label="Previous Scan"
            date="September 10, 2023"
            score={7.8}
          />
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
          <OrderCard
            name="Custom Cream - Aloe Vera Base"
            date="Dec 18, 2023"
            price="$89.00"
          />
          <OrderCard
            name="Radiance Ritual Bundle"
            date="Nov 5, 2023"
            price="$59.95"
          />
          <OrderCard
            name="Hyaluronic Acid Serum"
            date="Oct 22, 2023"
            price="$34.00"
          />
        </div>
      </div>
    </div>
  )
}
