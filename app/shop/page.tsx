"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SlidersHorizontal } from "lucide-react"
import { products, traits } from "@/lib/products"
import { BodyText } from "@/components/ui/typography"
import { HeroSection } from "@/components/ui/hero-section"

const categories = ["In-Lab Cream", "Mix at Home Cream", "Active Concentrate", "Essential", "Simple Solution"]

const categoryHeros = {
  creams: {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LEPlqvKzEkK6J5dqJznJE9V0ClyAgm.png",
    title: "Creams",
    description: "Choose Lab Created or Mix-at-Home",
  },
  "simple-solutions": {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LEPlqvKzEkK6J5dqJznJE9V0ClyAgm.png",
    title: "Simple Solutions",
    description: "Complete regimens for targeted concerns",
  },
  essentials: {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LEPlqvKzEkK6J5dqJznJE9V0ClyAgm.png",
    title: "Essentials",
    description: "Core products for every skincare routine",
  },
}

export default function ShopPage() {
  const searchParams = useSearchParams()
  const initialTrait = searchParams.get("trait")
  const categoryParam = searchParams.get("category") || "creams"

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTraits, setSelectedTraits] = useState<string[]>(initialTrait ? [initialTrait] : [])
  const [sortBy, setSortBy] = useState("featured")

  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Filter by category tab
    if (categoryParam === "creams") {
      filtered = filtered.filter((p) =>
        ["In-Lab Cream", "Mix at Home Cream", "Active Concentrate"].includes(p.category),
      )
    } else if (categoryParam === "simple-solutions") {
      filtered = filtered.filter((p) => p.category === "Simple Solution")
    } else if (categoryParam === "essentials") {
      filtered = filtered.filter((p) => p.category === "Essential")
    }

    // Filter by category checkboxes
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category))
    }

    // Filter by traits
    if (selectedTraits.length > 0) {
      filtered = filtered.filter((p) =>
        selectedTraits.some((trait) => p.traits.some((t) => t.toLowerCase() === trait.toLowerCase())),
      )
    }

    // Sort
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    return filtered
  }, [categoryParam, selectedCategories, selectedTraits, sortBy])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleTrait = (trait: string) => {
    setSelectedTraits((prev) => (prev.includes(trait) ? prev.filter((t) => t !== trait) : [...prev, trait]))
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedTraits([])
  }

  const currentHero = categoryHeros[categoryParam as keyof typeof categoryHeros] || categoryHeros.creams

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-mono text-sm mb-4">Category</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="font-mono text-sm mb-4">Skin Trait</h3>
        <div className="space-y-3">
          {traits.map((trait) => (
            <div key={trait.id} className="flex items-center space-x-2">
              <Checkbox
                id={`trait-${trait.id}`}
                checked={selectedTraits.includes(trait.id)}
                onCheckedChange={() => toggleTrait(trait.id)}
              />
              <Label htmlFor={`trait-${trait.id}`} className="text-sm cursor-pointer">
                {trait.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {(selectedCategories.length > 0 || selectedTraits.length > 0) && (
        <Button variant="outline" onClick={clearFilters} className="w-full font-mono bg-transparent">
          Clear Filters
        </Button>
      )}
    </div>
  )

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection
          image={currentHero.image}
          imageAlt={currentHero.title}
          title={currentHero.title}
          description={currentHero.description}
        />

        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Desktop Filters */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <FilterContent />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Mobile Filter + Sort */}
              

              {/* Product Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                  <BodyText className="text-muted-foreground mb-4">No products found matching your filters.</BodyText>
                  <Button onClick={clearFilters} variant="outline" className="font-mono bg-transparent">
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
