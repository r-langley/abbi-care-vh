import Image from "next/image"
import { PageTitle } from "./typography"

interface HeroSectionProps {
  image: string
  title: string
  description?: string
}

export function HeroSection({ image, title, description }: HeroSectionProps) {
  return (
    <div className="flex h-[160px]">
      {/* Left: Image */}
      <div className="flex-1 bg-[#f5f6f5] flex items-center justify-center overflow-hidden relative">
        <Image 
          src={image || "/placeholder.svg"} 
          alt={title} 
          fill 
          className="object-contain" 
          priority 
        />
      </div>

      {/* Right: Content */}
      <div className="flex-1 bg-[#f5f6f5] flex flex-col items-center justify-center gap-[10px] px-[20px] py-[20px] text-center text-[#586158] leading-[1.35]">
        <p className="font-semibold text-[24px] tracking-[-0.48px] w-full">{title}</p>
        {description && (
          <p className="font-medium text-[16px] tracking-[-0.32px] w-full">{description}</p>
        )}
      </div>
    </div>
  )
}
