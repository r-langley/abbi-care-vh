"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { products } from "@/lib/products"
import { PRODUCT_CATEGORIES } from "@/lib/constants"
import { ProductCard } from "@/components/product-card"
import { getIngredientsByTraits } from "@/lib/ingredients-data"
import { IngredientCard } from "@/components/ingredient-card"

export default function CustomCreamPage() {
  const inLabCreams = products.filter((p) => p.category === PRODUCT_CATEGORIES.IN_LAB_CREAM)

  return (
    <>
      <Header />
      <main className="min-h-screen pb-10">
        <div className="container mx-auto px-5 py-10 max-w-[900px]">
          <div className="flex flex-col gap-6 mb-10">
            <h1 className="text-4xl font-medium text-foreground tracking-tight">
              Custom <span className="font-serif italic">Cream</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Each In Lab cream is custom-formulated and made-to-order in our French laboratory, crafted specifically
              for your unique skin needs. Choose from our curated base types, each featuring 3-10 active ingredients
              tailored to specific skin concerns.
            </p>
          </div>

          <div className="space-y-12">
            {inLabCreams.map((cream) => {
              const activeIngredients = getIngredientsByTraits(cream.traits)

              return (
                <div key={cream.id} className="border-t border-border pt-8 first:border-t-0 first:pt-0">
                  <div className="grid md:grid-cols-[300px_1fr] gap-6">
                    <div className="w-full max-w-[300px]">
                      <ProductCard product={cream} showRecommended={false} />
                    </div>

                    <div className="flex flex-col gap-4">
                      <div>
                        <h2 className="text-2xl font-medium text-foreground mb-2">{cream.name}</h2>
                        <p className="text-muted-foreground leading-relaxed">{cream.description}</p>
                      </div>

                      <div>
                        <h3 className="font-medium text-sm text-foreground mb-3 uppercase tracking-wide">
                          Active Ingredients ({activeIngredients.length})
                        </h3>
                        <div className="grid gap-2">
                          {activeIngredients.map((ingredient) => (
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

                      <div className="mt-2">
                        <h3 className="font-medium text-sm text-foreground mb-2 uppercase tracking-wide">Best for</h3>
                        <div className="flex flex-wrap gap-2">
                          {cream.traits.map((trait) => (
                            <div
                              key={trait}
                              className="flex items-center gap-[5px] px-[10px] py-[5px] rounded-[100px] shrink-0 bg-muted text-muted-foreground"
                            >
                              <span className="font-semibold text-[14px] whitespace-nowrap">{trait}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
