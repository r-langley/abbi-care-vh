"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { Plus, Check } from "lucide-react"
import { useState } from "react"
import { SkinAnalysisModal } from "./skin-analysis-modal"
import { ProductBadge } from "@/components/ui/product-badge"
import { PRODUCT_CATEGORIES } from "@/lib/constants"

interface ProductCardProps {
  product: Product
  showRecommended?: boolean
}

export function ProductCard({ product, showRecommended = false }: ProductCardProps) {
  const { addItem, items } = useCart()
  const [showAnalysisModal, setShowAnalysisModal] = useState(false)

  const isInLabCream = product.category === PRODUCT_CATEGORIES.IN_LAB_CREAM
  const isInCart = items.some((item) => item.id === product.id)

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
      <Link href={isInLabCream ? "#" : `/product/${product.id}`} onClick={handleCardClick} className="block h-full">
        <div className="bg-white rounded-[10px] border-2 border-[#f5f6f5] overflow-hidden relative flex flex-col h-full">
          <div className="relative h-[160px] overflow-hidden">
            <Image src="/placeholder.svg?height=160&width=300" alt={product.name} fill className="object-cover" />
            {showRecommended && product.recommended && (
              <ProductBadge badgeType="recommended" className="absolute top-3 left-3">
                Recommended
              </ProductBadge>
            )}
          </div>
          <div className="bg-[#f5f6f5] p-[10px] pb-[20px] flex flex-col justify-between gap-[10px] flex-1">
            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-col gap-[5px]">
                <p className="font-semibold text-[18px] leading-[1.15] text-[#586158] tracking-normal">
                  {product.name}
                </p>
              </div>
              <p
                className="font-medium text-[13px] tracking-[-0.26px] text-[#586158] leading-[1.15]"
                style={{ fontFamily: "var(--font-geist-mono)", fontVariationSettings: "'wdth' 100" }}
              >
                ${product.price.toFixed(2)}
              </p>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-[#586158] rounded-full size-[32px] flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity"
            >
              {isInCart ? <Check className="h-5 w-5 text-[#f5f6f5]" /> : <Plus className="h-5 w-5 text-[#f5f6f5]" />}
            </button>
          </div>
        </div>
      </Link>

      <SkinAnalysisModal open={showAnalysisModal} onOpenChange={setShowAnalysisModal} />
    </>
  )
}
