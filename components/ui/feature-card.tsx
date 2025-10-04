import type * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CardTitle } from "@/components/ui/typography"
import { SmallText } from "@/components/ui/typography"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <Card className={cn("hover:shadow-lg transition-all duration-300 shadow-none", className)}>
      <CardContent className="p-8 text-center px-2.5 py-2.5">
        <div className="flex justify-center mb-6">
          <div className="bg-primary/10 p-4 rounded-full px-2.5 py-2.5">{icon}</div>
        </div>
        <CardTitle className="mb-3">{title}</CardTitle>
        <SmallText>{description}</SmallText>
      </CardContent>
    </Card>
  )
}
