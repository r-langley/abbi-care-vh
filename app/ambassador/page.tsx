"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { AmbassadorHeader } from "@/components/ambassador-header"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { TargetChecklistItem } from "@/components/account/target-checklist-item"
import { NewsItem } from "@/components/account/news-item"
import { ActivityItem } from "@/components/account/activity-item"
import { TeamMemberCard } from "@/components/account/team-member-card"
import Link from "next/link"
import Image from "next/image"
import { ArrowTrendingUpIcon, UsersIcon, ShoppingBagIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function AmbassadorHomePage() {
  const { isLoggedIn, userRole } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, router])

  return (
    <>
      <AmbassadorHeader />
      <div className="min-h-screen bg-muted">
        <div className="max-w-[900px] mx-auto px-4 py-8">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Targets */}
              <Card className="p-4 sm:p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-lg mb-4">Targets</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <Tabs defaultValue="rank" className="w-full">
                    <TabsList variant="underline" className="mb-6">
                      <TabsTrigger value="rank" variant="underline">
                        Rank
                      </TabsTrigger>
                      <TabsTrigger value="commission" variant="underline">
                        Enhanced Commission
                      </TabsTrigger>
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
                        <Progress
                          value={75}
                          className="h-4 rounded-full [&>div]:bg-accent-purple"
                          aria-label="Progress to Level 6: 75%"
                        />
                        
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <TargetChecklistItem title="Personal Sales Target" subtitle="$5,000 reached" progress={100} />
                        <TargetChecklistItem title="Team Sales" subtitle="$15,000 / $20,000" progress={75} />
                        <TargetChecklistItem title="Qualified Legs" subtitle="8 / 6 required" progress={100} />
                        <TargetChecklistItem title="Active Team Members" subtitle="12 / 15 required" progress={80} />
                      </div>

                      <div className="flex mt-4 justify-start">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/account/rank-progress">View Full Details</Link>
                        </Button>
                      </div>
                    </TabsContent>

                    {/* Enhanced Commission Tab Content */}
                    <TabsContent value="commission" className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm text-muted-foreground">Currently at</span>
                            <span className="text-3xl font-semibold font-mono text-accent-purple">20%</span>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm text-muted-foreground">Next target</span>
                            <span className="text-3xl font-semibold font-mono text-accent-purple">25%</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div>
                            <span className="text-muted-foreground">Current Sales: </span>
                            <span className="font-mono font-semibold">$119</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Needed: </span>
                            <span className="font-mono font-semibold text-accent-purple">$81</span>
                          </div>
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
                          <Progress
                            value={59.5}
                            className="h-3 rounded-full [&>div]:bg-accent-purple"
                            aria-label="20% commission tier: $119 of $200"
                          />
                        </div>

                        {/* 25% Tier - Next Target */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-accent-purple">25%</span>
                            <span className="font-mono">$119 of $1,499.99</span>
                          </div>
                          <Progress
                            value={7.9}
                            className="h-3 rounded-full [&>div]:bg-accent-purple"
                            aria-label="25% commission tier: $119 of $1,499.99"
                          />
                        </div>

                        {/* 30% Tier */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-muted-foreground">30%</span>
                            <span className="font-mono text-muted-foreground">$0 of $2,999.99</span>
                          </div>
                          <Progress
                            value={0}
                            className="h-3 rounded-full [&>div]:bg-muted-foreground"
                            aria-label="30% commission tier: $0 of $2,999.99"
                          />
                        </div>

                        {/* 35% Tier */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-muted-foreground">35%</span>
                            <span className="font-mono text-muted-foreground">$0 of $5,000.00</span>
                          </div>
                          <Progress
                            value={0}
                            className="h-3 rounded-full [&>div]:bg-muted-foreground"
                            aria-label="35% commission tier: $0 of $5,000.00"
                          />
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

              <Card className="p-4 sm:p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-lg mb-4">Business Overview</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <div className="space-y-3">
                    <Link
                      href="/account/personal-sales"
                      className="flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors group px-0 py-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <CurrencyDollarIcon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-medium">Personal Sales</span>
                      </div>
                      <span className="text-lg font-semibold font-mono">$2,000.00</span>
                    </Link>

                    <Link
                      href="/account/team-sales"
                      className="flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors group px-0 py-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <UsersIcon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-medium">Team Sales</span>
                      </div>
                      <span className="text-lg font-semibold font-mono">$15,000.00</span>
                    </Link>

                    <Link
                      href="/account/capped-volume"
                      className="flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors group px-0 py-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <ShoppingBagIcon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-medium">Capped Volume</span>
                      </div>
                      <span className="text-lg font-semibold font-mono">$15,000.00</span>
                    </Link>

                    <Link
                      href="/account/qualified-legs"
                      className="flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors group px-0 py-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <ArrowTrendingUpIcon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-medium">Qualified Legs</span>
                      </div>
                      <span className="text-lg font-semibold font-mono">8</span>
                    </Link>

                    <Link
                      href="/account/new-scans"
                      className="flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors group px-0 py-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <UsersIcon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-medium">New Scans</span>
                      </div>
                      <span className="text-lg font-semibold font-mono">10</span>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

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
              <div className="flex mt-4 justify-start">
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
                    <ActivityItem customer="Jessica Taylor" action="New order" amount="$124.50" time="2 hours ago" />
                    <ActivityItem customer="Mike Johnson" action="Joined your team" amount={null} time="1 day ago" />
                    <ActivityItem customer="Amanda Rodriguez" action="Reorder" amount="$89.00" time="2 days ago" />
                  </div>
                </CardContent>
                <div className="flex mt-4 justify-start">
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
                    <TeamMemberCard name="David Wilson" level="Silver" sales="$4,200" trend="up" />
                    <TeamMemberCard name="Lisa Anderson" level="Bronze" sales="$2,800" trend="up" />
                    <TeamMemberCard name="Mike Johnson" level="Bronze" sales="$1,450" trend="down" />
                  </div>
                </CardContent>
                <div className="flex mt-4 justify-start">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/account/team">View All Team Members</Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
