"use client"

import { SparklesIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function ScanCTA() {
  return (
    <div className="hidden md:flex bg-[#f5f6f5] flex-col gap-[20px] items-center justify-center p-[20px] rounded-[10px] w-full bg-sidebar text-muted">
      <div className="flex flex-col gap-[10px] items-center w-full">
        <div className="flex items-center justify-center size-[24px]">
          <SparklesIcon className="size-[20px] text-[#586158]" />
        </div>
        <p className="font-semibold text-[24px] tracking-[-0.48px] text-[#586158] text-center leading-[1.35] text-foreground">
          97% Accurate, 100% you
        </p>
        <p className="font-medium text-[16px] tracking-[-0.32px] text-[#373737] text-center leading-[1.35] max-w-[300px]">
          Scan your skin for best results
        </p>
      </div>
      <Button asChild size="lg" className="font-mono">
        <Link href="/skin-analysis">Create My Formula</Link>
      </Button>
    </div>
  )
}
