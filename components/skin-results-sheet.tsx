"use client"

import { useState } from "react"
import { XMarkIcon, ChevronRightIcon, PlusIcon } from "@heroicons/react/24/solid"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { CategoryCarousel } from "@/components/category-carousel"
import { products } from "@/lib/products"
import { RecommendedBadge } from "@/components/recommended-badge"
import { SpiderChart } from "@/components/spider-chart"

interface SkinResultsSheetProps {
  userName?: string
  currentTrait?: string
}

const traits = [
  { id: "wrinkles", name: "Wrinkles", score: 25, color: "#34C759" },
  { id: "radiance", name: "Radiance", score: 67, color: "#34C759" },
  { id: "imperfections", name: "Imperfections", score: 55, color: "#FF9500" },
  { id: "spots", name: "Spots", score: 45, color: "#FF9500" },
  { id: "hydration", name: "Hydration", score: 72, color: "#34C759" },
  { id: "sensitivity", name: "Sensitivity", score: 38, color: "#FF9500" },
  { id: "shine", name: "Shine", score: 52, color: "#FF9500" },
  { id: "texture", name: "Texture", score: 68, color: "#34C759" },
]

export function SkinResultsSheet({ userName = "Alya", currentTrait = "wrinkles" }: SkinResultsSheetProps) {
  const [selectedTrait, setSelectedTrait] = useState(currentTrait)
  const trait = traits.find((t) => t.id === selectedTrait) || traits[0]

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="text-white flex items-center gap-1 hover:opacity-80 transition-colors">
          <span className="text-base">See full results</span>
          <ChevronRightIcon className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[90vh] overflow-y-auto rounded-t-[10px] p-0 max-w-[800px] mx-auto">
        <SheetTitle className="sr-only">{userName}'s Skin Analysis Results</SheetTitle>
        
        {/* Header */}
        <div className="sticky top-0 backdrop-blur-sm bg-white/95 px-5 py-2.5 flex items-center justify-between border-b border-[#e7e7e7] z-10">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-[#f5f6f5] overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-[#586158] to-[#3e463e]" />
            </div>
          </div>
          <p className="font-medium text-[24px] tracking-[-0.48px] text-black leading-[1.15] flex-1 text-center">
            <span>{userName}'s </span>
            <span className="italic font-serif">Skin</span>
          </p>
          <div className="bg-[#f5f6f5] rounded-full size-8 flex items-center justify-center">
            <SheetTrigger asChild>
              <button>
                <XMarkIcon className="size-5 text-[#586158]" />
              </button>
            </SheetTrigger>
          </div>
        </div>

        {/* Spider Chart Section */}
        <div className="bg-[#f5f6f5] px-5 py-[50px] flex flex-col items-center justify-center">
          <div className="w-full max-w-[300px]">
            <SpiderChart
              data={traits.map((t) => ({
                trait: t.name,
                score: t.score,
                active: t.id === selectedTrait,
              }))}
              size={300}
            />
          </div>
        </div>

        {/* Trait Carousel - Horizontal Scroll */}
        <div className="px-5 py-5">
          <div className="flex gap-[5px] overflow-x-auto pb-2 -mx-5 px-5">
            {traits.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTrait(t.id)}
                className={`bg-white rounded-lg p-2.5 border min-w-[112px] shrink-0 ${
                  selectedTrait === t.id ? "border-[#586158]" : "border-[#e7e7e7]"
                }`}
              >
                <div className="flex flex-col gap-2.5 items-start">
                  <p className="font-bold text-[20px] tracking-[-0.4px] text-[#586158] leading-[1.15]">{t.score}</p>
                  <p className="font-medium text-[14px] tracking-[-0.28px] text-[#586158] leading-[1.15]">{t.name}</p>
                  <div className="flex gap-[2px]">
                    <div className={`h-[3px] w-[28px] ${t.score < 40 ? "bg-[#ff3b30]" : "opacity-25 bg-[#ff3b30]"}`} />
                    <div
                      className={`h-[3px] w-[28px] ${
                        t.score >= 40 && t.score < 70 ? "bg-[#ff9500]" : "opacity-25 bg-[#ff9500]"
                      }`}
                    />
                    <div className={`h-[3px] w-[28px] ${t.score >= 70 ? "bg-[#34c759]" : "opacity-25 bg-[#34c759]"}`} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Trait Details */}
        <div className="px-5 py-5 flex flex-col gap-5">
          <div className="flex flex-col gap-[23px]">
            <div className="flex flex-col gap-2.5">
              <p className="font-medium text-[24px] tracking-[-0.48px] text-black leading-[1.15]">{trait.name}</p>
              <p className="font-normal text-[16px] tracking-[-0.32px] text-black leading-[1.35]">
                Focus on anti-aging prevention and treatment. Fine lines are primarily concentrated around the outer eye
                corners (crow's feet area).
              </p>
            </div>
          </div>

          <button className="bg-[#f5f6f5] px-4 py-3 rounded-lg flex items-center gap-[5px] justify-center">
            <p className="font-medium text-[16px] tracking-[-0.32px] text-[#586158] leading-[1.35]">See Yours</p>
            <ChevronRightIcon className="size-4 text-[#586158]" />
          </button>
        </div>

        {/* Recommended Creams */}
        <div className="px-5 py-5 flex flex-col gap-[23px]">
          <p className="font-medium text-[24px] tracking-[-0.48px] text-black leading-[1.15]">
            <span>Recommended </span>
            <span className="italic font-serif">Creams</span>
          </p>
          <Link href="/product/inlab-aloe-vera" className="bg-white rounded-[10px] border-2 border-[#f5f6f5] overflow-hidden block hover:border-[#586158] transition-colors">
            <div className="relative h-[200px] bg-white">
              <Image
                src="/minimalist-cosmetic-pump-bottle-product-photograph.jpg"
                alt="Aloe Vera Cream"
                fill
                className="object-cover"
              />
              <RecommendedBadge variant="compact" className="absolute top-2.5 left-2.5" />
            </div>
            <div className="bg-[#f5f6f5] p-[10px] pb-[20px] flex flex-col gap-[10px]">
              <div className="flex flex-col gap-[10px]">
                <div className="flex flex-col gap-[5px]">
                  <p className="font-semibold text-[18px] leading-[1.15] text-[#586158] tracking-normal">Aloe Vera</p>
                  <p className="font-medium text-[14px] tracking-[-0.28px] text-[#586158] leading-[1.15]">Cream Base</p>
                </div>
                <p
                  className="font-medium text-[13px] tracking-[-0.26px] text-[#586158] leading-[1.15]"
                  style={{ fontFamily: "var(--font-geist-mono)", fontVariationSettings: "'wdth' 100" }}
                >
                  $89.00
                </p>
              </div>
              <button 
                onClick={(e) => e.preventDefault()}
                className="bg-[#586158] rounded-full size-[32px] flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <PlusIcon className="size-[20px] text-[#f5f6f5]" />
              </button>
            </div>
          </Link>
        </div>

        {/* Active Concentrates */}
        <div className="px-5 py-5">
          <CategoryCarousel
            title="Active Concentrates"
            description="Targeted treatments for your skin needs"
            products={products.filter((p) => p.category === "Active Concentrate").slice(0, 5)}
            shopLink="/shop?category=creams"
          />
        </div>

        {/* Simple Solution */}
        <div className="px-5 py-5 flex flex-col gap-[23px]">
          <div className="flex flex-col gap-2.5">
            <p className="font-medium text-[24px] tracking-[-0.48px] text-black leading-[1.15]">
              {trait.name} Simple Solution
            </p>
            <p className="font-normal text-[16px] tracking-[-0.32px] text-black leading-[1.35]">
              Products targeting this skin trait.
            </p>
          </div>
          <Link href="/product/solution-smooth-operator" className="bg-white rounded-[10px] border-2 border-[#f5f6f5] overflow-hidden block hover:border-[#586158] transition-colors">
            <div className="relative h-[200px] bg-white">
              <Image
                src="/minimalist-cosmetic-pump-bottle-product-photograph.jpg"
                alt="The Smooth Operator"
                fill
                className="object-cover"
              />
            </div>
            <div className="bg-[#f5f6f5] p-[10px] pb-[20px] flex flex-col gap-[10px]">
              <div className="flex flex-col gap-[10px]">
                <div className="flex flex-col gap-[5px]">
                  <p className="font-semibold text-[18px] leading-[1.15] text-[#586158] tracking-normal">The Smooth Operator</p>
                </div>
                <p
                  className="font-medium text-[13px] tracking-[-0.26px] text-[#586158] leading-[1.15]"
                  style={{ fontFamily: "var(--font-geist-mono)", fontVariationSettings: "'wdth' 100" }}
                >
                  $99.00
                </p>
              </div>
              <button 
                onClick={(e) => e.preventDefault()}
                className="bg-[#586158] rounded-full size-[32px] flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <PlusIcon className="size-[20px] text-[#f5f6f5]" />
              </button>
            </div>
          </Link>
        </div>

      </SheetContent>
    </Sheet>
  )
}
