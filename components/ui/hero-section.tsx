import Image from "next/image"
import { PageTitle, BodyText } from "@/components/ui/typography"
import { cn } from "@/lib/utils"

interface HeroSectionProps {
  image: string
  imageAlt: string
  title: string
  description?: string
  className?: string
}

export function HeroSection({ image, imageAlt, title, description, className }: HeroSectionProps) {
  return (
    <section className={cn("relative bg-background", className)}>
      <div className="container mx-auto px-0">
        <div className="grid grid-cols-2 items-center gap-0 bg-primary-foreground">
          {/* Left: Hero Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src={image || "/placeholder.svg"} alt={imageAlt} fill className="object-cover" priority />
          </div>

          {/* Right: Hero Content */}
          <div className="flex flex-col justify-center items-start px-5 py-8 md:py-12">
            <PageTitle className="text-2xl md:text-4xl lg:text-5xl mb-2 md:mb-4">{title}</PageTitle>
            {description && <BodyText className="text-sm md:text-lg text-muted-foreground">{description}</BodyText>}
          </div>
        </div>
      </div>
    </section>
  )
}
