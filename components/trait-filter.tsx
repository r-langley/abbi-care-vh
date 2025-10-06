"use client"

import { cn } from "@/lib/utils"
import { traits } from "@/lib/products"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

export function TraitFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get selected traits from URL
  const selectedTraits = searchParams.get("traits")?.split(",").filter(Boolean) || []
  const category = searchParams.get("category") || "creams"

  const toggleTrait = useCallback(
    (traitId: string) => {
      const params = new URLSearchParams(searchParams.toString())

      if (selectedTraits.includes(traitId)) {
        // Remove trait
        const newTraits = selectedTraits.filter((t) => t !== traitId)
        if (newTraits.length > 0) {
          params.set("traits", newTraits.join(","))
        } else {
          params.delete("traits")
        }
      } else {
        // Add trait
        const newTraits = [...selectedTraits, traitId]
        params.set("traits", newTraits.join(","))
      }

      router.push(`/shop?${params.toString()}`)
    },
    [selectedTraits, searchParams, router],
  )

  const clearTraits = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("traits")
    router.push(`/shop?${params.toString()}`)
  }, [searchParams, router])

  return (
    <div className="bg-white flex gap-[5px] items-start overflow-x-auto px-[10px] py-[10px] scrollbar-hide justify-start md:justify-center">
      <button
        onClick={clearTraits}
        className={cn(
          "flex items-center gap-[5px] px-[10px] py-[5px] rounded-[100px] shrink-0 transition-colors",
          selectedTraits.length === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
        )}
      >
        <span className="font-semibold text-[14px] whitespace-nowrap">All</span>
      </button>
      {traits.map((trait) => (
        <button
          key={trait.id}
          onClick={() => toggleTrait(trait.id)}
          className={cn(
            "flex items-center gap-[5px] px-[10px] py-[5px] rounded-[100px] shrink-0 transition-colors",
            selectedTraits.includes(trait.id) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
          )}
        >
          <span className="font-semibold text-[14px] whitespace-nowrap">{trait.name}</span>
        </button>
      ))}
    </div>
  )
}
