"use client"

import { IngredientCard } from "@/components/ingredient-card"
import type { Ingredient } from "@/lib/ingredients-data"

interface IngredientCarouselProps {
  ingredients: Ingredient[]
}

export function IngredientCarousel({ ingredients }: IngredientCarouselProps) {
  return (
    <div className="relative -mx-4 px-4">
      <div className="flex overflow-x-auto snap-x snap-mandatory pb-4 gap-2.5">
        {ingredients.map((ingredient) => (
          <div key={ingredient.id} className="flex-none snap-start w-56">
            <IngredientCard
              id={ingredient.id}
              number={ingredient.number}
              name={ingredient.name}
              description={ingredient.description}
              href="/ingredients"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
