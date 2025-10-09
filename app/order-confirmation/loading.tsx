import { Header } from "@/components/header"
import { Spinner } from "@/components/ui/spinner"

export default function OrderConfirmationLoading() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-muted">
        <div className="container mx-auto px-5 py-5 max-w-[800px]">
          <div className="flex items-center justify-center py-20">
            <Spinner />
          </div>
        </div>
      </main>
    </>
  )
}
