"use client"

import React, {useEffect} from "react"
import { RecommendedBadge } from "@/components/recommended-badge"
import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MinusIcon, PlusIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import { useCart } from "@/lib/cart-context"
import { ActiveIngredientCard } from "@/components/active-ingredient-card"
import { PRODUCT_CATEGORIES } from "@/lib/constants"
import { getIngredientsByTraits } from "@/lib/ingredients-data"
import { IngredientCard } from "@/components/ingredient-card"
import {getImage, getProductById} from "@/api/marketplace";
import {Product, type StockProduct} from "@/lib/products";

export default function ProductPage() {
  const params = useParams()
  const [marketId, setMarketId] = useState<number | null>(2501305);
  const [product, setProduct] = useState<any>(null)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  useEffect(() => {
    try {
      getProductById(params.id as string)
          .then(p => {
            p.image = getImage(p)
            const myStock = marketId && p.stocks && p.stocks.length && p.stocks.find((s: StockProduct) => s.pharmaId === marketId);
            p.price = myStock ? myStock.price : p.price;
            p.currency = myStock ? (myStock.currency || 'EUR') : 'EUR';
            setProduct(p)
          })
    }
    catch (error) {
      console.error("Failed to load product data:", error)
    }
  }, []);

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

  const isInLabCream = product.category === PRODUCT_CATEGORIES.IN_LAB_CREAM
  const isMixAtHomeCream = product.category === "Mix at Home Cream"

  // Active Ingredients for Custom Creams (In-Lab) - based on product traits
  // const activeIngredients = getIngredientsByTraits(product.traits).slice(0, 3)

  // Active Concentrates for Mix at Home Creams
  // const activeConcentrates = products.filter((p: Product) => p.category === "Active Concentrate").slice(0, 3)

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
                  src={product?.image || "/minimalist-cosmetic-pump-bottle-product-photograph.jpg"}
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

              <p className="text-3xl font-mono">${(product.price || 0)?.toFixed(2)}</p>

              <p className="text-muted-foreground leading-relaxed tracking-tight font-medium leading-6 text-sm">
                {product.description}
              </p>

              {/* Skin Traits */}
              <div>
                <h3 className="font-mono text-sm mb-3">Best for:</h3>
                <div className="flex flex-wrap gap-2">
                  {product?.traits?.map((trait: any) => (
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
                    {/*{activeIngredients.map((ingredient) => (*/}
                    {/*  <IngredientCard*/}
                    {/*    key={ingredient.id}*/}
                    {/*    id={ingredient.id}*/}
                    {/*    number={ingredient.number}*/}
                    {/*    name={ingredient.name}*/}
                    {/*    description={ingredient.description}*/}
                    {/*    purity={ingredient.purity}*/}
                    {/*  />*/}
                    {/*))}*/}
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
                    {/*{activeConcentrates.map((concentrate) => (*/}
                    {/*  <ActiveIngredientCard*/}
                    {/*    key={concentrate.id}*/}
                    {/*    id={concentrate.id}*/}
                    {/*    number={Number.parseInt(concentrate.name.match(/\d+/)?.[0] || "0")}*/}
                    {/*    image="/minimalist-cosmetic-pump-bottle-product-photograph.jpg"*/}
                    {/*  />*/}
                    {/*))}*/}
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
