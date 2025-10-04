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
import { PageTitle, BodyText } from "@/components/ui/typography"

const categories = ["Creams", "Essential", "Simple Solution"]
const creamSubcategories = ["In-Lab Cream", "Mix at Home Cream", "Active Concentrate"]

export default function ShopPage() {
  const searchParams = useSearchParams()
  const initialTrait = searchParams.get("trait")

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTraits, setSelectedTraits] = useState<string[]>(initialTrait ? [initialTrait] : [])
  const [sortBy, setSortBy] = useState("featured")

  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => {
        // If "Creams" is selected, include all cream subcategories
        if (selectedCategories.includes("Creams")) {
          return creamSubcategories.includes(p.category) || selectedCategories.includes(p.category)
        }
        return selectedCategories.includes(p.category)
      })
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
  }, [selectedCategories, selectedTraits, sortBy])

  const shouldGroupCreams =
    selectedCategories.includes("Creams") && selectedCategories.length === 1 && selectedTraits.length === 0

  const groupedProducts = useMemo(() => {
    if (!shouldGroupCreams) return null

    return {
      "In-Lab Cream": filteredProducts.filter((p) => p.category === "In-Lab Cream"),
      "Mix at Home Cream": filteredProducts.filter((p) => p.category === "Mix at Home Cream"),
      "Active Concentrate": filteredProducts.filter((p) => p.category === "Active Concentrate"),
    }
  }, [shouldGroupCreams, filteredProducts])

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
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <PageTitle className="mb-2">Shop All</PageTitle>
            <BodyText className="text-muted-foreground">{filteredProducts.length} products</BodyText>
          </div>

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
              <div className="flex items-center justify-between mb-6 lg:justify-end">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden font-mono bg-transparent">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px]">
                    <div className="mt-8">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px] font-mono">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {shouldGroupCreams && groupedProducts ? (
                <div className="space-y-12">
                  {Object.entries(groupedProducts).map(
                    ([subcategory, subcategoryProducts]) =>
                      subcategoryProducts.length > 0 && (
                        <div key={subcategory}>
                          <h2 className="font-mono text-lg mb-6">{subcategory}</h2>
                          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {subcategoryProducts.map((product) => (
                              <ProductCard key={product.id} product={product} />
                            ))}
                          </div>
                        </div>
                      ),
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

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
