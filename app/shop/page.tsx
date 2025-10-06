"use client"

import { useMemo, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"
import { HeroSection } from "@/components/ui/hero-section"
import { PRODUCT_CATEGORIES, SHOP_CATEGORIES } from "@/lib/constants"
import { TraitFilter } from "@/components/trait-filter"
import { ProductCombos } from "@/components/product-combos"
import { ScanCTA } from "@/components/scan-cta"
import { MySkinResults } from "@/components/my-skin-results"
import { useAuth } from "@/lib/auth-context"
import { getIngredientsByTraits } from "@/lib/ingredients-data"
import Link from "next/link"
import Image from "next/image"
import { ChevronRightIcon, PlusIcon, CheckIcon } from "@heroicons/react/24/outline"
import { IngredientCarousel } from "@/components/ingredient-carousel"
import { RecommendedBadge } from "@/components/recommended-badge"

export default function ShopPage() {
  console.log("[v0] ShopPage component rendering")

  const searchParams = useSearchParams()
  const category = searchParams.get("category") || "creams"
  const selectedTraits = searchParams.get("traits")?.split(",").filter(Boolean) || []
  const { isLoggedIn } = useAuth()

  console.log("[v0] Category:", category, "Selected traits:", selectedTraits, "Is logged in:", isLoggedIn)

  const [scanResults, setScanResults] = useState<{
    userName: string
    wrinkles: number
    radiance: number
    imperfections: number
  } | null>(null)

  useEffect(() => {
    const results = localStorage.getItem("skinScanResults")
    if (results) {
      setScanResults(JSON.parse(results))
    }
  }, [])

  const heroContent = {
    creams: {
      title: "Creams",
      description: "Choose Lab Created or Mix-at-Home",
      image: "/images/creams-hero.png",
      imagePosition: "left" as const,
    },
    "simple-solutions": {
      title: "Simple Solutions",
      description: "Targeted treatments for specific concerns",
      image: "/images/simple-solutions-hero.png",
      imagePosition: "right" as const,
    },
    essentials: {
      title: "Essentials",
      description: "Daily basics for your routine",
      image: "/images/essentials-hero.jpg",
      imagePosition: "left" as const,
    },
  }

  const currentHero = heroContent[category as keyof typeof heroContent] || heroContent.creams

  useEffect(() => {
    const preloadImages = [
      "/images/creams-hero.png",
      "/images/simple-solutions-hero.png",
      "/images/essentials-hero.jpg",
    ]

    preloadImages.forEach((src) => {
      const link = document.createElement("link")
      link.rel = "preload"
      link.as = "image"
      link.href = src
      document.head.appendChild(link)
    })
  }, [])

  const { filteredProducts, groupedCreams } = useMemo(() => {
    let filtered: typeof products

    if (category === SHOP_CATEGORIES.CREAMS) {
      const creamCategories = [
        PRODUCT_CATEGORIES.IN_LAB_CREAM,
        PRODUCT_CATEGORIES.MIX_AT_HOME_CREAM,
        PRODUCT_CATEGORIES.ACTIVE_CONCENTRATE,
      ] as const
      filtered = products.filter((p) => (creamCategories as readonly string[]).includes(p.category))

      if (selectedTraits.length > 0) {
        filtered = filtered.filter((p) =>
          selectedTraits.some((trait) => p.traits.some((t) => t.toLowerCase() === trait.toLowerCase())),
        )
      }

      return {
        filteredProducts: filtered,
        groupedCreams: {
          inLab: filtered.filter((p) => p.category === PRODUCT_CATEGORIES.IN_LAB_CREAM),
          mixAtHome: filtered.filter((p) => p.category === PRODUCT_CATEGORIES.MIX_AT_HOME_CREAM),
          activeConcentrate: filtered.filter((p) => p.category === PRODUCT_CATEGORIES.ACTIVE_CONCENTRATE),
        },
      }
    } else if (category === SHOP_CATEGORIES.SIMPLE_SOLUTIONS) {
      filtered = products.filter((p) => p.category === PRODUCT_CATEGORIES.SIMPLE_SOLUTION)
    } else if (category === SHOP_CATEGORIES.ESSENTIALS) {
      filtered = products.filter((p) => p.category === PRODUCT_CATEGORIES.ESSENTIAL)
    } else {
      filtered = products
    }

    if (selectedTraits.length > 0) {
      filtered = filtered.filter((p) =>
        selectedTraits.some((trait) => p.traits.some((t) => t.toLowerCase() === trait.toLowerCase())),
      )
    }

    return { filteredProducts: filtered, groupedCreams: null }
  }, [category, selectedTraits])

  const recommendedActiveIngredients = useMemo(() => {
    if (!scanResults && !isLoggedIn) return []
    const traits = ["Wrinkles", "Radiance", "Imperfections"]
    const ingredients = getIngredientsByTraits(traits).slice(0, 3)
    console.log("[v0] Recommended active ingredients:", ingredients)
    return ingredients
  }, [scanResults, isLoggedIn])

  const recommendedCreamBase = useMemo(() => {
    if ((!scanResults && !isLoggedIn) || !groupedCreams) return null
    return groupedCreams.inLab.find((p) => p.id === "inlab-aloe-vera") || groupedCreams.inLab[0]
  }, [scanResults, isLoggedIn, groupedCreams])

  const sortedMixAtHome = useMemo(() => {
    if (!groupedCreams || category !== "creams") return groupedCreams?.mixAtHome || []

    // Recommended Mix-at-Home based on user traits
    const recommendedIds = ["cream-velvety"]

    return [...groupedCreams.mixAtHome].sort((a, b) => {
      const aRecommended = recommendedIds.includes(a.id)
      const bRecommended = recommendedIds.includes(b.id)
      if (aRecommended && !bRecommended) return -1
      if (!aRecommended && bRecommended) return 1
      return 0
    })
  }, [groupedCreams, category])

  const sortedActiveConcentrates = useMemo(() => {
    if (!groupedCreams || category !== "creams") return groupedCreams?.activeConcentrate || []

    // Recommended Active Concentrates based on user traits (Wrinkles, Radiance, Imperfections)
    const recommendedIds = ["concentrate-02-wrinkles", "concentrate-01-hydration"]

    return [...groupedCreams.activeConcentrate].sort((a, b) => {
      const aRecommended = recommendedIds.includes(a.id)
      const bRecommended = recommendedIds.includes(b.id)
      if (aRecommended && !bRecommended) return -1
      if (!aRecommended && bRecommended) return 1
      return 0
    })
  }, [groupedCreams, category])

  const showScanResults = (scanResults || isLoggedIn) && category === "creams"

  console.log("[v0] Show scan results:", showScanResults, "Recommended cream base:", recommendedCreamBase)

  return (
    <>
      <Header />
      <main className="min-h-screen pb-0">
        {showScanResults ? (
          <MySkinResults
            userName={scanResults?.userName || "User"}
            wrinkles={scanResults?.wrinkles || 25}
            radiance={scanResults?.radiance || 67}
            imperfections={scanResults?.imperfections || 55}
          />
        ) : (
          <>
            <HeroSection
              key={category}
              title={currentHero.title}
              description={currentHero.description}
              image={currentHero.image}
              imagePosition={currentHero.imagePosition}
            />
            <TraitFilter />
          </>
        )}

        <div className="py-5 px-5">
          {category === "creams" && groupedCreams ? (
            <div className="space-y-10">
              {showScanResults && recommendedCreamBase ? (
                <div className="flex flex-col gap-[20px]">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-[10px]">
                      <h2 className="font-semibold text-[#586158] leading-[1.35] text-foreground tracking-tight text-2xl">
                        Personalized <span className="font-serif italic font-medium">Cream</span>
                      </h2>
                    </div>
                    <Link
                      href="/shop?category=creams"
                      className="flex items-center gap-1 text-[16px] font-medium text-[#586158] hover:opacity-70 transition-opacity"
                    >
                      Change
                      <ChevronRightIcon className="h-5 w-5" />
                    </Link>
                  </div>

                  <Link
                    href={`/product/${recommendedCreamBase.id}`}
                    className="bg-white rounded-[10px] border-2 border-[#f5f6f5] overflow-hidden flex flex-col hover:border-[#586158] transition-colors"
                  >
                    <div className="relative h-[200px] overflow-hidden">
                      <Image
                        src="/minimalist-cosmetic-pump-bottle-product-photograph.jpg"
                        alt={recommendedCreamBase.name}
                        fill
                        className="object-cover"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <RecommendedBadge className="absolute top-3 left-3" />
                    </div>
                    <div className="bg-[#f5f6f5] p-[10px] pb-[20px] flex flex-row items-end justify-between gap-[10px]">
                      <div className="flex flex-col gap-[10px]">
                        <div className="flex flex-col gap-[5px]">
                          <p className="font-semibold text-[18px] leading-[1.15] text-[#586158] tracking-normal">
                            {recommendedCreamBase.name}
                          </p>
                          <p className="font-medium text-[14px] tracking-[-0.28px] text-[#586158] leading-[1.15]">
                            Cream Base
                          </p>
                        </div>
                        <p
                          className="font-medium text-[13px] tracking-[-0.26px] text-[#586158] leading-[1.15]"
                          style={{ fontFamily: "var(--font-geist-mono)", fontVariationSettings: "'wdth' 100" }}
                        >
                          ${recommendedCreamBase.price.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={(e) => e.preventDefault()}
                        className="bg-[#586158] rounded-full size-[32px] flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity"
                      >
                        <PlusIcon className="h-5 w-5 text-[#f5f6f5]" />
                      </button>
                    </div>
                  </Link>

                  <div className="flex flex-col gap-[15px]">
                    <p className="text-center text-[#586158] text-xl font-normal text-foreground">
                      <span className="font-medium">with </span>
                      <span className="font-serif italic font-medium text-2xl">Actives</span>
                      <span className="font-medium"> for</span>
                    </p>

                    <div className="flex items-center justify-center gap-5">
                      {["Wrinkles", "Radiance", "Imperfections"].map((trait) => (
                        <div key={trait} className="flex items-center gap-1">
                          <CheckIcon className="text-[#586158] w-4 h-4" />
                          <span className="font-medium text-[#586158] text-sm">{trait}</span>
                        </div>
                      ))}
                    </div>

                    <IngredientCarousel ingredients={recommendedActiveIngredients} />
                  </div>
                </div>
              ) : (
                groupedCreams.inLab.length > 0 && (
                  <div className="flex flex-col gap-[20px]">
                    {!showScanResults && selectedTraits.length === 0 && (
                      <div className="md:hidden">
                        <ScanCTA />
                      </div>
                    )}

                    <div className="flex flex-col gap-[10px]">
                      <h2 className="font-semibold text-[#586158] leading-[1.35] text-foreground tracking-tight text-2xl">
                        In Lab
                      </h2>
                      <p className="text-[16px] tracking-[-0.32px] text-[#586158] leading-[1.35] text-foreground font-normal">
                        Made-to-order in our French lab — just for you.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[10px]">
                      {groupedCreams.inLab.map((product) => (
                        <ProductCard key={product.id} product={product} showRecommended={selectedTraits.length > 0} />
                      ))}
                    </div>
                  </div>
                )
              )}

              {sortedMixAtHome.length > 0 && (
                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-col gap-[5px]">
                    <h2 className="font-semibold text-[#586158] text-foreground text-2xl tracking-tight">
                      Mix at Home
                    </h2>
                    <p className="text-[16px] tracking-[-0.32px] text-[#586158] leading-[1.35] text-foreground font-normal">
                      Create your own routines. Mix a specific base and active concentrates.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[10px]">
                    {sortedMixAtHome.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        showRecommended={showScanResults || selectedTraits.length > 0}
                      />
                    ))}
                  </div>
                </div>
              )}

              {sortedActiveConcentrates.length > 0 && (
                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-col gap-[5px]">
                    <h2 className="font-semibold text-[#586158] text-foreground text-2xl tracking-tight">
                      Active Concentrates
                    </h2>
                    <p className="text-[16px] tracking-[-0.32px] text-[#586158] leading-[1.35] text-foreground font-normal">
                      Targeted treatments to address specific skin concerns
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[10px]">
                    {sortedActiveConcentrates.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        showRecommended={showScanResults || selectedTraits.length > 0}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[10px]">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} showRecommended={selectedTraits.length > 0} />
              ))}
            </div>
          )}
        </div>

        {category === "creams" && <ProductCombos />}
      </main>
      <Footer />
    </>
  )
}
