"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RecommendedBadge } from "@/components/recommended-badge"
import {
  PageTitle,
  SectionHeading,
  BodyText,
  SmallText,
  ExtraSmallText,
  PriceDisplay,
} from "@/components/ui/typography"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ProductCard } from "@/components/product-card"
import { IngredientCard } from "@/components/ingredient-card"
import { ActiveIngredientCard } from "@/components/active-ingredient-card"
import { TraitFilter } from "@/components/trait-filter"
import { HeroSection } from "@/components/ui/hero-section"
import { SectionContainer } from "@/components/ui/section-container"
import { products } from "@/lib/products"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  SwatchIcon,
  DocumentTextIcon,
  CursorArrowRaysIcon,
  TagIcon,
  RectangleStackIcon,
  PuzzlePieceIcon,
  Squares2X2Icon,
  ArrowsPointingOutIcon,
  DocumentCheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline"

export default function DesignSystemPage() {
  const [buttonSize, setButtonSize] = useState<"default" | "sm" | "lg">("default")
  const [badgeVariant, setBadgeVariant] = useState<"default" | "compact">("default")
  const [showIcon, setShowIcon] = useState(false)
  const [showRecommended, setShowRecommended] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const sampleProducts = products.slice(0, 4)

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-6 py-3 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <PageTitle>ABBI Design System</PageTitle>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(true)}>
              <Bars3Icon className="w-6 h-6" />
            </Button>
          </div>
          <BodyText className="text-muted-foreground">
            A comprehensive component library and design system for building cohesive ABBI experiences.
          </BodyText>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto">
        <Tabs defaultValue="colors" className="flex flex-col lg:flex-row">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetContent side="left" className="w-64 p-0">
              <div className="py-6">
                <TabsList className="flex-col items-stretch h-auto bg-transparent px-6 space-y-1">
                  <TabsTrigger
                    value="colors"
                    className="justify-start w-full gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <SwatchIcon className="w-4 h-4 shrink-0" />
                    Colors
                  </TabsTrigger>
                  <TabsTrigger
                    value="typography"
                    className="justify-start w-full gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <DocumentTextIcon className="w-4 h-4 shrink-0" />
                    Typography
                  </TabsTrigger>
                  <TabsTrigger
                    value="buttons"
                    className="justify-start w-full gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <CursorArrowRaysIcon className="w-4 h-4 shrink-0" />
                    Buttons
                  </TabsTrigger>
                  <TabsTrigger
                    value="badges"
                    className="justify-start w-full gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <TagIcon className="w-4 h-4 shrink-0" />
                    Badges
                  </TabsTrigger>
                  <TabsTrigger
                    value="cards"
                    className="justify-start w-full gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <RectangleStackIcon className="w-4 h-4 shrink-0" />
                    Cards
                  </TabsTrigger>
                  <TabsTrigger
                    value="composite"
                    className="justify-start w-full gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <PuzzlePieceIcon className="w-4 h-4 shrink-0" />
                    Composite
                  </TabsTrigger>
                  <TabsTrigger
                    value="layouts"
                    className="justify-start w-full gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Squares2X2Icon className="w-4 h-4 shrink-0" />
                    Layouts
                  </TabsTrigger>
                  <TabsTrigger
                    value="spacing"
                    className="justify-start w-full gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ArrowsPointingOutIcon className="w-4 h-4 shrink-0" />
                    Spacing
                  </TabsTrigger>
                  <TabsTrigger
                    value="guidelines"
                    className="justify-start w-full gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <DocumentCheckIcon className="w-4 h-4 shrink-0" />
                    Guidelines
                  </TabsTrigger>
                </TabsList>
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop Sidebar */}
          <aside
            className={`hidden lg:block border-r border-border sticky top-[88px] h-[calc(100vh-88px)] overflow-y-auto shrink-0 transition-all duration-300 ease-in-out ${
              sidebarCollapsed ? "w-16" : "w-64"
            } ml-4 mt-4 mb-4 rounded-lg bg-muted/30`}
          >
            <div className="flex justify-end p-2 border-b border-border">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hover:bg-muted"
              >
                {sidebarCollapsed ? <ChevronRightIcon className="w-4 h-4" /> : <ChevronLeftIcon className="w-4 h-4" />}
              </Button>
            </div>

            <TabsList
              className={`flex-col items-stretch h-auto bg-transparent pb-6 space-y-1 ${sidebarCollapsed ? "px-2" : "px-6"}`}
            >
              <TabsTrigger value="colors" className="justify-start w-full gap-2" title="Colors">
                <SwatchIcon className="w-4 h-4 shrink-0" />
                {!sidebarCollapsed && "Colors"}
              </TabsTrigger>
              <TabsTrigger value="typography" className="justify-start w-full gap-2" title="Typography">
                <DocumentTextIcon className="w-4 h-4 shrink-0" />
                {!sidebarCollapsed && "Typography"}
              </TabsTrigger>
              <TabsTrigger value="buttons" className="justify-start w-full gap-2" title="Buttons">
                <CursorArrowRaysIcon className="w-4 h-4 shrink-0" />
                {!sidebarCollapsed && "Buttons"}
              </TabsTrigger>
              <TabsTrigger value="badges" className="justify-start w-full gap-2" title="Badges">
                <TagIcon className="w-4 h-4 shrink-0" />
                {!sidebarCollapsed && "Badges"}
              </TabsTrigger>
              <TabsTrigger value="cards" className="justify-start w-full gap-2" title="Cards">
                <RectangleStackIcon className="w-4 h-4 shrink-0" />
                {!sidebarCollapsed && "Cards"}
              </TabsTrigger>
              <TabsTrigger value="composite" className="justify-start w-full gap-2" title="Composite">
                <PuzzlePieceIcon className="w-4 h-4 shrink-0" />
                {!sidebarCollapsed && "Composite"}
              </TabsTrigger>
              <TabsTrigger value="layouts" className="justify-start w-full gap-2" title="Layouts">
                <Squares2X2Icon className="w-4 h-4 shrink-0" />
                {!sidebarCollapsed && "Layouts"}
              </TabsTrigger>
              <TabsTrigger value="spacing" className="justify-start w-full gap-2" title="Spacing">
                <ArrowsPointingOutIcon className="w-4 h-4 shrink-0" />
                {!sidebarCollapsed && "Spacing"}
              </TabsTrigger>
              <TabsTrigger value="guidelines" className="justify-start w-full gap-2" title="Guidelines">
                <DocumentCheckIcon className="w-4 h-4 shrink-0" />
                {!sidebarCollapsed && "Guidelines"}
              </TabsTrigger>
            </TabsList>
          </aside>

          {/* Content Area */}
          <div className="flex-1 px-6 py-10 max-w-5xl flex flex-col gap-10 lg:px-10">
            <TabsContent value="colors" className="flex flex-col gap-10">
              <div>
                <SectionHeading align="left" spacing="tight">
                  Color Palette
                </SectionHeading>
                <BodyText className="mb-6 text-muted-foreground">
                  ABBI uses a carefully curated color palette centered around natural, earthy tones.
                </BodyText>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Primary Colors</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <ColorSwatch name="Sea Slate" hex="#586158" var="--sea-slate" description="Primary brand color" />
                      <ColorSwatch name="Sage" hex="#f5f6f5" var="--sage" description="Background, cards" />
                      <ColorSwatch name="Evergreen" hex="#3e463e" var="--evergreen" description="Darker accent" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Status Colors</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <ColorSwatch name="Red" hex="#ff3b30" var="--status-red" description="Low scores, alerts" />
                      <ColorSwatch name="Orange" hex="#ff9500" var="--status-orange" description="Moderate scores" />
                      <ColorSwatch name="Green" hex="#34c759" var="--status-green" description="Good scores" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Semantic Tokens</h3>
                    <div className="p-6 rounded-lg bg-muted">
                      <BodyText className="mb-4">Always use semantic tokens instead of hardcoded hex values:</BodyText>
                      <div className="p-4 rounded font-mono text-sm space-y-2 bg-accent-foreground">
                        <div className="text-green-600">✓ bg-primary text-primary-foreground</div>
                        <div className="text-green-600">✓ border-muted hover:border-primary</div>
                        <div className="text-red-600">✗ bg-[#586158] text-white</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="typography" className="flex flex-col gap-10">
              <div>
                <SectionHeading align="left" spacing="tight">
                  Typography System
                </SectionHeading>
                <BodyText className="mb-6 text-muted-foreground">
                  ABBI uses three font families for different purposes.
                </BodyText>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-primary">Font Families</h3>
                    <div className="space-y-4">
                      <div className="p-6 rounded-lg bg-muted">
                        <p className="font-sans text-2xl mb-2">Poppins (Sans-serif)</p>
                        <SmallText className="text-muted-foreground">Primary font for body text and headings</SmallText>
                      </div>
                      <div className="p-6 rounded-lg bg-muted">
                        <p className="font-serif text-2xl italic mb-2">Instrument Serif</p>
                        <SmallText className="text-muted-foreground">Italic accents for emphasis</SmallText>
                      </div>
                      <div className="p-6 rounded-lg bg-muted">
                        <p className="font-mono text-2xl mb-2">Geist Mono</p>
                        <SmallText className="text-muted-foreground">Numbers, prices, technical data</SmallText>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-primary">Text Sizes</h3>
                    <div className="space-y-4">
                      <TypeScale size="24px" className="text-2xl font-semibold" label="Headings">
                        The quick brown fox jumps
                      </TypeScale>
                      <TypeScale size="18px" className="text-lg font-semibold" label="Subheadings">
                        The quick brown fox jumps over
                      </TypeScale>
                      <TypeScale size="16px" className="text-base font-medium" label="Body">
                        The quick brown fox jumps over the lazy dog
                      </TypeScale>
                      <TypeScale size="14px" className="text-sm font-medium" label="Small">
                        The quick brown fox jumps over the lazy dog
                      </TypeScale>
                      <TypeScale size="13px" className="text-[13px] font-medium" label="Tiny">
                        The quick brown fox jumps over the lazy dog
                      </TypeScale>
                      <TypeScale size="12px" className="text-xs font-semibold" label="Micro">
                        The quick brown fox jumps over the lazy dog
                      </TypeScale>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-primary">Typography Components</h3>
                    <div className="p-6 rounded-lg space-y-5 bg-muted">
                      <PageTitle>Page Title Component</PageTitle>
                      <SectionHeading align="left">Section Heading Component</SectionHeading>
                      <BodyText>Body text component for comfortable reading with proper line height.</BodyText>
                      <SmallText>Small text component for secondary information.</SmallText>
                      <ExtraSmallText>Extra small text for captions and metadata.</ExtraSmallText>
                      <PriceDisplay amount={49.99} size="large" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="buttons" className="flex flex-col gap-10">
              <div>
                <SectionHeading align="left" spacing="tight">
                  Button Components
                </SectionHeading>
                <BodyText className="mb-6 text-muted-foreground">
                  Interactive controls for button variants and sizes.
                </BodyText>

                <div className="bg-muted p-6 rounded-lg mb-8">
                  <h3 className="text-lg font-semibold mb-4">Controls</h3>
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                      <Label>Size:</Label>
                      <select
                        value={buttonSize}
                        onChange={(e) => setButtonSize(e.target.value as any)}
                        className="px-3 py-1 rounded border border-border bg-background"
                      >
                        <option value="sm">Small</option>
                        <option value="default">Default</option>
                        <option value="lg">Large</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="show-icon" checked={showIcon} onCheckedChange={setShowIcon} />
                      <Label htmlFor="show-icon">Show Icon</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Button Variants</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ComponentShowcase title="Default" description="Primary action button">
                        <Button size={buttonSize}>
                          {showIcon && <PlusIcon />}
                          Default Button
                        </Button>
                      </ComponentShowcase>

                      <ComponentShowcase title="Outline" description="Secondary action with border">
                        <Button variant="outline" size={buttonSize}>
                          {showIcon && <PlusIcon />}
                          Outline Button
                        </Button>
                      </ComponentShowcase>

                      <ComponentShowcase title="Secondary" description="Alternative action">
                        <Button variant="secondary" size={buttonSize}>
                          {showIcon && <PlusIcon />}
                          Secondary Button
                        </Button>
                      </ComponentShowcase>

                      <ComponentShowcase title="Ghost" description="Minimal button style">
                        <Button variant="ghost" size={buttonSize}>
                          {showIcon && <PlusIcon />}
                          Ghost Button
                        </Button>
                      </ComponentShowcase>

                      <ComponentShowcase title="Link" description="Text link with underline">
                        <Button variant="link" size={buttonSize}>
                          Link Button
                        </Button>
                      </ComponentShowcase>

                      <ComponentShowcase title="Destructive" description="Dangerous actions">
                        <Button variant="destructive" size={buttonSize}>
                          {showIcon && <PlusIcon />}
                          Destructive Button
                        </Button>
                      </ComponentShowcase>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Icon Buttons</h3>
                    <div className="flex flex-wrap gap-4">
                      <Button size="icon-sm" variant="default">
                        <PlusIcon />
                      </Button>
                      <Button size="icon" variant="default">
                        <PlusIcon />
                      </Button>
                      <Button size="icon-lg" variant="default">
                        <PlusIcon />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">States</h3>
                    <div className="flex flex-wrap gap-4">
                      <Button size={buttonSize}>Normal</Button>
                      <Button size={buttonSize} disabled>
                        Disabled
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="badges" className="flex flex-col gap-10">
              <div>
                <SectionHeading align="left" spacing="tight">
                  Badge Components
                </SectionHeading>
                <BodyText className="mb-6 text-muted-foreground">Small status indicators and labels.</BodyText>

                <div className="bg-muted p-6 rounded-lg mb-8">
                  <h3 className="text-lg font-semibold mb-4">Controls</h3>
                  <div className="flex items-center gap-2">
                    <Label>Variant:</Label>
                    <select
                      value={badgeVariant}
                      onChange={(e) => setBadgeVariant(e.target.value as any)}
                      className="px-3 py-1 rounded border border-border bg-background"
                    >
                      <option value="default">Default</option>
                      <option value="compact">Compact</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Recommended Badge</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ComponentShowcase title="Default Variant" description="Standard padding">
                        <RecommendedBadge variant="default" />
                      </ComponentShowcase>
                      <ComponentShowcase title="Compact Variant" description="Reduced padding">
                        <RecommendedBadge variant="compact" />
                      </ComponentShowcase>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Usage Example</h3>
                    <div className="bg-muted p-6 rounded-lg">
                      <div className="relative inline-block">
                        <div className="w-48 h-48 bg-background rounded-lg border-2 border-border" />
                        <RecommendedBadge variant={badgeVariant} className="absolute top-3 left-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cards" className="flex flex-col gap-10">
              <div>
                <SectionHeading align="left" spacing="tight">
                  Card Components
                </SectionHeading>
                <BodyText className="mb-6 text-muted-foreground">
                  Container components for grouping related content.
                </BodyText>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Standard Card</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Card Title</CardTitle>
                          <CardDescription>Card description goes here</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <BodyText>This is the card content area where you can place any content.</BodyText>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>With Action</CardTitle>
                          <CardDescription>Card with header action</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <BodyText>Cards can include actions in the header area.</BodyText>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Product Card Pattern</h3>
                    <div className="max-w-xs">
                      <div className="bg-white rounded-[10px] border-2 border-muted overflow-hidden hover:border-primary transition-colors">
                        <div className="relative h-[160px] bg-muted flex items-center justify-center">
                          <SmallText className="text-muted-foreground">Product Image</SmallText>
                        </div>
                        <div className="bg-muted p-[10px] pb-[20px] flex flex-col gap-[10px]">
                          <div className="flex flex-col gap-[5px]">
                            <p className="leading-[1.15] text-primary tracking-normal text-base font-semibold">
                              Product Name
                            </p>
                          </div>
                          <p className="text-[13px] tracking-[-0.26px] leading-[1.15] font-semibold text-primary font-mono">
                            $49.99
                          </p>
                          <button className="bg-primary text-primary-foreground rounded-full size-[32px] flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity">
                            <PlusIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Card Specifications</h3>
                    <div className="p-6 rounded-lg space-y-2 font-mono text-sm shadow-xs bg-muted">
                      <div>Border: 2px solid var(--sage)</div>
                      <div>Border Radius: 10px</div>
                      <div>Hover: border-color changes to var(--sea-slate)</div>
                      <div>Details Background: var(--sage)</div>
                      <div>Padding: 10px (20px bottom)</div>
                      <div>Gap: 10px between elements</div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="spacing" className="flex flex-col gap-10">
              <div>
                <SectionHeading align="left" spacing="tight">
                  Spacing System
                </SectionHeading>
                <BodyText className="mb-6 text-muted-foreground">
                  Consistent spacing creates visual rhythm and hierarchy.
                </BodyText>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Spacing Scale</h3>
                    <div className="space-y-4">
                      <SpacingExample size="5px" label="Micro" description="Between related items" />
                      <SpacingExample size="10px" label="Small" description="Standard gap" />
                      <SpacingExample size="20px" label="Medium" description="Section spacing" />
                      <SpacingExample size="23px" label="Large" description="Major sections" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Layout Patterns</h3>
                    <div className="space-y-4">
                      <div className="bg-muted p-6 rounded-lg">
                        <h4 className="font-semibold mb-2">Grid Layouts</h4>
                        <div className="space-y-2 text-sm">
                          <div>2 columns: Product grids, ingredient grids</div>
                          <div>3 columns: Active ingredients, concentrates</div>
                          <div>Gap: 8-10px between items</div>
                        </div>
                      </div>
                      <div className="bg-muted p-6 rounded-lg">
                        <h4 className="font-semibold mb-2">Sections</h4>
                        <div className="space-y-2 text-sm">
                          <div>Padding: 20px (px-5 py-5)</div>
                          <div>Max width: 800px for sheets</div>
                          <div>Background alternation: White / Sage</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="composite" className="flex flex-col gap-10">
              <div className="flex flex-col gap-10">
                <SectionHeading align="left" spacing="tight">
                  Composite Components
                </SectionHeading>
                <BodyText className="mb-6 text-muted-foreground">
                  Complex, reusable components built from atomic elements.
                </BodyText>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Product Card</h3>
                  <BodyText className="text-sm text-muted-foreground">
                    Location:{" "}
                    <code className="bg-muted px-2 py-1 rounded text-xs font-mono">/components/product-card.tsx</code>
                  </BodyText>
                  <div className="bg-muted p-6 rounded-lg">
                    <h4 className="font-semibold mb-2">Features</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>160px image height with lazy loading</li>
                      <li>Hover state: border changes from muted to primary</li>
                      <li>Add to cart button (32px circle)</li>
                      <li>Optional recommended badge</li>
                      <li>Automatic cart state detection</li>
                    </ul>
                  </div>
                  <div className="flex items-center gap-4 bg-muted p-4 rounded-lg">
                    <Switch id="show-rec" checked={showRecommended} onCheckedChange={setShowRecommended} />
                    <Label htmlFor="show-rec">Show Recommended Badge</Label>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {sampleProducts.map((product) => (
                      <ProductCard key={product.id} product={product} showRecommended={showRecommended} />
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Ingredient Card</h3>
                  <BodyText className="text-sm text-muted-foreground">
                    Location:{" "}
                    <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
                      /components/ingredient-card.tsx
                    </code>
                  </BodyText>
                  <div className="bg-muted p-6 rounded-lg">
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>100px image height (smaller than product cards)</li>
                      <li>Number display in Geist Mono font</li>
                      <li>Optional description</li>
                    </ul>
                  </div>
                  <div className="max-w-xs">
                    <IngredientCard
                      id="demo-1"
                      name="Hyaluronic Acid"
                      number={1}
                      description="Deeply hydrates and plumps the skin"
                      href="#"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Active Ingredient Card</h3>
                  <BodyText className="text-sm text-muted-foreground">
                    Location:{" "}
                    <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
                      /components/active-ingredient-card.tsx
                    </code>
                  </BodyText>
                  <div className="max-w-xs">
                    <ActiveIngredientCard
                      id="demo-active"
                      name="Retinol Complex"
                      number={2}
                      image="/minimalist-cosmetic-pump-bottle-product-photograph.jpg"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Hero Section</h3>
                  <BodyText className="text-sm text-muted-foreground">
                    Location:{" "}
                    <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
                      /components/ui/hero-section.tsx
                    </code>
                  </BodyText>
                  <HeroSection
                    image="/minimalist-cosmetic-pump-bottle-product-photograph.jpg"
                    title="Personalized Skincare"
                    description="Tailored to your unique skin profile"
                    imagePosition="left"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Trait Filter</h3>
                  <BodyText className="text-sm text-muted-foreground">
                    Location:{" "}
                    <code className="bg-muted px-2 py-1 rounded text-xs font-mono">/components/trait-filter.tsx</code>
                  </BodyText>
                  <div className="bg-background rounded-lg border border-border overflow-hidden">
                    <TraitFilter />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="layouts" className="flex flex-col gap-10">
              <div>
                <SectionHeading align="left" spacing="tight">
                  Layout Patterns
                </SectionHeading>
                <BodyText className="mb-6 text-muted-foreground">Reusable layout patterns and grid systems.</BodyText>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold">Product Grid Layouts</h3>

                    <div>
                      <h4 className="font-semibold mb-2">2-Column Grid (Mobile)</h4>
                      <div className="bg-muted p-4 rounded-lg mb-2">
                        <code className="text-xs font-mono">grid grid-cols-2 gap-[10px]</code>
                      </div>
                      <div className="grid grid-cols-2 gap-[10px]">
                        {sampleProducts.slice(0, 2).map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">4-Column Grid (Desktop)</h4>
                      <div className="bg-muted p-4 rounded-lg mb-2">
                        <code className="text-xs font-mono">grid md:grid-cols-3 lg:grid-cols-4 gap-[10px]</code>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[10px]">
                        {sampleProducts.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">Section Container</h3>
                    <BodyText className="text-sm text-muted-foreground">
                      Location:{" "}
                      <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
                        /components/ui/section-container.tsx
                      </code>
                    </BodyText>
                    <div className="space-y-4">
                      <SectionContainer variant="default" spacing="tight" className="border border-border">
                        <BodyText className="text-center">Default Section (Tight Spacing)</BodyText>
                      </SectionContainer>
                      <SectionContainer variant="muted" spacing="default" className="border border-border">
                        <BodyText className="text-center">Muted Section (Default Spacing)</BodyText>
                      </SectionContainer>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="guidelines" className="flex flex-col gap-10">
              <div>
                <SectionHeading align="left" spacing="tight">
                  Development Guidelines
                </SectionHeading>
                <BodyText className="mb-6 text-muted-foreground">
                  Best practices for building with the ABBI design system.
                </BodyText>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">Component Principles</h3>
                    <div className="bg-muted p-6 rounded-lg">
                      <h4 className="font-semibold mb-2">Single Source of Truth</h4>
                      <p className="text-sm mb-3">
                        All components in <code className="bg-background px-2 py-1 rounded text-xs">/components</code>{" "}
                        represent the canonical implementation. When you modify a component, it updates everywhere it's
                        used.
                      </p>
                      <div className="bg-background p-4 rounded space-y-2 text-sm">
                        <div className="text-green-600">✓ Modify the source component in /components</div>
                        <div className="text-red-600">✗ Don't copy/paste and modify inline</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Color Usage Rules</h3>
                    <div className="bg-muted p-6 rounded-lg">
                      <h4 className="font-semibold mb-3">CRITICAL: Always Use Semantic Tokens</h4>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm mb-2 font-semibold text-green-600">✓ Correct Usage</p>
                          <div className="bg-background p-4 rounded text-xs font-mono space-y-1">
                            <div>className="bg-primary text-primary-foreground"</div>
                            <div>className="border-muted hover:border-primary"</div>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm mb-2 font-semibold text-red-600">✗ Wrong - Never Do This</p>
                          <div className="bg-background p-4 rounded text-xs font-mono space-y-1">
                            <div className="text-red-600">className="bg-[#586158] text-white"</div>
                            <div className="text-red-600">className="border-[#f5f6f5]"</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Quick Reference</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-muted p-6 rounded-lg">
                        <h4 className="font-semibold mb-3">Card Specs</h4>
                        <div className="text-xs font-mono space-y-1">
                          <div>Border: 2px border-muted</div>
                          <div>Radius: rounded-[10px]</div>
                          <div>Hover: hover:border-primary</div>
                          <div>Padding: p-[10px] pb-[20px]</div>
                          <div>Gap: gap-[10px]</div>
                        </div>
                      </div>

                      <div className="bg-muted p-6 rounded-lg">
                        <h4 className="font-semibold mb-3">Image Heights</h4>
                        <div className="text-xs font-mono space-y-1">
                          <div>Product Card: h-[160px]</div>
                          <div>Active Card: h-[120px]</div>
                          <div>Ingredient Card: h-[100px]</div>
                          <div>Hero Section: h-[160px]</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

function ColorSwatch({
  name,
  hex,
  var: cssVar,
  description,
}: { name: string; hex: string; var: string; description: string }) {
  return (
    <div className="bg-background border rounded-lg overflow-hidden border-border">
      <div className="h-24" style={{ backgroundColor: hex }} />
      <div className="p-4">
        <h4 className="font-semibold mb-1">{name}</h4>
        <p className="text-xs font-mono text-muted-foreground mb-1">{hex}</p>
        <p className="text-xs font-mono text-muted-foreground mb-2">{cssVar}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

function TypeScale({
  size,
  label,
  className,
  children,
  description,
}: { size: string; label: string; className: string; children: React.ReactNode; description?: string }) {
  return (
    <div className="p-6 rounded-lg bg-muted">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-xs font-mono text-muted-foreground">{label}</span>
        <span className="text-xs font-mono text-muted-foreground">{size}</span>
      </div>
      <div className={className}>{children}</div>
      {description && <p className="text-xs text-muted-foreground mt-2">{description}</p>}
    </div>
  )
}

function ComponentShowcase({
  title,
  description,
  children,
}: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="bg-muted p-6 rounded-lg">
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="text-xs text-muted-foreground mb-4">{description}</p>
      <div className="flex items-center justify-center p-4 bg-background rounded">{children}</div>
    </div>
  )
}

function SpacingExample({ size, label, description }: { size: string; label: string; description: string }) {
  return (
    <div className="bg-muted p-6 rounded-lg">
      <div className="flex items-center gap-4 mb-2">
        <span className="text-sm font-semibold min-w-20">{label}</span>
        <span className="text-xs font-mono text-muted-foreground">{size}</span>
      </div>
      <div className="bg-primary rounded" style={{ height: "8px", width: size }} />
      <p className="text-xs text-muted-foreground mt-2">{description}</p>
    </div>
  )
}

function PlusIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  )
}
