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
import { CardTitle, ExtraSmallText, PriceDisplay } from "@/components/ui/typography"
import { ProductBadge } from "@/components/ui/product-badge"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
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
      <Card className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300 p-0">
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
        <CardContent className="p-4 px-2.5 py-2.5">
          <Link href={isInLabCream ? "#" : `/product/${product.id}`} onClick={handleCardClick}>
            <CardTitle variant="small" className="hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </CardTitle>
          </Link>
          {product.subtitle && <ExtraSmallText className="mb-2">{product.subtitle}</ExtraSmallText>}
          <div className="flex justify-between mt-3 flex-col items-start gap-2.5">
            <PriceDisplay amount={product.price} />
            <Button size="sm" onClick={handleAddToCart} className="font-mono text-xs">
              <Plus className="h-4 w-4 mr-1" />
              {isInLabCream ? "Customize" : "Add"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <SkinAnalysisModal open={showAnalysisModal} onOpenChange={setShowAnalysisModal} />
    </>
  )
}
