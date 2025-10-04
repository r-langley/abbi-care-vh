import Image from "next/image"
import { PageTitle } from "./typography"

interface HeroSectionProps {
  title: string
  description?: string
  image: string
  imageAlt: string
}

export function HeroSection({ title, description, image, imageAlt }: HeroSectionProps) {
  return (
    <div className="container mx-auto px-0 py-0">
      <div className="grid grid-cols-2 items-stretch gap-0">
        <div className="relative overflow-hidden rounded-lg h-full min-h-[300px] md:min-h-[400px]">
          <Image src={image || "/placeholder.svg"} alt={imageAlt} fill className="object-cover rounded-none" />
        </div>

        {/* Right: Content */}
        <div className="flex flex-col justify-center items-start px-5 py-5 bg-secondary">
          <PageTitle variant="hero">{title}</PageTitle>
          {description && <p className="md:text-xl text-muted-foreground leading-relaxed text-sm font-medium">{description}</p>}
        </div>
      </div>
    </div>
  )
}
