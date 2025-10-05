"use client"

import { useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"
import { HeroSection } from "@/components/ui/hero-section"
import { PRODUCT_CATEGORIES, SHOP_CATEGORIES } from "@/lib/constants"
import { TraitFilter } from "@/components/trait-filter"
import { CartFooter } from "@/components/cart-footer"
import { ScanCTA } from "@/components/scan-cta"
import { ProductCombos } from "@/components/product-combos"

export default function ShopPage() {
  const searchParams = useSearchParams()
  const category = searchParams.get("category") || "creams"
  const selectedTraits = searchParams.get("traits")?.split(",").filter(Boolean) || []

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

  // Preload hero images on mount to prevent flashing
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

  // Optimized: Single memoized computation for both filtering and grouping
  const { filteredProducts, groupedCreams } = useMemo(() => {
    let filtered: typeof products

    if (category === SHOP_CATEGORIES.CREAMS) {
      const creamCategories = [
        PRODUCT_CATEGORIES.IN_LAB_CREAM,
        PRODUCT_CATEGORIES.MIX_AT_HOME_CREAM,
        PRODUCT_CATEGORIES.ACTIVE_CONCENTRATE,
      ] as const
      filtered = products.filter((p) => (creamCategories as readonly string[]).includes(p.category))

      // Apply trait filters if selected
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

    // Apply trait filters for non-cream categories
    if (selectedTraits.length > 0) {
      filtered = filtered.filter((p) =>
        selectedTraits.some((trait) => p.traits.some((t) => t.toLowerCase() === trait.toLowerCase())),
      )
    }

    return { filteredProducts: filtered, groupedCreams: null }
  }, [category, selectedTraits])

  return (
    <>
      <Header />
      <main className="min-h-screen pb-0">
        <HeroSection
          key={category}
          title={currentHero.title}
          description={currentHero.description}
          image={currentHero.image}
          imagePosition={currentHero.imagePosition}
        />

        <TraitFilter />

        <div className="py-5 px-5">
          {category === "creams" && groupedCreams ? (
            <div className="space-y-10">
              {/* In Lab */}
              {groupedCreams.inLab.length > 0 && (
                <div className="flex flex-col gap-[20px]">
                  {/* Show scan CTA if no traits are selected */}
                  {selectedTraits.length === 0 && <ScanCTA />}

                  <div className="flex flex-col gap-[10px]">
                    <h2 className="font-semibold text-[#586158] leading-[1.35] text-foreground tracking-tight text-2xl">
                      In Lab
                    </h2>
                    <p className="font-medium text-[16px] tracking-[-0.32px] text-[#586158] leading-[1.35]">
                      Made-to-order in our French lab — just for you.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-[10px]">
                    {groupedCreams.inLab.map((product) => (
                      <ProductCard key={product.id} product={product} showRecommended={selectedTraits.length > 0} />
                    ))}
                  </div>
                </div>
              )}

              {/* Mix at Home */}
              {groupedCreams.mixAtHome.length > 0 && (
                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-col gap-[5px]">
                    <h2 className="font-semibold text-[#586158] text-foreground tracking-tight text-2xl">
                      Mix at Home
                    </h2>
                    <p className="font-medium text-[14px] tracking-[-0.28px] text-[#586158]">
                      Create your own routines. Mix a specific base and active concentrates.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-[10px]">
                    {groupedCreams.mixAtHome.map((product) => (
                      <ProductCard key={product.id} product={product} showRecommended={selectedTraits.length > 0} />
                    ))}
                  </div>
                </div>
              )}

              {/* Active Concentrates */}
              {groupedCreams.activeConcentrate.length > 0 && (
                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-col gap-[5px]">
                    <h2 className="font-semibold text-[#586158] text-foreground text-2xl tracking-tight">
                      Active Concentrates
                    </h2>
                    <p className="font-medium text-[14px] tracking-[-0.28px] text-[#586158]">
                      Targeted treatments to address specific skin concerns
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-[10px]">
                    {groupedCreams.activeConcentrate.map((product) => (
                      <ProductCard key={product.id} product={product} showRecommended={selectedTraits.length > 0} />
                    ))}
                  </div>
                </div>
              )}

              {/* Product Combos */}
              <ProductCombos />
            </div>
          ) : (
            // Other categories show standard grid
            <div className="grid grid-cols-2 gap-[10px]">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} showRecommended={selectedTraits.length > 0} />
              ))}
            </div>
          )}
        </div>
      </main>
      <CartFooter headingText="Review your Routine" buttonText="CHECKOUT" />
      <Footer />
    </>
  )
}
