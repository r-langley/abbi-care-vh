import Image from "next/image"
import { PageTitle } from "./typography"

interface HeroSectionProps {
  image: string
  title: string
  description?: string
  imageAlt?: string
}

export function HeroSection({ image, title, description, imageAlt = "" }: HeroSectionProps) {
  return (
    <div className="container mx-auto px-0 py-0 mb-8">
      <div className="grid grid-cols-2 gap-4 md:gap-8 items-center">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image src={image || "/placeholder.svg"} alt={imageAlt || title} fill className="object-cover" />
        </div>
        <div className="flex flex-col justify-center items-start px-4 py-4">
          <PageTitle className="text-lg md:text-3xl mb-2">{title}</PageTitle>
          {description && <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{description}</p>}
        </div>
      </div>
    </div>
  )
}
