import Link from "next/link"
import Image from "next/image"

interface IngredientCardProps {
  id: string
  number: number
  name: string
  description: string
}

export function IngredientCard({ id, number, name, description }: IngredientCardProps) {
  return (
    <Link href={`/ingredient/${id}`} className="block h-full">
      <div className="bg-white rounded-[10px] border-2 border-[#f5f6f5] overflow-hidden relative flex flex-col h-full hover:border-[#586158] transition-colors">
        <div className="relative h-[100px] overflow-hidden">
          <Image
            src="/ingredient-placeholder.jpg"
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div className="bg-[#f5f6f5] p-[10px] pb-[20px] flex flex-col gap-[10px] flex-1">
          <div className="flex flex-col gap-[5px]">
            <p className="font-semibold text-[16px] leading-[1.15] text-[#586158] tracking-[-0.32px]">
              {name}
            </p>
            <p className="font-medium text-[14px] tracking-[-0.28px] text-[#586158] leading-[1.15]">
              {description}
            </p>
          </div>
          <p
            className="font-medium text-[13px] tracking-[-0.26px] text-[#586158] leading-[1.15]"
            style={{ fontFamily: "var(--font-geist-mono)", fontVariationSettings: "'wdth' 100" }}
          >
            No.{number}
          </p>
        </div>
      </div>
    </Link>
  )
}
