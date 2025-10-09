"use client"

import type React from "react"
import { RecommendedBadge } from "@/components/recommended-badge"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MinusIcon, PlusIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import { getProductById, products, traits } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { ActiveIngredientCard } from "@/components/active-ingredient-card"
import { PRODUCT_CATEGORIES } from "@/lib/constants"
import { getIngredientsByTraits } from "@/lib/ingredients-data"
import { IngredientCard } from "@/components/ingredient-card"
import { cn } from "@/lib/utils"

export default function ProductPage() {
  const params = useParams()
  const product = getProductById(params.id as string)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  const [selectedTraits, setSelectedTraits] = useState<string[]>([])
  const [age, setAge] = useState<number>(40)

  useEffect(() => {
    const personalizeData = localStorage.getItem("personalizeData")
    if (personalizeData) {
      const data = JSON.parse(personalizeData)
      setSelectedTraits(data.traits || [])
      setAge(data.age || 40)
    }
  }, [])

  if (!product) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button asChild>
            <Link href="/shop">Back to Shop</Link>
          </Button>
        </div>
        <Footer />
      </>
    )
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
  }

  const toggleTrait = (traitId: string) => {
    setSelectedTraits((prev) => {
      if (prev.includes(traitId)) {
        return prev.filter((t) => t !== traitId)
      }
      if (prev.length < 3) {
        return [...prev, traitId]
      }
      return prev
    })
  }

  const isInLabCream = product.category === PRODUCT_CATEGORIES.IN_LAB_CREAM
  const isMixAtHomeCream = product.category === "Mix at Home Cream"

  // Active Ingredients for Custom Creams (In-Lab) - based on product traits
  const activeIngredients = getIngredientsByTraits(product.traits).slice(0, 3)

  // Active Concentrates for Mix at Home Creams
  const activeConcentrates = products.filter((p) => p.category === "Active Concentrate").slice(0, 3)

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="container mx-auto px-5 py-5 pt-2.5">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2.5">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRightIcon className="h-4 w-4" />
            <Link href="/shop" className="hover:text-foreground">
              Shop
            </Link>
            <ChevronRightIcon className="h-4 w-4" />
            <span className="text-foreground">{product.name}</span>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Left: Image */}
            <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                <Image
                  src="/minimalist-cosmetic-pump-bottle-product-photograph.jpg"
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.recommended && <RecommendedBadge className="absolute top-4 left-4" />}
              </div>
            </div>

            {/* Right: Details */}
            <div className="space-y-5">
              {product.recommended && (
                <Badge variant="secondary" className="font-mono text-xs">
                  Recommended for you
                </Badge>
              )}
              <div>
                <h1 className="text-3xl md:text-4xl mb-2 font-semibold">{product.name}</h1>
                {product.subtitle && <p className="text-muted-foreground">{product.subtitle}</p>}
              </div>

              <p className="text-3xl font-mono">${product.price}</p>

              <p className="text-muted-foreground leading-relaxed tracking-tight font-medium leading-6 text-sm">
                {product.description}
              </p>

              {(isMixAtHomeCream || isInLabCream) && (
                <div className="border-t border-border pt-5">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-sm mb-2">Select Your Top 3 Skin Priorities</h3>
                      <p className="text-xs text-muted-foreground mb-3">
                        Choose your main concerns to get personalized active concentrate recommendations
                      </p>
                      <div className="flex flex-wrap gap-[5px]">
                        {traits.map((trait) => {
                          const isSelected = selectedTraits.includes(trait.id)
                          const isDisabled = !isSelected && selectedTraits.length >= 3

                          return (
                            <button
                              key={trait.id}
                              onClick={() => !isDisabled && toggleTrait(trait.id)}
                              disabled={isDisabled}
                              className={cn(
                                "flex items-center gap-[5px] px-[10px] py-[5px] rounded-[100px] shrink-0 transition-colors",
                                isSelected
                                  ? "bg-primary text-primary-foreground"
                                  : isDisabled
                                    ? "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
                                    : "bg-muted text-muted-foreground hover:bg-primary/10",
                              )}
                            >
                              <span className="text-[14px] whitespace-nowrap font-medium">{trait.name}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-sm mb-2">Your Age</h3>
                      <select
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        className="w-full rounded-[10px] border-2 border-muted text-sm bg-background focus:outline-none focus:border-primary transition-colors px-3 py-2 text-foreground"
                      >
                        {Array.from({ length: 63 }, (_, i) => i + 18).map((ageOption) => (
                          <option key={ageOption} value={ageOption}>
                            {ageOption}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="pt-2">
                      <Link
                        href="/skin-analysis"
                        className="text-xs text-muted-foreground hover:text-foreground underline"
                      >
                        Want better results? Try our AI skin scan
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Skin Traits */}
              {!isMixAtHomeCream && !isInLabCream && (
                <div>
                  <h3 className="font-mono text-sm mb-3">Best for:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.traits.map((trait) => (
                      <Link
                        key={trait}
                        href={`/shop?category=creams&traits=${trait.toLowerCase()}`}
                        className="flex items-center gap-[5px] px-[10px] py-[5px] rounded-[100px] shrink-0 transition-colors bg-[#f5f6f5] text-[#586158] hover:bg-[#586158] hover:text-[#f5f6f5]"
                      >
                        <span className="font-semibold text-[14px] whitespace-nowrap">{trait}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <Label className="font-mono text-sm mb-3 block">Quantity:</Label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <MinusIcon className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-mono">{quantity}</span>
                    <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)}>
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button size="lg" className="w-full font-mono" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </div>

              {/* Active Ingredients for Custom Creams (In-Lab) */}
              {isInLabCream && (
                <div className="space-y-4 pt-4 border-t border-border">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Active Ingredients</h3>
                    <p className="text-sm text-muted-foreground">
                      Based on your skin analysis, these ingredients are automatically included
                    </p>
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    {activeIngredients.map((ingredient) => (
                      <IngredientCard
                        key={ingredient.id}
                        id={ingredient.id}
                        number={ingredient.number}
                        name={ingredient.name}
                        description={ingredient.description}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Active Concentrates for Mix at Home Creams */}
              {isMixAtHomeCream && (
                <div className="space-y-4 pt-4 border-t border-border">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Add Active Concentrates</h3>
                    <p className="text-sm text-muted-foreground">
                      Enhance your cream with up to 3 active concentrates for targeted treatment
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-[10px]">
                    {activeConcentrates.map((concentrate) => (
                      <ActiveIngredientCard
                        key={concentrate.id}
                        id={concentrate.id}
                        number={Number.parseInt(concentrate.name.match(/\d+/)?.[0] || "0")}
                        name={concentrate.name.replace(/^No\.\s*\d+\s*/, "")}
                        image="/minimalist-cosmetic-pump-bottle-product-photograph.jpg"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Accordion Details */}
              <Accordion type="single" collapsible className="w-full">
                {!isInLabCream && (
                  <AccordionItem value="ingredients">
                    <AccordionTrigger className="font-mono text-sm">Key Ingredients</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Our carefully selected ingredients work synergistically to deliver optimal results for your skin
                      type and concerns.
                    </AccordionContent>
                  </AccordionItem>
                )}
                <AccordionItem value="how-to-use">
                  <AccordionTrigger className="font-mono text-sm">How to Use</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Apply a small amount to clean, dry skin. Gently massage in circular motions until fully absorbed.
                    Use morning and evening for best results.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="full-ingredients">
                  <AccordionTrigger className="font-mono text-sm">Full Ingredients List</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Aqua, Glycerin, Niacinamide, Hyaluronic Acid, and other carefully selected ingredients formulated
                    for your skin's needs.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>
}
