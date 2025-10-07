import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { traits, products } from "@/lib/products"
import { PageTitle, SectionHeading, SectionOverline, BodyText, SmallText, Section } from "@/components/ui/typography"
import { SectionContainer } from "@/components/ui/section-container"
import { ParallaxImage } from "@/components/parallax-image"
import { CategoryCarousel } from "@/components/category-carousel"
import { FaqSection } from "@/components/faq-section"
import {
  ClockIcon,
  SparklesIcon,
  ArrowsPointingInIcon,
  MagnifyingGlassIcon,
  BeakerIcon,
  SunIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid"
import type React from "react"

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-background">
          <div className="grid grid-cols-2 items-center gap-0">
            {/* Left: Hero Image */}
            <div className="relative aspect-[2/3] md:aspect-[4/3] bg-muted">
              <Image src="/images/design-mode/image.png" alt="ABBI Skincare" fill className="object-cover" priority />
            </div>

            {/* Right: Hero Content */}
            <div className="flex flex-col justify-center items-start px-5 py-5 md:py-8 bg-muted border-l-2 border-primary/10">
              <PageTitle variant="hero">
                <span className="font-serif italic font-medium">Your</span> Skin, Our{" "}
                <span className="font-serif italic font-medium">Formula</span>
              </PageTitle>
              <p className="text-[16px] font-medium tracking-[-0.32px] text-muted-foreground leading-[1.35] mb-4">
                Personalized skincare, perfected
              </p>
              <Button asChild className="font-mono">
                <Link href="/skin-analysis">Start My Journey</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* AI Skin Analysis Section */}
        <SectionContainer spacing="tight" className="md:py-12">
          <div className="container mx-auto px-5">
            <div className="flex flex-col md:flex-row md:items-center md:gap-12 md:max-w-6xl md:mx-auto">
              {/* Left: Content */}
              <div className="text-center md:text-left md:flex-1">
                <SectionOverline>AI SKIN ANALYSIS</SectionOverline>
                <SectionHeading spacing="tight">Personalized care for your unique skin</SectionHeading>
                <BodyText className="md:block mt-4 mb-6 text-muted-foreground max-w-xl">
                  Our advanced AI technology analyzes your skin in seconds, identifying your unique concerns and
                  recommending personalized formulas tailored specifically to your needs. Get professional-grade
                  insights without leaving home.
                </BodyText>
                <div className="flex justify-center md:justify-start">
                  <Button asChild size="lg" className="font-mono">
                    <Link href="/skin-analysis">Analyze My Skin</Link>
                  </Button>
                </div>
                <SmallText className="mt-4 md:mt-6">97% accurate when compared to a dermatological exam.</SmallText>
              </div>

              {/* Right: Phone Image */}
              <div className="mt-8 md:mt-0 md:flex-shrink-0 flex justify-center">
                <div className="relative rounded-2xl overflow-hidden">
                  <ParallaxImage
                    src="/images/skin-analysis.png"
                    alt="AI Skin Analysis"
                    width={828}
                    height={1792}
                    className="h-auto w-60 md:w-48 rounded-3xl border-2"
                    parallaxSpeed={0.3}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>

        {/* What Our Scan Evaluates */}
        <SectionContainer variant="muted">
          <div className="container mx-auto px-5">
            <Section
              heading="What Our Scan Evaluates"
              body="97% accurate when compared to a dermatological exam."
              align="left"
              spacing="tight"
              className="mb-8 md:mb-12"
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {traits.map((trait) => (
                <Link key={trait.id} href={`/shop?category=creams&traits=${trait.id}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary h-full">
                    <CardContent className="p-4 md:p-6 text-center flex flex-col items-center justify-center h-full">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors mb-3 bg-background">
                        {getTraitIcon(trait.id)}
                      </div>
                      <h3 className="text-sm md:text-base font-sans font-medium">{trait.name}</h3>
                      <p className="text-xs text-muted-foreground mt-2 hidden md:block">
                        {getTraitDescription(trait.id)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="mt-8 md:mt-12 text-left">
              <Button asChild size="lg" className="font-mono">
                <Link href="/skin-analysis">Get Your Skin Analysis</Link>
              </Button>
            </div>
          </div>
        </SectionContainer>

        {/* Product Categories */}
        <SectionContainer>
          <div className="container mx-auto px-5">
            <div className="space-y-10">
              {/* Personalized Creams Carousel */}
              <CategoryCarousel
                title="Personalized Creams"
                description="Custom formulas for your unique skin"
                products={products.filter((p) => p.category === "In-Lab Cream").slice(0, 5)}
                shopLink="/shop?category=creams"
              />

              {/* Simple Solutions Carousel */}
              <CategoryCarousel
                title="Simple Solutions"
                description="Complete regimens for targeted concerns"
                products={products.filter((p) => p.category === "Simple Solution").slice(0, 5)}
                shopLink="/shop?category=simple-solutions"
              />

              {/* Essentials Carousel */}
              <CategoryCarousel
                title="Essentials"
                description="Core products for every routine"
                products={products.filter((p) => p.category === "Essential").slice(0, 5)}
                shopLink="/shop?category=essentials"
              />
            </div>
          </div>
        </SectionContainer>

        {/* FAQ Section */}
        <FaqSection />
      </main>
      <Footer />
    </>
  )
}

function getTraitIcon(traitId: string): React.JSX.Element {
  const iconClass = "w-6 h-6 md:w-7 md:h-7 text-primary"
  const icons: Record<string, React.JSX.Element> = {
    wrinkles: <ClockIcon className={iconClass} />,
    radiance: <SparklesIcon className={iconClass} />,
    imperfections: <ArrowsPointingInIcon className={iconClass} />,
    spots: <MagnifyingGlassIcon className={iconClass} />,
    hydration: <BeakerIcon className={iconClass} />,
    sensitivity: <SparklesIcon className={iconClass} />,
    shine: <SunIcon className={iconClass} />,
    texture: <Squares2X2Icon className={iconClass} />,
  }
  return icons[traitId] || <span>•</span>
}

function getTraitDescription(traitId: string): string {
  const descriptions: Record<string, string> = {
    wrinkles: "Fine lines and aging signs",
    radiance: "Skin brightness and glow",
    imperfections: "Blemishes and clarity",
    spots: "Dark spots and pigmentation",
    hydration: "Moisture levels and plumpness",
    sensitivity: "Redness and reactivity",
    shine: "Oil production and matteness",
    texture: "Smoothness and refinement",
  }
  return descriptions[traitId] || ""
}
