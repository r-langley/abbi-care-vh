"use client"

import type React from "react"

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
    <Link href={href} className={cn("transition-colors p-0", className)}>
      {children}
    </Link>
  )
}
