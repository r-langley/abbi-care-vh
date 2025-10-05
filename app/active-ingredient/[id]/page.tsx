import { notFound } from "next/navigation"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getIngredientById } from "@/lib/ingredients-data"

export default function ActiveIngredientPage({ params }: { params: { id: string } }) {
  const ingredient = getIngredientById(params.id)

  if (!ingredient) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pb-20">
        <div className="max-w-2xl mx-auto px-5 py-10">
          <div className="bg-white rounded-[10px] border-2 border-[#f5f6f5] overflow-hidden">
            <div className="relative h-[300px] overflow-hidden">
              <Image src="/ingredient-placeholder.jpg" alt={ingredient.name} fill className="object-cover" />
            </div>
            <div className="p-6">
              <p
                className="font-medium text-[14px] tracking-[-0.28px] text-[#586158] leading-[1.15] mb-2"
                style={{ fontFamily: "var(--font-geist-mono)", fontVariationSettings: "'wdth' 100" }}
              >
                No.{ingredient.number}
              </p>
              <h1 className="font-semibold text-[32px] leading-[1.15] text-[#586158] tracking-normal mb-4">
                {ingredient.name}
              </h1>
              <p className="font-medium text-[16px] tracking-[-0.32px] text-[#586158] leading-[1.5] mb-6">
                {ingredient.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {ingredient.traits.map((trait) => (
                  <span
                    key={trait}
                    className="px-3 py-1 bg-[#f5f6f5] rounded-full text-[14px] font-medium text-[#586158]"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
