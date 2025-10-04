import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageTitle, BodyText } from "@/components/ui/typography"

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto">
            <PageTitle className="mb-8 text-center">About ABBI</PageTitle>
            <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
              <BodyText>
                ABBI is revolutionizing personalized skincare through the power of artificial intelligence and
                dermatological science.
              </BodyText>
              <BodyText>
                Our mission is to make professional-grade skin analysis accessible to everyone, empowering you to make
                informed decisions about your skincare routine.
              </BodyText>
              <BodyText>
                With 97% accuracy compared to dermatological exams, our AI technology analyzes 8 key skin traits to
                create truly personalized recommendations tailored to your unique needs.
              </BodyText>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
