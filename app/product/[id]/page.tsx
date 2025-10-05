"use client"

import type React from "react"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Minus, Plus, Heart, ChevronRight } from "lucide-react"
import { getProductById } from "@/lib/products"
import { useCart } from "@/lib/cart-context"

export default function ProductPage() {
  const params = useParams()
  const product = getProductById(params.id as string)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

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

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/shop" className="hover:text-foreground">
              Shop
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{product.name}</span>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Image */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                <Image
                  src="/minimalist-cosmetic-pump-bottle-product-photograph.jpg"
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.recommended && (
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground font-mono">
                    Recommended
                  </Badge>
                )}
              </div>
            </div>

            {/* Right: Details */}
            <div className="space-y-6">
              {product.recommended && (
                <Badge variant="secondary" className="font-mono text-xs">
                  Recommended for you
                </Badge>
              )}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
                {product.subtitle && <p className="text-muted-foreground">{product.subtitle}</p>}
              </div>

              <p className="text-3xl font-mono">${product.price}</p>

              <p className="text-muted-foreground leading-relaxed">{product.description}</p>

              {/* Skin Traits */}
              <div>
                <h3 className="font-mono text-sm mb-3">Best for:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.traits.map((trait) => (
                    <Badge key={trait} variant="outline" className="font-mono text-xs">
                      {trait}
                    </Badge>
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
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-mono">{quantity}</span>
                    <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button size="lg" className="w-full font-mono" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="w-full font-mono bg-transparent">
                  <Heart className="h-4 w-4 mr-2" />
                  Add to Wishlist
                </Button>
              </div>

              {/* Accordion Details */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="ingredients">
                  <AccordionTrigger className="font-mono text-sm">Key Ingredients</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Our carefully selected ingredients work synergistically to deliver optimal results for your skin
                    type and concerns.
                  </AccordionContent>
                </AccordionItem>
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
