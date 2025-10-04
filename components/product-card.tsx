"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Product } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { Plus } from "lucide-react"
import { useState } from "react"
import { SkinAnalysisModal } from "./skin-analysis-modal"
import { PriceDisplay } from "@/components/ui/typography"
import { ProductBadge } from "@/components/ui/product-badge"

interface ProductCardProps {
  product: Product
  showDescription?: boolean
}

export function ProductCard({ product, showDescription = false }: ProductCardProps) {
  const { addItem } = useCart()
  const [showAnalysisModal, setShowAnalysisModal] = useState(false)

  const isInLabCream = product.category === "In-Lab Cream"

  const handleCardClick = (e: React.MouseEvent) => {
    if (isInLabCream) {
      e.preventDefault()
      setShowAnalysisModal(true)
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isInLabCream) {
      setShowAnalysisModal(true)
    } else {
      addItem(product)
    }
  }

  return (
    <>
      <Card className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300 rounded-md shadow-none">
        <Link href={isInLabCream ? "#" : `/product/${product.id}`} onClick={handleCardClick}>
          <div className="relative aspect-square overflow-hidden bg-muted">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.recommended && (
              <ProductBadge badgeType="recommended" className="absolute top-3 left-3">
                Recommended
              </ProductBadge>
            )}
          </div>
        </Link>
        <CardContent className="px-2.5 py-2.5">
          <Link href={isInLabCream ? "#" : `/product/${product.id}`} onClick={handleCardClick}>
            <h3 className="font-medium mb-2 hover:text-primary transition-colors line-clamp-2 text-xl">
              {product.name}
            </h3>
          </Link>
          {showDescription && product.description && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
          )}
          <div className="flex items-center justify-between mt-3">
            <div className="border-2 border-dashed border-border px-3 py-1">
              <PriceDisplay amount={product.price} size="default" />
            </div>
            <Button
              size="icon"
              onClick={handleAddToCart}
              className="h-12 w-12 rounded-lg bg-muted hover:bg-muted/80 text-foreground"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <SkinAnalysisModal open={showAnalysisModal} onOpenChange={setShowAnalysisModal} />
    </>
  )
}
