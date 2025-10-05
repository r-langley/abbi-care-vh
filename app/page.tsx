import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { traits, products } from "@/lib/products"
import { PageTitle, SectionHeading, SectionOverline, BodyText, SmallText } from "@/components/ui/typography"
import { SectionContainer } from "@/components/ui/section-container"
import { ParallaxImage } from "@/components/parallax-image"
import { CategoryCarousel } from "@/components/category-carousel"
import { Clock, Sparkles, Target, Search, Droplet, Flower2, Sun, Grid3x3 } from "lucide-react"
import type React from "react"

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-background">
          <div className="container mx-auto px-0">
            <div className="grid grid-cols-2 items-center gap-0 bg-primary-foreground">
              {/* Left: Hero Image */}
              <div className="relative aspect-[2/3] md:aspect-square">
                <Image src="/images/design-mode/image.png" alt="ABBI Skincare" fill className="object-cover" priority />
              </div>

              {/* Right: Hero Content */}
              <div className="flex flex-col justify-center items-start px-5 py-5">
                <PageTitle variant="hero">Your Skin, Our Formula</PageTitle>
                <p className="text-base md:text-xl text-muted-foreground leading-relaxed mb-4 md:mb-8 font-medium leading-7">
                  Personalized skincare, perfected
                </p>
                <Button asChild variant="textLink" className="font-mono">
                  <Link href="/skin-analysis">Start My Journey</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* AI Skin Analysis Section */}
        <SectionContainer spacing="tight" className="md:py-20">
          <div className="container mx-auto text-center px-5">
            <SectionOverline>AI SKIN ANALYSIS</SectionOverline>
            <SectionHeading spacing="tight">Personalized care for your unique skin</SectionHeading>
            <Button asChild size="lg" className="font-mono">
              <Link href="/skin-analysis">Analyze My Skin</Link>
            </Button>

            <div className="mt-8 md:mt-12 max-w-md mx-auto">
              <div className="relative rounded-2xl overflow-hidden flex justify-center">
                <ParallaxImage
                  src="/images/skin-analysis.png"
                  alt="AI Skin Analysis"
                  width={828}
                  height={1792}
                  className="h-auto w-60 rounded-3xl border-2"
                  parallaxSpeed={0.3}
                />
              </div>
              <SmallText className="mt-4">97% accurate when compared to a dermatological exam.</SmallText>
            </div>
          </div>
        </SectionContainer>

        {/* What Our Scan Evaluates */}
        <SectionContainer variant="muted">
          <div className="container mx-auto px-4">
            <SectionHeading spacing="tight">What Our Scan Evaluates</SectionHeading>
            <BodyText className="text-center text-base md:text-lg mb-8 md:mb-12 max-w-3xl mx-auto text-muted-foreground">
              Our AI analyzes 8 key traits with 97% accuracy to create your personalized formula.
            </BodyText>
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
            <div className="text-center mt-8 md:mt-12">
              <Button asChild size="lg" className="font-mono">
                <Link href="/skin-analysis">Get Your Skin Analysis</Link>
              </Button>
            </div>
          </div>
        </SectionContainer>

        {/* Product Categories */}
        <SectionContainer>
          <div className="container mx-auto px-4">
            <div className="space-y-12">
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
      </main>
      <Footer />
    </>
  )
}

function getTraitIcon(traitId: string): React.JSX.Element {
  const iconClass = "w-6 h-6 md:w-7 md:h-7 text-primary"
  const icons: Record<string, React.JSX.Element> = {
    wrinkles: <Clock className={iconClass} />,
    radiance: <Sparkles className={iconClass} />,
    imperfections: <Target className={iconClass} />,
    spots: <Search className={iconClass} />,
    hydration: <Droplet className={iconClass} />,
    sensitivity: <Flower2 className={iconClass} />,
    shine: <Sun className={iconClass} />,
    texture: <Grid3x3 className={iconClass} />,
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
