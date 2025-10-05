import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DevicePhoneMobileIcon, SparklesIcon, ArrowsPointingInIcon } from "@heroicons/react/24/solid"
import { PageTitle, SectionHeading, CardTitle, BodyText } from "@/components/ui/typography"
import Link from "next/link"

export default function SkinAnalysisPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-b from-muted/30 to-background py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 p-6 rounded-full">
                <DevicePhoneMobileIcon className="h-12 w-12 text-primary" />
              </div>
            </div>
            <PageTitle className="mb-6">AI-Powered Skin Analysis</PageTitle>
            <BodyText className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get personalized skincare recommendations with 97% dermatologist-level accuracy
            </BodyText>
            <Button size="lg" className="font-mono">
              Start Your Analysis
            </Button>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <SectionHeading>How It Works</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-2.5">
              <Card className="shadow-none">
                <CardContent className="px-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="bg-primary/10 p-4 rounded-full">
                      <DevicePhoneMobileIcon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="mb-3">1. Take a Selfie</CardTitle>
                  <BodyText className="text-muted-foreground">
                    Upload a clear photo of your face in good lighting
                  </BodyText>
                </CardContent>
              </Card>
              <Card className="shadow-none">
                <CardContent className="px-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="bg-primary/10 p-4 rounded-full">
                      <ArrowsPointingInIcon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="mb-3">2. AI Analysis</CardTitle>
                  <BodyText className="text-muted-foreground">
                    Our AI analyzes 8 key skin traits with precision
                  </BodyText>
                </CardContent>
              </Card>
              <Card className="shadow-none">
                <CardContent className="px-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="bg-primary/10 p-4 rounded-full">
                      <SparklesIcon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="mb-3">3. Get Recommendations</CardTitle>
                  <BodyText className="text-muted-foreground">Receive personalized product suggestions</BodyText>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 8 Skin Traits */}
        <section className="bg-muted/30 py-10">
          <div className="container mx-auto px-4">
            <SectionHeading spacing="tight">8 Skin Traits We Analyze</SectionHeading>
            <BodyText className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Our AI evaluates your skin across multiple dimensions to create a complete profile
            </BodyText>
            <div className="grid grid-cols-2 md:grid-cols-4 max-w-4xl mx-auto gap-2.5">
              {["Wrinkles", "Radiance", "Imperfections", "Spots", "Hydration", "Sensitivity", "Shine", "Texture"].map(
                (trait) => (
                  <Link
                    key={trait}
                    href={`/shop?trait=${trait.toLowerCase()}`}
                    className="block transition-transform hover:scale-105"
                  >
                    <Card className="text-center shadow-none rounded-lg cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="px-6">
                        <p className="font-mono">{trait}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ),
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <SectionHeading className="mb-6">Ready to Discover Your Perfect Formula?</SectionHeading>
              <BodyText className="text-muted-foreground mb-8">
                Start your free skin analysis now and unlock personalized skincare recommendations
              </BodyText>
              <Button size="lg" className="font-mono">
                Start Free Analysis
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
