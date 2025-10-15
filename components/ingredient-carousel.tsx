"use client"

import { IngredientCard } from "@/components/ingredient-card"
import type { Ingredient } from "@/lib/ingredients-data"

interface IngredientCarouselProps {
  ingredients: Ingredient[]
}

export function IngredientCarousel({ ingredients }: IngredientCarouselProps) {
  return (
    <div className="relative -mx-4 px-4">
      <div className="flex overflow-x-auto pb-4 gap-2.5">
        {ingredients.map((ingredient) => (
          <div key={ingredient.id} className="flex-1 min-w-[200px]">
            <IngredientCard
              id={ingredient.id}
              number={ingredient.number}
              name={ingredient.name}
              description={ingredient.description}
              href="/ingredients"
              purity={ingredient.purity}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
