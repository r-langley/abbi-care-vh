import Image from "next/image"
import { PageTitle } from "./typography"

interface HeroSectionProps {
  image: string
  title: string
  description?: string
}

export function HeroSection({ image, title, description }: HeroSectionProps) {
  return (
    <div className="grid grid-cols-2 h-[160px]">
      {/* Left: Image */}
      <div className="relative overflow-hidden">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
      </div>

      {/* Right: Content */}
      <div className="flex flex-col justify-center items-start px-5 py-5 bg-secondary">
        <PageTitle variant="hero">{title}</PageTitle>
        {description && (
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-medium">{description}</p>
        )}
      </div>
    </div>
  )
}
