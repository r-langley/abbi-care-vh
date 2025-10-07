"use client"

import { useMemo, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"
import { HeroSection } from "@/components/ui/hero-section" // Import HeroSection component
import { PRODUCT_CATEGORIES, SHOP_CATEGORIES } from "@/lib/constants"
import { TraitFilter } from "@/components/trait-filter"
import { ProductCombos } from "@/components/product-combos"
import { ScanCTA } from "@/components/scan-cta"
import { MySkinResults } from "@/components/my-skin-results"
import { useAuth } from "@/lib/auth-context"
import { getIngredientsByTraits } from "@/lib/ingredients-data"
import Link from "next/link"
import Image from "next/image"
import { PlusIcon, CheckIcon } from "@heroicons/react/24/outline"
import { IngredientCarousel } from "@/components/ingredient-carousel"
import { RecommendedBadge } from "@/components/recommended-badge"
import { RecommendedCarousel } from "@/components/recommended-carousel"
import { PersonalizeCreamCTA } from "@/components/personalize-cream-cta"
import { PersonalizeModal } from "@/components/personalize-modal"

export default function ShopPage() {
  console.log("[v0] ShopPage component rendering")

  const searchParams = useSearchParams()
  const category = searchParams.get("category") || "creams"
  const selectedTraits = searchParams.get("traits")?.split(",").filter(Boolean) || []
  const { isLoggedIn, userInfo } = useAuth()

  console.log("[v0] Category:", category, "Selected traits:", selectedTraits, "Is logged in:", isLoggedIn)

  const [scanResults, setScanResults] = useState<{
    userName: string
    wrinkles: number
    radiance: number
    imperfections: number
  } | null>(null)

  const [personalizeData, setPersonalizeData] = useState<{
    traits: string[]
    age: number
  } | null>(null)
  const [showPersonalizeModal, setShowPersonalizeModal] = useState(false)

  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.removeItem("personalizeData")
      setPersonalizeData(null)
      console.log("[v0] Cleared personalizeData for logged-out user")
    }
  }, [isLoggedIn])

  useEffect(() => {
    const results = localStorage.getItem("skinScanResults")
    if (results) {
      setScanResults(JSON.parse(results))
    }

    if (isLoggedIn) {
      const personalizeResults = localStorage.getItem("personalizeData")
      if (personalizeResults) {
        setPersonalizeData(JSON.parse(personalizeResults))
      }
    }
  }, [isLoggedIn])

  console.log("[v0] personalizeData:", personalizeData)

  const handlePersonalizeComplete = (data: { traits: string[]; age: number }) => {
    localStorage.setItem("personalizeData", JSON.stringify(data))
    setPersonalizeData(data)
  }

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
    if (!scanResults && !isLoggedIn && !personalizeData) return []

    const traits = personalizeData?.traits || ["Wrinkles", "Radiance", "Imperfections"]
    const ingredients = getIngredientsByTraits(traits).slice(0, 3)
    console.log("[v0] Recommended active ingredients:", ingredients)
    return ingredients
  }, [scanResults, isLoggedIn, personalizeData])

  const recommendedCreamBase = useMemo(() => {
    if (!groupedCreams) return null

    if (!scanResults && !isLoggedIn && !personalizeData) {
      console.log("[v0] No cream recommendation - user needs to personalize first")
      return null
    }

    if (personalizeData && groupedCreams) {
      const userTraits = personalizeData.traits.map((t) => t.toLowerCase())

      const creamWithScores = groupedCreams.inLab.map((cream) => ({
        cream,
        score: cream.traits.filter((t) => userTraits.includes(t.toLowerCase())).length,
      }))

      const bestMatch = creamWithScores.sort((a, b) => b.score - a.score)[0]
      console.log("[v0] Personalized cream recommendation:", bestMatch?.cream)
      return bestMatch?.cream || groupedCreams.inLab[0]
    }

    console.log("[v0] Default cream recommendation for logged-in user")
    return groupedCreams.inLab.find((p) => p.id === "inlab-aloe-vera") || groupedCreams.inLab[0]
  }, [scanResults, isLoggedIn, personalizeData, groupedCreams])

  const sortedMixAtHome = useMemo(() => {
    if (!groupedCreams || category !== "creams") return groupedCreams?.mixAtHome || []

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

    const recommendedIds = ["concentrate-02-wrinkles", "concentrate-01-hydration"]

    return [...groupedCreams.activeConcentrate].sort((a, b) => {
      const aRecommended = recommendedIds.includes(a.id)
      const bRecommended = recommendedIds.includes(b.id)
      if (aRecommended && !bRecommended) return -1
      if (!aRecommended && bRecommended) return 1
      return 0
    })
  }, [groupedCreams, category])

  const recommendedProducts = useMemo(() => {
    if (!scanResults && !isLoggedIn && !personalizeData) return []

    const essentialsAndSolutions = products.filter(
      (p) => p.category === PRODUCT_CATEGORIES.ESSENTIAL || p.category === PRODUCT_CATEGORIES.SIMPLE_SOLUTION,
    )

    return essentialsAndSolutions.slice(0, 6)
  }, [scanResults, isLoggedIn, personalizeData])

  const showScanResults = (scanResults || isLoggedIn) && category === "creams"
  const showPersonalizedCream = (scanResults || isLoggedIn || personalizeData) && category === "creams"

  console.log("[v0] Show scan results:", showScanResults, "Recommended cream base:", recommendedCreamBase)

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

  return (
    <>
      <Header />
      <main className="min-h-screen pb-0">
        {showScanResults ? (
          <MySkinResults
            userName={userInfo?.firstName || scanResults?.userName || "User"}
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

        <div className="py-5 px-5 max-w-[900px] mx-auto">
          {category === "creams" && groupedCreams ? (
            <div className="space-y-10">
              {showPersonalizedCream && recommendedCreamBase ? (
                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-col md:grid md:grid-cols-2 gap-[10px] md:gap-8">
                    <div className="flex flex-col gap-[10px] px-5 py-5 md:justify-between">
                      <h2 className="text-[#586158] leading-[1.35] text-foreground tracking-tight text-2xl font-medium">
                        Personalized <span className="font-serif italic font-medium">Cream</span>
                      </h2>
                      <p className="hidden md:block tracking-[-0.32px] text-[#586158] leading-[1.35] text-foreground font-normal text-sm">
                        Your personalized cream base is selected based on your skin concerns and age. Complete your
                        routine by adding active concentrates below for targeted treatment.
                      </p>
                    </div>

                    <div className="w-full">
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
                        <div className="bg-[#f5f6f5] p-[10px] pb-[20px] flex flex-row items-end justify-between gap-[10px] bg-muted">
                          <div className="flex flex-col gap-[10px]">
                            <div className="flex flex-col gap-2.5">
                              <p className="text-[18px] leading-[1.15] text-[#586158] tracking-normal text-foreground font-medium">
                                {recommendedCreamBase.name}
                              </p>
                              <p className="font-medium text-[14px] tracking-[-0.28px] text-[#586158] leading-[1.15] text-foreground">
                                Cream Base
                              </p>
                            </div>
                            <p
                              className="font-medium text-[13px] tracking-[-0.26px] leading-[1.15] text-primary"
                              style={{ fontFamily: "var(--font-geist-mono)", fontVariationSettings: "'wdth' 100" }}
                            >
                              ${recommendedCreamBase.price.toFixed(2)}
                            </p>
                          </div>
                          <button
                            onClick={(e) => e.preventDefault()}
                            className="bg-[#586158] rounded-full size-[32px] flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity bg-accent"
                          >
                            <PlusIcon className="h-5 w-5 text-[#f5f6f5]" />
                          </button>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="flex flex-col gap-[15px]">
                    <p className="text-center text-[#586158] text-xl font-normal text-foreground">
                      <span className="font-medium">with </span>
                      <span className="font-serif italic font-medium text-2xl">Actives</span>
                      <span className="font-medium"> for</span>
                    </p>

                    <div className="flex items-center justify-center gap-5">
                      {(personalizeData?.traits || ["Wrinkles", "Radiance", "Imperfections"]).map((trait) => (
                        <div key={trait} className="flex items-center gap-1">
                          <CheckIcon className="text-[#586158] w-4 h-4 text-foreground" />
                          <span className="font-medium text-[#586158] text-sm text-foreground capitalize">{trait}</span>
                        </div>
                      ))}
                    </div>

                    <IngredientCarousel ingredients={recommendedActiveIngredients} />
                  </div>
                </div>
              ) : (
                groupedCreams.inLab.length > 0 && (
                  <div className="flex flex-col md:grid md:grid-cols-2 gap-[10px] md:gap-8 pb-5 md:pb-0">
                    {!showScanResults && selectedTraits.length === 0 && (
                      <div className="md:hidden">
                        <ScanCTA />
                      </div>
                    )}

                    <div className="flex flex-col gap-[10px] md:justify-start">
                      <h2 className="text-[#586158] leading-[1.35] text-foreground tracking-tight text-2xl font-medium">
                        In Lab
                      </h2>
                      <p className="md:hidden tracking-[-0.32px] text-[#586158] leading-[1.35] text-foreground font-normal text-sm">
                        Made-to-order in our French lab — just for you.
                      </p>
                      <p className="hidden md:block tracking-[-0.32px] text-[#586158] leading-[1.5] text-foreground font-normal text-sm">
                        Each In Lab cream is custom-formulated and made-to-order in our French laboratory, crafted
                        specifically for your unique skin needs.
                      </p>
                    </div>

                    <div className="w-full">
                      {!isLoggedIn && !scanResults && selectedTraits.length === 0 ? (
                        <PersonalizeCreamCTA onClick={() => setShowPersonalizeModal(true)} />
                      ) : (
                        <div className="grid grid-cols-2 md:grid-cols-1 gap-[10px]">
                          {groupedCreams.inLab.slice(0, 1).map((product) => (
                            <ProductCard
                              key={product.id}
                              product={product}
                              showRecommended={selectedTraits.length > 0}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )
              )}

              {sortedMixAtHome.length > 0 && (
                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-col gap-2.5">
                    <h2 className="text-[#586158] text-foreground text-2xl tracking-tight font-medium">Mix at Home</h2>
                    <p className="tracking-[-0.32px] text-[#586158] leading-[1.35] text-foreground font-normal text-sm">
                      Create your own routines. Mix a specific base and active concentrates.
                    </p>
                    <p className="text-[18px] tracking-tight leading-[1.2] mt-2 text-center">
                      <span className="font-serif italic text-foreground font-normal tracking-tight text-xl">
                        Mix-at-Home
                      </span>{" "}
                      <span className="font-sans text-foreground font-medium">Base Creams</span>
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
                  <div className="flex flex-col gap-2.5">
                    <h2 className="text-[#586158] text-foreground text-2xl tracking-tight font-medium">
                      Active Concentrates
                    </h2>
                    <p className="tracking-[-0.32px] text-[#586158] leading-[1.35] text-foreground font-normal text-sm">
                      Concentrated solutions for your skincare needs.
                    </p>
                    <p className="text-[18px] tracking-tight leading-[1.2] mt-2 text-center">
                      <span className="font-serif italic text-foreground font-normal tracking-tight text-xl">
                        Mix-at-Home
                      </span>{" "}
                      <span className="font-sans text-foreground font-medium">Active Concentrates</span>
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

        {category === "creams" && recommendedProducts.length > 0 && (
          <RecommendedCarousel products={recommendedProducts} />
        )}
      </main>
      <Footer />

      <PersonalizeModal
        open={showPersonalizeModal}
        onOpenChange={setShowPersonalizeModal}
        onComplete={handlePersonalizeComplete}
      />
    </>
  )
}
