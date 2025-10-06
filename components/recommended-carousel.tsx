"use client"

import { PlusIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/products"

interface RecommendedCarouselProps {
  products: Product[]
}

export function RecommendedCarousel({ products }: RecommendedCarouselProps) {
  return (
    <div className="flex flex-col gap-[20px] p-[20px] rounded-none bg-card py-10">
      <div className="flex justify-center">
        <div className="w-full max-w-[900px]">
          <div className="flex flex-col gap-[10px] pb-5">
            <h2 className="md:text-[40px] leading-[1.2] text-foreground font-sans tracking-tight font-medium text-2xl">
              Recommended
            </h2>
            <p className="text-[16px] tracking-[-0.32px] text-foreground font-normal leading-[1.35]">
              Complete you routine. Add a Cleanser and Serum to your Cream and save!
            </p>
          </div>

          {/* Horizontal Scrollable Carousel */}
          <div className="relative -mx-4 px-4">
            <div className="flex overflow-x-auto snap-x snap-mandatory pb-4 gap-2.5 scrollbar-hide">
              {products.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`} className="flex-none snap-start w-[280px]">
                  <div className="bg-white rounded-[10px] overflow-hidden h-full border-transparent hover:border-accent transition-colors border-0">
                    <div className="flex flex-col h-full">
                      {/* Image */}
                      <div className="relative h-[200px] overflow-hidden">
                        <Image
                          src={product.image || "/minimalist-cosmetic-pump-bottle-product-photograph.jpg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="bg-secondary p-[10px] pb-[20px] flex flex-row items-end justify-between gap-[10px]">
                        <div className="flex flex-col gap-[10px]">
                          <div className="flex flex-col gap-[5px]">
                            <p className="text-[18px] leading-[1.15] text-foreground tracking-normal font-medium">
                              {product.name}
                            </p>
                            <p className="text-[14px] tracking-[-0.28px] text-foreground leading-[1.15] font-normal">
                              {product.category}
                            </p>
                          </div>
                          <p
                            className="font-semibold text-[13px] tracking-[-0.26px] text-accent leading-[1.15]"
                            style={{ fontFamily: "var(--font-geist-mono)", fontVariationSettings: "'wdth' 100" }}
                          >
                            ${product.price.toFixed(2)}
                          </p>
                        </div>

                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            // Add to cart logic here
                          }}
                          className="bg-accent rounded-full size-[40px] flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity"
                        >
                          <PlusIcon className="size-[20px] text-accent-foreground" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
