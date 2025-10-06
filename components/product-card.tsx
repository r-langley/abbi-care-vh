"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { PlusIcon, CheckIcon } from "@heroicons/react/24/solid"
import { useState } from "react"
import { SkinAnalysisModal } from "./skin-analysis-modal"
import { RecommendedBadge } from "@/components/recommended-badge"
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
      <Link href={`/product/${product.id}`} className="block h-full">
        <div className="bg-white rounded-[10px] border-2 border-[#f5f6f5] overflow-hidden relative flex flex-col h-full w-full">
          <div className="relative h-[160px] overflow-hidden">
            <Image
              src="/minimalist-cosmetic-pump-bottle-product-photograph.jpg"
              alt={product.name}
              fill
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
            {showRecommended && product.recommended && <RecommendedBadge className="absolute top-3 left-3" />}
          </div>
          <div className="bg-[#f5f6f5] p-[10px] pb-[20px] flex flex-col justify-between gap-[10px] flex-1 bg-muted">
            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-col gap-[5px]">
                <p className="font-semibold text-[18px] leading-[1.15] text-[#586158] tracking-normal text-foreground">
                  {product.name}
                </p>
              </div>
              <p
                className="text-[13px] tracking-[-0.26px] leading-[1.15] font-semibold text-primary"
                style={{ fontFamily: "var(--font-geist-mono)", fontVariationSettings: "'wdth' 100" }}
              >
                ${product.price.toFixed(2)}
              </p>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-[#586158] rounded-full size-[32px] flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity bg-primary"
            >
              {isInCart ? (
                <CheckIcon className="h-5 w-5 text-[#f5f6f5]" />
              ) : (
                <PlusIcon className="h-5 w-5 text-[#f5f6f5]" />
              )}
            </button>
          </div>
        </div>
      </Link>

      <SkinAnalysisModal open={showAnalysisModal} onOpenChange={setShowAnalysisModal} />
    </>
  )
}
