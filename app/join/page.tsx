import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function JoinPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-xl mx-auto">
            <Card>
              <CardContent className="p-8 md:p-12">
                <h1 className="text-3xl font-bold mb-4 text-center">Join ABBI</h1>
                <p className="text-muted-foreground text-center mb-8">
                  Get exclusive access to personalized skincare tips, early product launches, and special offers
                </p>
                <form className="space-y-4">
                  <div>
                    <Input type="email" placeholder="Enter your email" className="w-full" />
                  </div>
                  <Button type="submit" size="lg" className="w-full font-mono">
                    Subscribe
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground text-center mt-6">
                  By subscribing, you agree to receive marketing emails from ABBI. You can unsubscribe at any time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
