"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { IngredientCard } from "@/components/ingredient-card"
import { ingredients } from "@/lib/ingredients-data"
import Image from "next/image"

export default function IngredientsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <div className="bg-[#f5f6f5] flex items-center h-[160px]">
          <div className="container mx-auto grid grid-cols-2 h-full gap-0 px-0">
            <div className="flex flex-col items-center justify-center bg-muted">
              <h1 className="font-semibold text-[24px] tracking-[-0.48px] text-[#586158] leading-[1.35] text-center text-foreground">
                Active Ingredients
              </h1>
            </div>
            <div className="relative overflow-hidden flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src="/minimalist-cosmetic-pump-bottle-product-photograph.jpg"
                  alt="Active Ingredients"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients Grid */}
        <div className="container mx-auto px-5 py-5">
          <div className="grid grid-cols-2 gap-[8px]">
            {ingredients.map((ingredient) => (
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
      </main>
      <Footer />
    </>
  )
}
