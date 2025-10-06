import type * as React from "react"
import { cn } from "@/lib/utils"

// Page Title (H1)
interface PageTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant?: "default" | "hero"
}

export function PageTitle({ className, variant = "default", ...props }: PageTitleProps) {
  return (
    <h1
      className={cn(
        "text-balance text-foreground font-medium tracking-tight",
        variant === "default" && "text-3xl md:text-4xl leading-7 mb-4",
        variant === "hero" && "text-3xl md:text-6xl lg:text-7xl leading-none mb-2 md:mb-4",
        className,
      )}
      {...props}
    />
  )
}

// Section Heading (H2)
interface SectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  align?: "left" | "center"
  spacing?: "default" | "tight"
}

export function SectionHeading({ className, align = "center", spacing = "default", ...props }: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        "text-2xl md:text-3xl leading-7 font-semibold text-foreground",
        align === "center" && "text-center md:text-left",
        align === "left" && "text-left",
        spacing === "default" && "mb-12 md:mb-16",
        spacing === "tight" && "mb-4 md:mb-6",
        className,
      )}
      {...props}
    />
  )
}

// Section Overline
export function SectionOverline({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs font-mono tracking-widest mb-4 text-primary font-semibold", className)} {...props} />
}

// Card Title (H3)
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant?: "default" | "small"
}

export function CardTitle({ className, variant = "default", ...props }: CardTitleProps) {
  return (
    <h3
      className={cn(
        "font-medium text-xl",
        variant === "default" && "text-xl mb-2",
        variant === "small" && "text-base mb-1",
        className,
      )}
      {...props}
    />
  )
}

// Body Text Variants
export function BodyText({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-base text-foreground leading-relaxed", className)} {...props} />
}

export function SmallText({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return null
}

export function ExtraSmallText({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs text-muted-foreground", className)} {...props} />
}

// Price Display
interface PriceDisplayProps extends React.HTMLAttributes<HTMLSpanElement> {
  amount: number
  size?: "default" | "large" | "small"
}

export function PriceDisplay({ amount, size = "default", className, ...props }: PriceDisplayProps) {
  return (
    <span
      className={cn(
        "font-mono text-sm font-medium",
        size === "large" && "text-3xl",
        size === "default" && "text-lg",
        size === "small" && "text-base",
        className,
      )}
      {...props}
    >
      ${amount}
    </span>
  )
}

interface SectionProps {
  heading: React.ReactNode
  body?: React.ReactNode
  align?: "left" | "center"
  spacing?: "default" | "tight"
  className?: string
}

export function Section({ heading, body, align = "center", spacing = "default", className }: SectionProps) {
  return (
    <div className={cn(align === "center" && "text-center", align === "left" && "text-left", className)}>
      <SectionHeading align={align} spacing={spacing}>
        {heading}
      </SectionHeading>
      {body && <BodyText>{body}</BodyText>}
    </div>
  )
}
