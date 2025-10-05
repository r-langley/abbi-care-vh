import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Sparkles, Scan, Beaker } from "lucide-react"
import { traits } from "@/lib/products"
import { PageTitle, SectionHeading, SectionOverline, CardTitle, BodyText, SmallText } from "@/components/ui/typography"
import { SectionContainer } from "@/components/ui/section-container"
import { FeatureCard } from "@/components/ui/feature-card"
import { ParallaxImage } from "@/components/parallax-image"

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
                  Discover the future of personalized care
                </p>
                <Button asChild variant="textLink" className="font-mono">
                  <Link href="/skin-analysis">
                    Start My Journey
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* AI Skin Analysis Section */}
        <SectionContainer spacing="tight" className="md:py-20">
          <div className="container mx-auto text-center px-5">
            <SectionOverline>AI SKIN ANALYSIS</SectionOverline>
            <SectionHeading spacing="tight">Personalized cosmetics based on your skin's unique needs</SectionHeading>
            <BodyText className="text-base md:text-lg mb-6 max-w-2xl mx-auto text-muted-foreground">
              Our advanced AI analyzes 8 key skin traits with 97% dermatologist-level accuracy to create your perfect
              formula
            </BodyText>
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

        {/* How It Works */}
        <SectionContainer variant="muted">
          <div className="container mx-auto px-4">
            <SectionHeading>How It Works</SectionHeading>
            <BodyText className="text-center text-base md:text-lg mb-8 md:mb-12 max-w-3xl mx-auto text-muted-foreground">
              Get personalized skincare in three simple steps. Our AI-powered technology makes it easy to discover
              products perfectly matched to your unique skin needs.
            </BodyText>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FeatureCard
                icon={<Scan className="text-primary w-6 h-6" />}
                title="1. Scan Your Skin"
                description="Use our AI-powered analysis with 97% dermatologist-level accuracy to identify your skin's unique characteristics across 8 key traits"
              />
              <FeatureCard
                icon={<Sparkles className="text-primary w-6 h-6" />}
                title="2. Get Recommendations"
                description="Receive personalized product suggestions based on your skin analysis, tailored to address your specific concerns and goals"
              />
              <FeatureCard
                icon={<Beaker className="text-primary w-6 h-6" />}
                title="3. Choose Your Formula"
                description="Select In-Lab custom formulation created by our experts or Mix-At-Home flexibility to blend your perfect cream yourself"
              />
            </div>
          </div>
        </SectionContainer>

        {/* Product Categories */}
        <SectionContainer>
          <div className="container mx-auto px-4">
            <SectionHeading spacing="tight">Shop by Category</SectionHeading>
            <BodyText className="text-center text-base md:text-lg mb-8 md:mb-12 max-w-3xl mx-auto text-muted-foreground">
              Explore our complete range of personalized skincare solutions, from custom-formulated creams to targeted
              treatments and daily essentials
            </BodyText>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <Link href="/personalized-creams">
                <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative aspect-square">
                    <Image
                      src="/placeholder.svg?height=400&width=400"
                      alt="Personalized Creams"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="px-6 text-center">
                    <CardTitle className="mb-2">Personalized Creams</CardTitle>
                    <SmallText>Custom formulas made for your unique skin profile and concerns</SmallText>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/essentials">
                <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative aspect-square">
                    <Image
                      src="/placeholder.svg?height=400&width=400"
                      alt="Essentials"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="px-6 text-center">
                    <CardTitle className="mb-2">Essentials</CardTitle>
                    <SmallText>Core products for every skincare routine, from cleansers to serums</SmallText>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/simple-solutions">
                <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative aspect-square">
                    <Image
                      src="/placeholder.svg?height=400&width=400"
                      alt="Simple Solutions"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="px-6 text-center">
                    <CardTitle className="mb-2">Simple Solutions</CardTitle>
                    <SmallText>Complete regimens for targeted concerns like acne, aging, and hydration</SmallText>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </SectionContainer>

        {/* Shop by Trait */}
        <SectionContainer variant="muted">
          <div className="container mx-auto px-4">
            <SectionHeading spacing="tight">Shop by Trait</SectionHeading>
            <BodyText className="text-center text-base md:text-lg mb-8 md:mb-12 max-w-3xl mx-auto text-muted-foreground">
              Find products tailored to your skin's top priorities. Each trait is analyzed by our AI to recommend the
              most effective solutions for your unique concerns.
            </BodyText>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {traits.map((trait) => (
                <Link key={trait.id} href={`/shop?category=creams&traits=${trait.id}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary">
                    <CardContent className="px-6 text-center">
                      <div className="h-12 flex items-center justify-center mb-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <span className="text-2xl">{getTraitIcon(trait.id)}</span>
                        </div>
                      </div>
                      <h3 className="font-mono text-sm">{trait.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </SectionContainer>
      </main>
      <Footer />
    </>
  )
}

function getTraitIcon(traitId: string): string {
  const icons: Record<string, string> = {
    wrinkles: "⏱️",
    radiance: "✨",
    imperfections: "🎯",
    spots: "🔍",
    hydration: "💧",
    sensitivity: "🌸",
    shine: "🌟",
    texture: "🧊",
  }
  return icons[traitId] || "•"
}
