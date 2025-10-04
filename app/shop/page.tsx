"use client"

import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"
import { HeroSection } from "@/components/ui/hero-section"
import { SectionHeading } from "@/components/ui/typography"

export default function ShopPage() {
  const searchParams = useSearchParams()
  const category = searchParams.get("category") || "creams"

  const heroContent = {
    creams: {
      title: "Creams",
      description: "Custom formulas for your unique skin needs and goals.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LEPlqvKzEkK6J5dqJznJE9V0ClyAgm.png",
      imageAlt: "Skincare application",
    },
    "simple-solutions": {
      title: "Simple Solutions",
      description: "Targeted treatments for specific concerns, simplified and effective.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LEPlqvKzEkK6J5dqJznJE9V0ClyAgm.png",
      imageAlt: "Simple skincare solutions",
    },
    essentials: {
      title: "Essentials",
      description: "Daily basics that complement your personalized routine perfectly.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LEPlqvKzEkK6J5dqJznJE9V0ClyAgm.png",
      imageAlt: "Skincare essentials",
    },
  }

  const currentHero = heroContent[category as keyof typeof heroContent] || heroContent.creams

  const filteredProducts = useMemo(() => {
    if (category === "creams") {
      return products.filter((p) => ["In-Lab Cream", "Mix at Home Cream", "Active Concentrate"].includes(p.category))
    } else if (category === "simple-solutions") {
      return products.filter((p) => p.category === "Simple Solution")
    } else if (category === "essentials") {
      return products.filter((p) => p.category === "Essential")
    }
    return products
  }, [category])

  const groupedCreams = useMemo(() => {
    if (category !== "creams") return null

    return {
      inLab: filteredProducts.filter((p) => p.category === "In-Lab Cream"),
      mixAtHome: filteredProducts.filter((p) => p.category === "Mix at Home Cream"),
      activeConcentrate: filteredProducts.filter((p) => p.category === "Active Concentrate"),
    }
  }, [category, filteredProducts])

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="mb-12">
          <HeroSection
            title={currentHero.title}
            description={currentHero.description}
            image={currentHero.image}
            imageAlt={currentHero.imageAlt}
          />
        </div>

        <div className="container mx-auto px-4 pb-16">
          {category === "creams" && groupedCreams ? (
            <div className="space-y-12">
              {/* In-Lab Cream */}
              {groupedCreams.inLab.length > 0 && (
                <div>
                  <SectionHeading className="mb-6">In-Lab Cream</SectionHeading>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                    {groupedCreams.inLab.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              )}

              {/* Mix at Home Cream */}
              {groupedCreams.mixAtHome.length > 0 && (
                <div>
                  <SectionHeading className="mb-6">Mix at Home Cream</SectionHeading>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                    {groupedCreams.mixAtHome.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              )}

              {/* Active Concentrate */}
              {groupedCreams.activeConcentrate.length > 0 && (
                <div>
                  <SectionHeading className="mb-6">Active Concentrate</SectionHeading>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                    {groupedCreams.activeConcentrate.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Other categories show standard grid
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
