"use client"
import { SkinScoreCard } from "@/components/ui/skin-score-card"
import { SkinResultsSheet } from "@/components/skin-results-sheet"

interface SkinResultsProps {
  userName: string
  wrinkles: number
  radiance: number
  imperfections: number
}

export function MySkinResults({ userName, wrinkles, radiance, imperfections }: SkinResultsProps) {
  return (
    <div className="bg-[#586158] px-2.5 py-2.5 bg-primary">
      <div className="flex justify-center">
        <div className="max-w-[800px] w-8/12">
          {/* Header */}
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-[5px]">
              <div className="rounded-full bg-white/20 overflow-hidden w-fit h-fit">
                <div className="bg-gradient-to-br from-white/40 to-white/20 w-8 h-8" />
              </div>
              <h2 className="text-white font-normal text-xl">
                {userName}'s <span className="italic font-serif">Skin</span>
              </h2>
            </div>
            <SkinResultsSheet userName={userName} />
          </div>

          <div className="flex gap-2.5">
            <SkinScoreCard score={wrinkles} label="Wrinkles" />
            <SkinScoreCard score={radiance} label="Radiance" />
            <SkinScoreCard score={imperfections} label="Imperfections" />
          </div>
        </div>
      </div>
    </div>
  )
}
