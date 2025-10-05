"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { CardTitle, SmallText } from "@/components/ui/typography"
import { ArrowRight } from "lucide-react"
import type { Product } from "@/lib/products"

interface CategoryCarouselProps {
  title: string
  description: string
  products: Product[]
  shopLink: string
}

export function CategoryCarousel({ title, description, products, shopLink }: CategoryCarouselProps) {
  return (
    <div className="space-y-5">
      {/* Category Header */}
      <div className="text-center md:text-left">
        <h3 className="md:text-2xl font-semibold text-foreground mb-1 font-sans text-left text-2xl">{title}</h3>
        <p className="text-sm md:text-base text-muted-foreground text-left">{description}</p>
      </div>

      {/* Scrollable Product Grid */}
      <div className="relative -mx-4 px-4">
        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 gap-2.5">
          {/* Product Cards */}
          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="flex-none snap-start w-56 rounded-lg shadow-xs">
              <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
                <div className="relative aspect-square">
                  <Image
                    src="/minimalist-cosmetic-pump-bottle-product-photograph.jpg"
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <CardTitle className="text-base mb-1 line-clamp-2">{product.name}</CardTitle>
                  <SmallText className="line-clamp-2">{product.description}</SmallText>
                  <p className="font-mono text-sm font-semibold mt-2">${product.price}</p>
                </CardContent>
              </Card>
            </Link>
          ))}

          {/* Shop Category Card */}
          <Link href={shopLink} className="flex-none w-[280px] snap-start border-none border-0">
            <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full bg-primary/5 hover:bg-primary/10 border-2 border-dashed border-primary/20 hover:border-primary/40">
              <div className="flex flex-col items-center justify-center h-full p-8 text-center border-none border-0">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <ArrowRight className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-lg mb-2">Shop All {title}</CardTitle>
                <SmallText>Explore our complete collection</SmallText>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
