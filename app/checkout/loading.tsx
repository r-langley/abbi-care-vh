import { Header } from "@/components/header"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"

export default function CheckoutLoading() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-muted">
        <div className="container mx-auto px-5 py-5 max-w-[1200px]">
          <div className="h-8 w-32 bg-muted-foreground/20 rounded mb-6 animate-pulse" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="h-6 w-48 bg-muted-foreground/20 rounded animate-pulse" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="h-10 bg-muted-foreground/20 rounded animate-pulse" />
                    <div className="h-10 bg-muted-foreground/20 rounded animate-pulse" />
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <div className="h-6 w-32 bg-muted-foreground/20 rounded animate-pulse" />
                </CardHeader>
                <CardContent className="flex items-center justify-center py-12">
                  <Spinner />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
