"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

interface PersonalizeCreamCTAProps {
  onClick: () => void
}

export function PersonalizeCreamCTA({ onClick }: PersonalizeCreamCTAProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-[10px] border-2 border-border overflow-hidden flex flex-col hover:border-primary transition-colors w-full border-none"
    >
      <div className="relative h-[200px] overflow-hidden bg-muted">
        <Image
          src="/images/design-mode/image(1).png"
          alt="Personalize your cream"
          fill
          className="object-cover bg-card"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="bg-[#e5e2f3] p-6 flex flex-col items-center justify-center gap-4 min-h-[140px] px-2.5 py-2.5">
        <p className="font-medium text-[18px] leading-[1.2] text-foreground text-center">Personalize your cream</p>
        <Button
          variant="default"
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-sans"
          onClick={(e) => {
            e.stopPropagation()
            onClick()
          }}
        >
          Create My Formula
        </Button>
      </div>
    </button>
  )
}
