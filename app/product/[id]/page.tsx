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
import { MinusIcon, PlusIcon, ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid"
import { getProductById, products, traits } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { ActiveIngredientCard } from "@/components/active-ingredient-card"
import { PRODUCT_CATEGORIES } from "@/lib/constants"
import { getIngredientsByTraits } from "@/lib/ingredients-data"
import { IngredientCard } from "@/components/ingredient-card"
import { cn } from "@/lib/utils"

const CUSTOM_CREAM_BASES = [
  {
    id: "inlab-aloe-vera",
    name: "Aloe Vera Base",
    description: "Soothing aloe vera base cream with calming and hydrating properties.",
    traits: ["Hydration", "Sensitivity"],
    activeIngredients: [
      { number: 12, name: "Wild Acanthus Dermal Protector", description: "Shields and repairs skin barrier." },
      { number: 14, name: "Organic Brown Flax Seed Soother", description: "Prevents irritation and calms skin." },
      { number: 21, name: "Japanese Cedar Hydration Enhancer", description: "Renews layers and prevents dehydration." },
      { number: 23, name: "Chestnut Epidermal Moisture Promoter", description: "Restores moisture balance." },
      { number: 25, name: "Corn Glucose Hydration Biopolymer", description: "Deeply hydrates and soothes." },
    ],
  },
  {
    id: "inlab-apple-stem-cells",
    name: "Apple Stem Cells Base",
    description: "Advanced apple stem cell formula that promotes skin renewal and fights aging.",
    traits: ["Wrinkles", "Radiance"],
    activeIngredients: [
      { number: 1, name: "Soybean Collagen Booster", description: "Reduces wrinkles and strengthens skin." },
      { number: 3, name: "Yarrow Epidermal Regenerator", description: "Smooths wrinkles and restores lipids." },
      { number: 4, name: "Grape Juice Polyphenol Protector", description: "Prevents aging and protects DNA." },
      { number: 6, name: "Nasturtium Oxygen Booster", description: "Enhances oxygen barrier for radiance." },
      { number: 18, name: "Biotechnology Skin Detoxifier", description: "Stimulates waste elimination." },
      { number: 24, name: "Brazilian Bark Cell-Renewal Energizer", description: "Boosts cell renewal and lifespan." },
    ],
  },
  {
    id: "inlab-honey-shea",
    name: "Honey & Shea Butter Base",
    description: "Rich honey and shea butter blend that deeply nourishes and protects.",
    traits: ["Hydration", "Sensitivity"],
    activeIngredients: [
      { number: 12, name: "Wild Acanthus Dermal Protector", description: "Shields and repairs skin barrier." },
      { number: 15, name: "Red Sage Sensitive Skin Protector", description: "Calms and reduces redness." },
      { number: 16, name: "Marine Brown Algae Soothing Shield", description: "Prevents redness and soothes." },
      { number: 23, name: "Chestnut Epidermal Moisture Promoter", description: "Restores moisture balance." },
      { number: 26, name: "Pearl Chemistry Moisture Lock", description: "Locks in moisture and strengthens barrier." },
    ],
  },
  {
    id: "inlab-selenium-vitamin-c",
    name: "Selenium & Vitamin C Base",
    description: "Brightening formula with selenium and vitamin C to even skin tone.",
    traits: ["Radiance", "Spots"],
    activeIngredients: [
      { number: 6, name: "Nasturtium Oxygen Booster", description: "Enhances oxygen barrier for radiance." },
      { number: 7, name: "Berry Complexion Illuminator", description: "Reduces dark spots and blemishes." },
      { number: 8, name: "Berry Pigmentation Balancer", description: "Evens tone and reduces spots." },
      { number: 9, name: "Green Chemistry Anti-Glycation Salt", description: "Unifies complexion and firms." },
      { number: 13, name: "Pre-Probiotic Microbiota Balancer", description: "Enhances radiance and comfort." },
      { number: 18, name: "Biotechnology Skin Detoxifier", description: "Stimulates waste elimination." },
      { number: 19, name: "Soybean and Enoki Pigmentation Corrector", description: "Corrects pigmentation." },
    ],
  },
  {
    id: "inlab-peptide-complex",
    name: "Peptide Complex Base",
    description: "Advanced peptide formula that firms and smooths skin.",
    traits: ["Wrinkles", "Texture"],
    activeIngredients: [
      { number: 1, name: "Soybean Collagen Booster", description: "Reduces wrinkles and strengthens skin." },
      { number: 2, name: "Organic Oat Lifting Complex", description: "Instantly firms and lifts skin." },
      { number: 3, name: "Yarrow Epidermal Regenerator", description: "Smooths wrinkles and restores lipids." },
      { number: 5, name: "Brèdes Mafane Wrinkle Reducer", description: "Instantly smooths skin." },
      { number: 9, name: "Green Chemistry Anti-Glycation Salt", description: "Unifies complexion and firms." },
      { number: 10, name: "Meadowsweet Sebum-Regulation Salt", description: "Alleviates skin texture." },
    ],
  },
]

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string

  const isCustomCream = productId === "custom-cream"
  const [selectedBaseIndex, setSelectedBaseIndex] = useState(0)

  const product = isCustomCream ? null : getProductById(productId)
  const customBase = isCustomCream ? CUSTOM_CREAM_BASES[selectedBaseIndex] : null

  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const { isLoggedIn } = useAuth()

  const [selectedTraits, setSelectedTraits] = useState<string[]>([])
  const [age, setAge] = useState<number>(40)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isEditingBase, setIsEditingBase] = useState(false)

  useEffect(() => {
    const personalizeData = localStorage.getItem("personalizeData")
    if (personalizeData) {
      const data = JSON.parse(personalizeData)
      setSelectedTraits(data.traits || [])
      setAge(data.age || 40)
    }
  }, [])

  const handleAddToCart = () => {
    if (isCustomCream && customBase) {
      const customProduct = {
        id: customBase.id,
        name: customBase.name,
        category: PRODUCT_CATEGORIES.IN_LAB_CREAM,
        price: 89.0,
        description: customBase.description,
        traits: customBase.traits,
        image: "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
        inStock: true,
        recommended: false,
      }
      addItem(customProduct, quantity)
    } else if (product) {
      addItem(product, quantity)
    }
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

  const isInLabCream = isCustomCream || product?.category === PRODUCT_CATEGORIES.IN_LAB_CREAM
  const isMixAtHomeCream = !isCustomCream && product?.category === "Mix at Home Cream"

  const activeIngredients = isCustomCream
    ? customBase?.activeIngredients || []
    : product
      ? getIngredientsByTraits(product.traits).slice(0, 3)
      : []

  const activeConcentrates = products.filter((p) => p.category === "Active Concentrate").slice(0, 3)

  const carouselImages = [
    "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
    "/images/design-mode/image(1).png",
    "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
  ]

  const displayName = isCustomCream ? customBase?.name : product?.name
  const displayDescription = isCustomCream ? customBase?.description : product?.description
  const displayPrice = isCustomCream ? 89.0 : product?.price
  const displayTraits = isCustomCream ? customBase?.traits : product?.traits

  const baseMatchesTraits = (baseTraits: string[]) => {
    if (selectedTraits.length === 0) return false
    return selectedTraits.some((trait) => baseTraits.includes(trait))
  }

  const traitInSelectedBase = (traitId: string) => {
    if (!customBase) return false
    return customBase.traits.includes(traitId)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="container mx-auto px-5 py-5 pt-2.5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2.5">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRightIcon className="h-4 w-4" />
            <Link href="/shop" className="hover:text-foreground">
              Shop
            </Link>
            <ChevronRightIcon className="h-4 w-4" />
            <span className="text-foreground">{isCustomCream ? "Custom Cream" : displayName}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
              {isCustomCream ? (
                <div className="relative">
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={carouselImages[currentImageIndex] || "/placeholder.svg"}
                      alt={displayName || "Custom Cream"}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  {carouselImages.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
                        }
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                        aria-label="Previous image"
                      >
                        <ChevronLeftIcon className="h-5 w-5 text-foreground" />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                        aria-label="Next image"
                      >
                        <ChevronRightIcon className="h-5 w-5 text-foreground" />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {carouselImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={cn(
                              "w-2 h-2 rounded-full transition-colors",
                              index === currentImageIndex ? "bg-white" : "bg-white/50",
                            )}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                  <Image
                    src="/minimalist-cosmetic-pump-bottle-product-photograph.jpg"
                    alt={displayName || "Product"}
                    fill
                    className="object-cover"
                    priority
                  />
                  {product?.recommended && <RecommendedBadge className="absolute top-4 left-4" />}
                </div>
              )}
            </div>

            <div className="space-y-5">
              {product?.recommended && (
                <Badge variant="secondary" className="font-mono text-xs">
                  Recommended for you
                </Badge>
              )}
              <div>
                <h1 className="text-3xl md:text-4xl mb-2 font-semibold">{displayName}</h1>
                {product?.subtitle && <p className="text-muted-foreground">{product.subtitle}</p>}
              </div>

              <p className="text-3xl font-mono">${displayPrice}</p>

              <p className="text-muted-foreground leading-relaxed tracking-tight font-medium leading-6 text-sm">
                {displayDescription}
              </p>

              {isCustomCream && (
                <div className="border-t border-border pt-5">
                  {isLoggedIn && !isEditingBase ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-sm">Selected Base</h3>
                          <p className="text-sm text-muted-foreground mt-1">{customBase?.name}</p>
                        </div>
                        <button onClick={() => setIsEditingBase(true)} className="text-sm text-primary hover:underline">
                          Change Base
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-sm mb-2">Select Your Top 3 Skin Priorities</h3>
                        <p className="text-xs text-muted-foreground mb-3">
                          Choose your main concerns to see which base is best for you
                        </p>
                        <div className="flex flex-wrap gap-[5px]">
                          {traits.map((trait) => {
                            const isSelected = selectedTraits.includes(trait.id)
                            const isDisabled = !isSelected && selectedTraits.length >= 3
                            const matchesBase = traitInSelectedBase(trait.id)

                            return (
                              <button
                                key={trait.id}
                                onClick={() => !isDisabled && toggleTrait(trait.id)}
                                disabled={isDisabled}
                                className={cn(
                                  "flex items-center gap-[5px] px-[10px] py-[5px] rounded-[100px] shrink-0 transition-all",
                                  isSelected
                                    ? "bg-primary text-primary-foreground"
                                    : matchesBase
                                      ? "bg-primary/20 text-primary border-2 border-primary"
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
                        <h3 className="font-medium text-sm mb-3">Select Base Type</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {CUSTOM_CREAM_BASES.map((base, index) => {
                            const matchesTraits = baseMatchesTraits(base.traits)

                            return (
                              <button
                                key={base.id}
                                onClick={() => {
                                  setSelectedBaseIndex(index)
                                  if (isLoggedIn) setIsEditingBase(false)
                                }}
                                className={cn(
                                  "text-left p-3 rounded-lg border-2 transition-all",
                                  selectedBaseIndex === index
                                    ? "border-primary bg-primary/5"
                                    : matchesTraits
                                      ? "border-primary/50 bg-primary/5"
                                      : "border-muted hover:border-primary/30",
                                )}
                              >
                                <div className="flex items-start gap-2">
                                  
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium text-sm leading-tight">{base.name}</div>
                                    <div className="flex flex-wrap gap-1 mt-1.5">
                                      {base.traits.map((trait) => (
                                        <span
                                          key={trait}
                                          className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
                                        >
                                          {trait}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {isCustomCream && (!isLoggedIn || isEditingBase) && (
                <div className="border-t border-border pt-5">
                  <div className="space-y-4">
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

              {(isMixAtHomeCream || isInLabCream) && !isCustomCream && (
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

              {!isMixAtHomeCream && !isInLabCream && displayTraits && (
                <div>
                  <h3 className="font-mono text-sm mb-3">Best for:</h3>
                  <div className="flex flex-wrap gap-2">
                    {displayTraits.map((trait) => (
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

              <div className="space-y-3">
                <Button size="lg" className="w-full font-mono" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </div>

              {isCustomCream && customBase && (
                <div className="space-y-4 pt-4 border-t border-border">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Active Ingredients in {customBase.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      This base contains {customBase.activeIngredients.length} carefully selected active ingredients
                    </p>
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    {customBase.activeIngredients.map((ingredient) => (
                      <IngredientCard
                        key={ingredient.number}
                        id={ingredient.number.toString()}
                        number={ingredient.number}
                        name={ingredient.name}
                        description={ingredient.description}
                      />
                    ))}
                  </div>
                </div>
              )}

              {isInLabCream && !isCustomCream && (
                <div className="space-y-4 pt-4 border-t border-border">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Active Ingredients</h3>
                    <p className="text-sm text-muted-foreground">
                      Based on your skin analysis, these ingredients are automatically included
                    </p>
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    {activeIngredients.map((ingredient: any) => (
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
