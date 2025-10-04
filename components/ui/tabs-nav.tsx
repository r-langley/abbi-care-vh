"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface TabsNavProps {
  items: Array<{
    href: string
    label: string
  }>
  className?: string
}

export function TabsNav({ items, className }: TabsNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center justify-center gap-8 border-t border-border", className)}>
      {items.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative font-mono text-sm py-3 transition-colors",
              "hover:text-foreground",
              isActive ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {item.label}
            {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
          </Link>
        )
      })}
    </nav>
  )
}
