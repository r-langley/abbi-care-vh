import Image from "next/image"

interface HeroSectionProps {
  image: string
  title: string
  description?: string
  imagePosition?: "left" | "right"
}

export function HeroSection({ image, title, description, imagePosition = "left" }: HeroSectionProps) {
  return (
    <div className={`flex h-[160px] ${imagePosition === "right" ? "flex-row-reverse" : ""}`}>
      {/* Image */}
      <div className="flex-1 bg-[#f5f6f5] flex items-center justify-center overflow-hidden relative">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
      </div>

      {/* Content */}
      <div className="flex-1 bg-[#f5f6f5] flex flex-col items-center justify-center gap-[10px] px-[20px] py-[20px] text-center text-[#586158] leading-[1.35] text-foreground bg-muted">
        <p className="font-semibold text-[24px] w-full tracking-normal">{title}</p>
        {description && <p className="font-medium text-[16px] tracking-[-0.32px] w-full text-muted-foreground">{description}</p>}
      </div>
    </div>
  )
}
