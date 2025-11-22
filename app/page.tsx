"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SectionContainer } from "@/components/ui/section-container"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PlusIcon } from "@heroicons/react/24/solid"
import { SparklesIcon } from "@heroicons/react/24/outline"

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-[#FBF9F5]">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
            {/* Left: Hero Image */}
            <div className="relative h-[400px] md:h-auto w-full">
              <Image
                src="/diverse-group-of-women-of-all-ages-smiling-with-gl.jpg"
                alt="Diverse group of women representing ABBI community"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Right: Hero Content */}
            <div className="flex flex-col justify-center items-start px-6 py-12 md:px-16 md:py-0 max-w-xl">
              <h1 className="text-5xl md:text-7xl font-sans font-medium tracking-tight leading-[1.1] mb-6 text-[#373737]">
                Your <span className="font-serif italic">Skin</span>,<br />
                <span className="font-serif italic">Our</span> Formula
              </h1>
              <p className="text-lg text-[#586158] mb-8">Discover the future of personalized care.</p>
              <Button asChild size="lg" className="bg-[#6B4C9A] hover:bg-[#5a3f85] text-white rounded-md px-8 h-12">
                <Link href="/skin-analysis">Start My Journey</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* AI Skin Analysis Section */}
        <SectionContainer className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left: Content */}
              <div className="max-w-lg">
                <div className="flex items-center gap-2 mb-4 text-[#373737] font-mono text-xs uppercase tracking-widest">
                  <SparklesIcon className="w-4 h-4" />
                  <span>ABBI AI IS HERE</span>
                </div>
                <h2 className="text-3xl font-sans font-medium text-[#373737] leading-tight mb-6 tracking-tighter leading-5 md:text-4xl">
                  Personalized cosmetics based on your skin's unique needs
                </h2>
                <p className="text-lg text-[#586158] mb-8">97% accurate when compared to a dermatological exam.</p>
                <Button asChild size="lg" className="bg-[#6B4C9A] hover:bg-[#5a3f85] text-white rounded-md px-8 h-12">
                  <Link href="/skin-analysis">Analyze My Skin</Link>
                </Button>
              </div>

              {/* Right: Image */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="/portrait-of-beautiful-woman-with-freckles-and-glow.jpg"
                  alt="Personalized skin analysis result"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </SectionContainer>

        {/* Texture Banner */}
        <section className="relative w-full h-[300px] md:h-[400px]">
          <Image src="/close-up-texture-of-white-face-cream-being-applied.jpg" alt="Cream texture close up" fill className="object-cover" />
        </section>

        {/* Product Categories */}
        <SectionContainer className="py-16 md:py-24 bg-[#FBF9F5]">
          <div className="container mx-auto px-5">
            <div className="mb-12 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-sans font-medium text-[#373737] mb-4">
                Discover ABBI's full range of personalized skincare products
              </h2>
              <p className="text-[#586158]">
                Choose from products mixed in our French lab, or combine a Base with Active Concentrates to create your
                own daily regime at home.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: Image Left, Text Right */}
              <Link href="/shop?category=creams" className="group block">
                <div className="bg-white flex h-[280px] overflow-hidden rounded-lg hover:shadow-md transition-shadow">
                  <div className="w-1/2 relative bg-[#f5f5f5]">
                    <Image
                      src="/amber-glass-dropper-bottle-with-white-cream-textur.jpg"
                      alt="Custom Creams"
                      fill
                      className="object-cover mix-blend-multiply"
                    />
                  </div>
                  <div className="w-1/2 flex items-center justify-center p-6">
                    <h3 className="text-2xl font-sans text-[#373737]">Custom Creams</h3>
                  </div>
                </div>
              </Link>

              {/* Card 2: Image Left, Text Right */}
              <Link href="/shop?category=mix-at-home" className="group block">
                <div className="bg-white flex h-[280px] overflow-hidden rounded-lg hover:shadow-md transition-shadow">
                  <div className="w-1/2 relative bg-[#E8D4D4]">
                    <Image
                      src="/skincare-laboratory-tools-glass-beakers-pink-backg.jpg"
                      alt="Mix-at-Home"
                      fill
                      className="object-cover mix-blend-multiply"
                    />
                  </div>
                  <div className="w-1/2 flex items-center justify-center p-6">
                    <h3 className="text-2xl font-sans text-[#373737]">Mix-at-Home</h3>
                  </div>
                </div>
              </Link>

              {/* Card 3: Text Left, Image Right */}
              <Link href="/shop?category=essentials" className="group block">
                <div className="bg-white flex h-[280px] overflow-hidden rounded-lg hover:shadow-md transition-shadow">
                  <div className="w-1/2 flex items-center justify-center p-6">
                    <h3 className="text-2xl font-sans text-[#373737]">Essentials</h3>
                  </div>
                  <div className="w-1/2 relative bg-[#FFB380]">
                    <Image src="/woman-applying-face-serum-orange-background-close-.jpg" alt="Essentials" fill className="object-cover" />
                  </div>
                </div>
              </Link>

              {/* Card 4: Text Left, Image Right */}
              <Link href="/ingredients" className="group block">
                <div className="bg-white flex h-[280px] overflow-hidden rounded-lg hover:shadow-md transition-shadow">
                  <div className="w-1/2 flex items-center justify-center p-6">
                    <h3 className="text-2xl font-sans text-[#373737]">Ingredients</h3>
                  </div>
                  <div className="w-1/2 relative bg-[#2D5A45]">
                    <Image src="/white-elderflower-blossoms-close-up-nature-green-b.jpg" alt="Ingredients" fill className="object-cover" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </SectionContainer>

        {/* Featured Products */}
        <SectionContainer className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-5">
            <h2 className="text-3xl md:text-4xl font-sans font-medium text-[#373737] mb-12">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative aspect-square bg-[#F9F9F9] rounded-lg mb-4 flex items-center justify-center p-6 px-0 py-0">
                    <Image
                      src="/minimalist-white-skincare-bottle-with-green-leaf-a.jpg"
                      alt="Cream"
                      width={200}
                      height={200}
                      className="object-contain"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium text-[#373737]">Cream</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#586158]">$24.00</span>
                      <button className="w-8 h-8 rounded-full bg-[#6B4C9A] text-white flex items-center justify-center hover:bg-[#5a3f85] transition-colors">
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionContainer>

        {/* Lifestyle Banner */}
        <section className="relative w-full h-[500px] md:h-[600px]">
          <Image src="/young-woman-in-pink-top-dancing-or-posing-joyfully.jpg" alt="Feel good in your skin" fill className="object-cover" />
        </section>

        {/* FAQ Section */}
        <SectionContainer className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-5 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-sans font-medium text-[#373737] mb-12">FAQ</h2>
            <Accordion type="single" collapsible className="w-full">
              {[
                "How to use ABBI products?",
                "What is the difference between INLAB and ABBI FreshActive care?",
                "What is the shelf life of ABBI products?",
                "Are ABBI skincare products suitable for all skin types?",
                "What is ABBI Fresh Active cosmetic?",
                "What is the reliability rate of the ABBI online skin analysis?",
                "How many drops should I use for my ABBI treatments?",
                "Can I mix all ABBI FreshActiv actives together?",
                "How many active ingredients can I mix?",
              ].map((question, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-100">
                  <AccordionTrigger className="text-[#586158] hover:text-[#6B4C9A] py-6 text-left">
                    {question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    Our products are designed to be used daily. For specific application instructions, please refer to
                    the individual product packaging or our detailed usage guide on the product page. We recommend
                    starting with clean skin and applying products from thinnest to thickest consistency.
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </SectionContainer>
      </main>
      <Footer />
    </>
  )
}
