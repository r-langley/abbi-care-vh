"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface TraitLinkProps {
  traitId: string
  children: React.ReactNode
  className?: string
  category?: string
}

export function TraitLink({ traitId, children, className, category = "creams" }: TraitLinkProps) {
  const href = `/shop?category=${category}&traits=${traitId}`
  
  return (
    <Link href={href} className={cn("transition-colors", className)}>
      {children}
    </Link>
  )
}
