"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

interface TabsNavProps {
  tabs: { label: string; value: string }[]
  baseUrl: string
  paramName?: string
}

export function TabsNav({ tabs, baseUrl, paramName = "category" }: TabsNavProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentValue = searchParams.get(paramName) || tabs[0].value

  return (
    <nav className="border-border border-b-0">
      <div className="container mx-auto px-0">
        <div className="grid grid-cols-3 gap-0">
          {tabs.map((tab) => {
            const isActive = currentValue === tab.value
            const href = `${baseUrl}?${paramName}=${tab.value}`

            return (
              <Link
                key={tab.value}
                href={href}
                className={cn(
                  "relative text-sm font-medium transition-colors hover:text-foreground py-2.5 text-center px-0",
                  isActive ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {tab.label}
                {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" aria-hidden="true" />}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
