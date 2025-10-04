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
  const category = searchParams.get("category") || "Creams"

  const heroContent = {
    Creams: {
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LEPlqvKzEkK6J5dqJznJE9V0ClyAgm.png",
      title: "Personalized Creams",
      description:
        "Custom formulations tailored to your unique skin needs, from in-lab creams to mix-at-home solutions and active concentrates.",
    },
    "Simple Solutions": {
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LEPlqvKzEkK6J5dqJznJE9V0ClyAgm.png",
      title: "Simple Solutions",
      description:
        "Effective, straightforward skincare essentials designed to address your specific concerns with minimal fuss.",
    },
    Essentials: {
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LEPlqvKzEkK6J5dqJznJE9V0ClyAgm.png",
      title: "Essentials",
      description: "The fundamental products every skincare routine needs for healthy, balanced skin.",
    },
  }

  const currentHero = heroContent[category as keyof typeof heroContent] || heroContent.Creams

  const filteredProducts = useMemo(() => {
    if (category === "Creams") {
      // Show all cream-related products
      return products.filter((p) => ["In-Lab Cream", "Mix at Home Cream", "Active Concentrate"].includes(p.category))
    } else if (category === "Simple Solutions") {
      return products.filter((p) => p.category === "Simple Solution")
    } else if (category === "Essentials") {
      return products.filter((p) => p.category === "Essential")
    }
    return products
  }, [category])

  const groupedCreamProducts = useMemo(() => {
    if (category !== "Creams") return null

    return {
      "In-Lab Cream": filteredProducts.filter((p) => p.category === "In-Lab Cream"),
      "Mix at Home Cream": filteredProducts.filter((p) => p.category === "Mix at Home Cream"),
      "Active Concentrate": filteredProducts.filter((p) => p.category === "Active Concentrate"),
    }
  }, [category, filteredProducts])

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection
          image={currentHero.image}
          title={currentHero.title}
          description={currentHero.description}
          imageAlt={currentHero.title}
        />

        <div className="container mx-auto px-4 pb-12">
          {category === "Creams" && groupedCreamProducts ? (
            <div className="space-y-12">
              {Object.entries(groupedCreamProducts).map(([subcategory, products]) => (
                <div key={subcategory}>
                  <SectionHeading className="mb-6">{subcategory}</SectionHeading>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
