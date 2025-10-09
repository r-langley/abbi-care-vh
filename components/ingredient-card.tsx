import Link from "next/link"
import Image from "next/image"

interface IngredientCardProps {
  id: string
  number: number
  name: string
  description: string
  hideDescription?: boolean
  href?: string // Added optional href prop to override default link
}

export function IngredientCard({ id, number, name, description, hideDescription = false, href }: IngredientCardProps) {
  const linkHref = href || `/ingredient/${id}`

  return (
    <Link href={linkHref} className="block h-full">
      <div className="bg-white rounded-[10px] border-2 border-muted overflow-hidden relative flex flex-col h-full hover:border-primary transition-colors">
        <div className="relative h-[100px] overflow-hidden">
          <Image
            src="/ingredient-placeholder.jpg"
            alt={name}
            fill
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </div>
        <div className="bg-muted p-[10px] pb-[20px] flex flex-col gap-[10px] flex-1">
          <div className="flex flex-col gap-[5px]">
            <p className="font-semibold leading-[1.15] text-primary tracking-[-0.32px] text-sm">
              {name}
            </p>
            {!hideDescription && (
              <p className="text-[14px] tracking-[-0.28px] text-primary font-normal leading-5">
                {description}
              </p>
            )}
          </div>
          <p
            className="font-medium text-[13px] tracking-[-0.26px] text-primary leading-[1.15] font-mono"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            No.{number}
          </p>
        </div>
      </div>
    </Link>
  )
}
