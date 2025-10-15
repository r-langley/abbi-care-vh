import Link from "next/link"
import Image from "next/image"

interface ActiveIngredientCardProps {
  id: string
  number?: number
  name: string
  image?: string
  purity?: number // Added purity prop
}

export function ActiveIngredientCard({ id, number, name, image, purity }: ActiveIngredientCardProps) {
  return (
    <Link
      href={`/active-ingredient/${id}`}
      className="block bg-white rounded-[10px] border-2 border-muted overflow-hidden hover:border-primary transition-colors"
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
      <div className="bg-muted p-[10px]">
        <div className="flex items-center gap-2 mb-1">
          {number && (
            <p
              className="font-medium text-[12px] tracking-[-0.24px] text-primary leading-[1.15] font-mono"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              No.{number}
            </p>
          )}
          {purity && <p className="text-[11px] text-primary/60 font-medium">{purity}%</p>}
        </div>
        <p className="font-semibold text-[14px] leading-[1.15] text-primary tracking-normal">{name}</p>
      </div>
    </Link>
  )
}
