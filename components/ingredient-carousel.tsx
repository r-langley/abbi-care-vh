"use client"

import Link from "next/link"
import { IngredientCard } from "@/components/ingredient-card"
import { ArrowRightIcon } from "@heroicons/react/24/solid"
import type { Ingredient } from "@/lib/ingredients-data"

interface IngredientCarouselProps {
  ingredients: Ingredient[]
}

export function IngredientCarousel({ ingredients }: IngredientCarouselProps) {
  return (
    <div className="relative -mx-4 px-4">
      <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 gap-2.5">
        {/* Ingredient Cards */}
        {ingredients.map((ingredient) => (
          <div key={ingredient.id} className="flex-none snap-start w-56">
            <IngredientCard
              id={ingredient.id}
              number={ingredient.number}
              name={ingredient.name}
              description={ingredient.description}
            />
          </div>
        ))}

        {/* View All Card */}
        <Link href="/ingredients" className="flex-none w-[280px] snap-start">
          <div className="group h-full bg-[#f5f6f5] hover:bg-[#eaecea] transition-colors rounded-[10px] border-2 border-dashed border-[#586158]/20 hover:border-[#586158]/40 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#586158]/10 flex items-center justify-center mb-4 group-hover:bg-[#586158]/20 transition-colors">
              <ArrowRightIcon className="w-8 h-8 text-[#586158]" />
            </div>
            <p className="font-semibold text-[18px] text-[#586158] mb-2">View All Ingredients</p>
            <p className="font-medium text-[13px] text-[#586158]/70">Explore our complete collection</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
