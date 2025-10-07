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

export default function DesignSystemPage() {
  const [buttonSize, setButtonSize] = useState<"default" | "sm" | "lg">("default")
  const [badgeVariant, setBadgeVariant] = useState<"default" | "compact">("default")
  const [showIcon, setShowIcon] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-5 py-10 bg-sidebar-primary-foreground">
        <div className="mb-12">
          <PageTitle>ABBI Design System</PageTitle>
          <BodyText className="mt-4 text-muted-foreground">
            A comprehensive component library and design system for building cohesive ABBI experiences.
          </BodyText>
        </div>

        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="mb-8 flex-wrap h-auto">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="buttons">Buttons</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="spacing">Spacing</TabsTrigger>
          </TabsList>

          {/* Colors Section */}
          <TabsContent value="colors" className="space-y-8">
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
                  <div className="p-6 rounded-lg border border-border">
                    <BodyText className="mb-4">Always use semantic tokens instead of hardcoded hex values:</BodyText>
                    <div className="bg-background p-4 rounded font-mono text-sm space-y-2">
                      <div className="text-green-600">✓ bg-primary text-primary-foreground</div>
                      <div className="text-green-600">✓ border-muted hover:border-primary</div>
                      <div className="text-red-600">✗ bg-[#586158] text-white</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Typography Section */}
          <TabsContent value="typography" className="space-y-8">
            <div>
              <SectionHeading align="left" spacing="tight">
                Typography System
              </SectionHeading>
              <BodyText className="mb-6 text-muted-foreground">
                ABBI uses three font families for different purposes.
              </BodyText>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Font Families</h3>
                  <div className="space-y-4">
                    <div className="p-6 rounded-lg border border-border bg-card">
                      <p className="font-sans text-2xl mb-2">Poppins (Sans-serif)</p>
                      <SmallText className="text-muted-foreground">Primary font for body text and headings</SmallText>
                    </div>
                    <div className="p-6 rounded-lg border border-border bg-card">
                      <p className="font-serif text-2xl italic mb-2">Instrument Serif</p>
                      <SmallText className="text-muted-foreground">Italic accents for emphasis</SmallText>
                    </div>
                    <div className="p-6 rounded-lg border border-border bg-card">
                      <p className="font-mono text-2xl mb-2">Geist Mono</p>
                      <SmallText className="text-muted-foreground">Numbers, prices, technical data</SmallText>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Text Sizes</h3>
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
                  <h3 className="text-lg font-semibold mb-4">Typography Components</h3>
                  <div className="p-6 rounded-lg border border-border space-y-4 bg-card">
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

          {/* Buttons Section */}
          <TabsContent value="buttons" className="space-y-8">
            <div>
              <SectionHeading align="left" spacing="tight">
                Button Components
              </SectionHeading>
              <BodyText className="mb-6 text-muted-foreground">
                Interactive controls for button variants and sizes.
              </BodyText>

              <div className="p-6 rounded-lg border border-border mb-8 bg-card">
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
                    <Switch className="" id="show-icon" checked={showIcon} onCheckedChange={setShowIcon} />
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

          {/* Badges Section */}
          <TabsContent value="badges" className="space-y-8">
            <div>
              <SectionHeading align="left" spacing="tight">
                Badge Components
              </SectionHeading>
              <BodyText className="mb-6 text-muted-foreground">Small status indicators and labels.</BodyText>

              <div className="p-6 rounded-lg border border-border mb-8">
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
                  <div className="p-6 rounded-lg border border-border">
                    <div className="relative inline-block">
                      <div className="w-48 h-48 bg-background rounded-lg border-2 border-border" />
                      <RecommendedBadge variant={badgeVariant} className="absolute top-3 left-3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Cards Section */}
          <TabsContent value="cards" className="space-y-8">
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
                        <CardTitle>With Actions</CardTitle>
                        <CardDescription>Card with interactive elements</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <BodyText>Cards can include action buttons in the content or footer area.</BodyText>
                        <div className="flex gap-2">
                          <Button size="sm">Primary Action</Button>
                          <Button size="sm" variant="outline">
                            Secondary
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Card with Footer Actions</h3>
                  <div className="max-w-md">
                    <Card>
                      <CardHeader>
                        <CardTitle>Confirmation Required</CardTitle>
                        <CardDescription>Please review the information below</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <BodyText>
                          This pattern is useful for forms, confirmations, or any content that requires user action.
                        </BodyText>
                      </CardContent>
                      <div className="px-6 pb-6 flex gap-2 justify-end">
                        <Button variant="outline">Cancel</Button>
                        <Button>Confirm</Button>
                      </div>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Product Card Pattern</h3>
                  <div className="max-w-xs">
                    <div className="bg-white rounded-[10px] border-2 border-muted overflow-hidden hover:border-primary transition-colors">
                      <div className="relative h-[160px] flex items-center justify-center bg-popover">
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
                  <div className="p-6 rounded-lg border border-border space-y-2 font-mono text-sm bg-card">
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

          {/* Spacing Section */}
          <TabsContent value="spacing" className="space-y-8">
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
                    <div className="p-6 rounded-lg border border-border">
                      <h4 className="font-semibold mb-2">Grid Layouts</h4>
                      <div className="space-y-2 text-sm">
                        <div>2 columns: Product grids, ingredient grids</div>
                        <div>3 columns: Active ingredients, concentrates</div>
                        <div>Gap: 8-10px between items</div>
                      </div>
                    </div>
                    <div className="p-6 rounded-lg border border-border">
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
        </Tabs>
      </div>
    </div>
  )
}

// Helper Components
function ColorSwatch({
  name,
  hex,
  var: cssVar,
  description,
}: { name: string; hex: string; var: string; description: string }) {
  return (
    <div className="bg-background border border-border rounded-lg overflow-hidden">
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
    <div className="p-6 rounded-lg border border-border bg-card">
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
    <div className="p-6 rounded-lg border border-border bg-card">
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="text-xs text-muted-foreground mb-4">{description}</p>
      <div className="flex items-center justify-center p-4 rounded bg-muted">{children}</div>
    </div>
  )
}

function SpacingExample({ size, label, description }: { size: string; label: string; description: string }) {
  return (
    <div className="p-6 rounded-lg border border-border">
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
