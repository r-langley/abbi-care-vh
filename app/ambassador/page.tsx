"use client"

import Link from "next/link"
import { TrendingUp, Users, DollarSign, ArrowUpRight } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"

const rankAdvancements = [
  {
    ambassadorId: "AMB001",
    level: 2,
    name: "Jessica Williams",
    prevRank: "Level 1",
    newRank: "Level 2",
    advancementDate: "2025-11-01",
    highestRank: "Level 2",
    enroller: "Sarah Johnson",
    phone: "(555) 123-4567",
    email: "jessica.w@email.com",
    pv: 780,
    paidRank: "Senior Consultant",
    startDate: "2025-07-22",
  },
  {
    ambassadorId: "AMB002",
    level: 3,
    name: "Michael Chen",
    prevRank: "Level 2",
    newRank: "Level 3",
    advancementDate: "2025-11-05",
    highestRank: "Level 3",
    enroller: "Sarah Johnson",
    phone: "(555) 234-5678",
    email: "michael.c@email.com",
    pv: 1200,
    paidRank: "Manager",
    startDate: "2025-05-10",
  },
]

const teamMembers = [
  {
    ambassadorId: "AMB003",
    firstName: "Emily",
    lastName: "Davis",
    enrollmentDate: "2025-10-15",
    email: "emily.d@email.com",
    phone: "(555) 345-6789",
    current: "Level 1",
    highestRank: "Level 1",
    sponsor: "Sarah Johnson",
    enroller: "Sarah Johnson",
    birthday: "1990-03-22",
    pv: 320,
    paidRank: "Consultant",
    level: 1,
  },
  {
    ambassadorId: "AMB004",
    firstName: "Daniel",
    lastName: "Martinez",
    enrollmentDate: "2025-09-20",
    email: "daniel.m@email.com",
    phone: "(555) 456-7890",
    current: "Ambassador",
    highestRank: "Level 1",
    sponsor: "Sarah Johnson",
    enroller: "Sarah Johnson",
    birthday: "1988-07-14",
    pv: 180,
    paidRank: "Ambassador",
    level: 1,
  },
]

export default function AmbassadorHomePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-muted">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">Welcome back, Sarah</h1>
                <p className="text-muted-foreground mt-1">Here's what's happening with your team</p>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
              <Card className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Personal Volume</p>
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-semibold font-mono">$2,450</p>
                  <p className="text-sm text-accent-purple">+12.5% from last month</p>
                </div>
              </Card>

              <Card className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Group Volume</p>
                  <Users className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-semibold font-mono">$18,320</p>
                  <p className="text-sm text-accent-purple">+8.3% from last month</p>
                </div>
              </Card>

              <Card className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Active Team</p>
                  <Users className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-semibold font-mono">24</p>
                  <p className="text-sm text-accent-purple">+3 new members</p>
                </div>
              </Card>

              <Card className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Commission</p>
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-semibold font-mono">$3,664</p>
                  <p className="text-sm text-accent-purple">+15.2% from last month</p>
                </div>
              </Card>
            </div>

            {/* Rank Progress and Recent Activity */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Rank Targets */}
              <Card className="p-4 sm:p-6">
                <h3 className="font-semibold mb-4">Rank Progress</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Current</p>
                      <p className="font-semibold">Level 2</p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Next</p>
                      <p className="font-semibold">Level 3</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold">75%</span>
                    </div>
                    <div className="h-2 bg-muted overflow-hidden rounded-full">
                      <div className="h-full bg-primary" style={{ width: "75%" }} />
                    </div>
                  </div>
                  <div className="pt-3 border-t space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Current GV</span>
                      <span className="font-mono">$1,500</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Target GV</span>
                      <span className="font-mono">$2,000</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="p-4 sm:p-6 lg:col-span-2">
                <h3 className="font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 pb-3 border-b">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">Jessica Williams advanced to Level 2</p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pb-3 border-b">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">New order from Emily Davis</p>
                      <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">Commission payment processed</p>
                      <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Rank Advancements */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Recent Rank Advancements</h2>
                  <p className="text-sm text-muted-foreground mt-1">Team members who achieved new ranks</p>
                </div>
              </div>
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left text-sm text-muted-foreground">
                      <th className="pb-3 px-4 sm:px-0 font-medium">Ambassador ID</th>
                      <th className="pb-3 px-4 sm:px-0 font-medium">Name</th>
                      <th className="pb-3 px-4 sm:px-0 font-medium">Previous Rank</th>
                      <th className="pb-3 px-4 sm:px-0 font-medium">New Rank</th>
                      <th className="pb-3 px-4 sm:px-0 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {rankAdvancements.map((advancement) => (
                      <tr key={advancement.ambassadorId} className="text-sm">
                        <td className="py-3 px-4 sm:px-0">
                          <span className="font-mono text-xs">{advancement.ambassadorId}</span>
                        </td>
                        <td className="py-3 px-4 sm:px-0">
                          <div>
                            <p className="font-medium">{advancement.name}</p>
                            <p className="text-xs text-muted-foreground">{advancement.email}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 sm:px-0">
                          <Badge variant="outline">{advancement.prevRank}</Badge>
                        </td>
                        <td className="py-3 px-4 sm:px-0">
                          <Badge>{advancement.newRank}</Badge>
                        </td>
                        <td className="py-3 px-4 sm:px-0 text-muted-foreground">{advancement.advancementDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Team Members */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Team Members</h2>
                  <p className="text-sm text-muted-foreground mt-1">Your direct team members</p>
                </div>
                <Button size="sm">View All</Button>
              </div>
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left text-sm text-muted-foreground">
                      <th className="pb-3 px-4 sm:px-0 font-medium">Ambassador ID</th>
                      <th className="pb-3 px-4 sm:px-0 font-medium">Name</th>
                      <th className="pb-3 px-4 sm:px-0 font-medium">Enrollment Date</th>
                      <th className="pb-3 px-4 sm:px-0 font-medium">Current Rank</th>
                      <th className="pb-3 px-4 sm:px-0 font-medium">Sponsor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {teamMembers.map((member) => (
                      <tr key={member.ambassadorId} className="text-sm">
                        <td className="py-3 px-4 sm:px-0">
                          <span className="font-mono text-xs">{member.ambassadorId}</span>
                        </td>
                        <td className="py-3 px-4 sm:px-0">
                          <div>
                            <p className="font-medium">
                              {member.firstName} {member.lastName}
                            </p>
                            <p className="text-xs text-muted-foreground">{member.email}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 sm:px-0 text-muted-foreground">{member.enrollmentDate}</td>
                        <td className="py-3 px-4 sm:px-0">
                          <Badge variant="outline">{member.current}</Badge>
                        </td>
                        <td className="py-3 px-4 sm:px-0 text-muted-foreground">{member.sponsor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
