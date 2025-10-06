"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface PersonalizeCreamCTAProps {
  onClick: () => void
}

export function PersonalizeCreamCTA({ onClick }: PersonalizeCreamCTAProps) {
  return (
    <Card
      onClick={onClick}
      className="overflow-hidden flex flex-col hover:border-primary transition-colors w-full cursor-pointer border-2 border-muted"
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
      <div className="bg-muted p-4 flex flex-col items-center justify-center gap-3">
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
    </Card>
  )
}
