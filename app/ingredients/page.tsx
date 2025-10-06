"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { IngredientCard } from "@/components/ingredient-card"
import { ingredients } from "@/lib/ingredients-data"
import { HeroSection } from "@/components/ui/hero-section"

export default function IngredientsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <HeroSection title="Active Ingredients" image="/ingredient-placeholder.jpg" imagePosition="right" />

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
