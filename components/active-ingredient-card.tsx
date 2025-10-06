import Link from "next/link"
import Image from "next/image"

interface ActiveIngredientCardProps {
  id: string
  number?: number
  name: string
  image?: string
}

export function ActiveIngredientCard({ id, number, name, image }: ActiveIngredientCardProps) {
  return (
    <Link
      href={`/active-ingredient/${id}`}
      className="block bg-white rounded-[10px] border-2 border-[#f5f6f5] overflow-hidden hover:border-[#586158] transition-colors"
    >
      <div className="relative h-[120px] overflow-hidden">
        <Image
          src={image || "/minimalist-cosmetic-pump-bottle-product-photograph.jpg"}
          alt={name}
          fill
          className="object-cover"
          loading="lazy"
          sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
        />
      </div>
      <div className="bg-[#f5f6f5] p-[10px]">
        {number && (
          <p
            className="font-medium text-[12px] tracking-[-0.24px] text-[#586158] leading-[1.15] mb-1"
            style={{ fontFamily: "var(--font-geist-mono)", fontVariationSettings: "'wdth' 100" }}
          >
            No.{number}
          </p>
        )}
        <p className="font-semibold text-[14px] leading-[1.15] text-[#586158] tracking-normal">{name}</p>
      </div>
    </Link>
  )
}
