import * as React from 'react'
import { cn } from '@/lib/utils'

interface BaseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageHeight?: string
  imageUrl: string
  imageAlt: string
  detailsContent: React.ReactNode
  badge?: React.ReactNode
  asLink?: boolean
  href?: string
}

/**
 * BaseCard - Reusable card component following ABBI design system
 * Consolidates common card patterns (product, ingredient, active ingredient)
 */
export function BaseCard({
  imageHeight = '160px',
  imageUrl,
  imageAlt,
  detailsContent,
  badge,
  className,
  ...props
}: BaseCardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-[10px] border-2 border-[var(--product-card-border)] overflow-hidden',
        'hover:border-[var(--product-card-border-hover)] transition-colors',
        'flex flex-col h-full',
        className
      )}
      {...props}
    >
      <div className="relative overflow-hidden" style={{ height: imageHeight }}>
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {badge && <div className="absolute top-3 left-3">{badge}</div>}
      </div>
      <div className="bg-[var(--product-card-details-bg)] p-[10px] pb-[20px] flex flex-col gap-[10px] flex-1">
        {detailsContent}
      </div>
    </div>
  )
}

interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  height?: string
}

export function CardImage({ height = '160px', className, ...props }: CardImageProps) {
  return (
    <div className="relative overflow-hidden" style={{ height }}>
      <img
        className={cn('w-full h-full object-cover', className)}
        loading="lazy"
        {...props}
      />
    </div>
  )
}

export function CardDetails({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'bg-[var(--product-card-details-bg)] p-[10px] pb-[20px] flex flex-col gap-[10px] flex-1',
        className
      )}
      {...props}
    />
  )
}

export function CardWrapper({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'bg-white rounded-[10px] border-2 border-[var(--product-card-border)] overflow-hidden',
        'hover:border-[var(--product-card-border-hover)] transition-colors',
        'flex flex-col h-full',
        className
      )}
      {...props}
    />
  )
}
