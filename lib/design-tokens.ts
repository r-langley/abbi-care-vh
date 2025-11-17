/**
 * ABBI Design System Tokens
 * Centralized design tokens for consistent styling across the application
 */

// Brand Colors
export const COLORS = {
  SEA_SLATE: '#586158',
  SAGE: '#f5f6f5',
  EVERGREEN: '#3e463e',
  WHITE: '#ffffff',
  BLACK: '#000000',
  GRAY: '#e7e7e7',
} as const

// Status Colors
export const STATUS_COLORS = {
  RED: '#ff3b30',
  ORANGE: '#ff9500',
  GREEN: '#8A6EFA',
} as const

// Typography
export const TYPOGRAPHY = {
  SIZES: {
    HEADING: '24px',
    SUBHEADING: '18px',
    BODY: '16px',
    SMALL: '14px',
    TINY: '13px',
    MICRO: '12px',
  },
  TRACKING: {
    HEADING: '-0.48px',
    BODY: '-0.32px',
    SMALL: '-0.28px',
    TINY: '-0.26px',
    MICRO: '-0.24px',
  },
  LINE_HEIGHT: {
    TIGHT: '1.15',
    COMFORTABLE: '1.35',
  },
} as const

// Spacing
export const SPACING = {
  MICRO: '5px',
  SMALL: '10px',
  MEDIUM: '20px',
  LARGE: '23px',
} as const

// Card Design Tokens
export const CARD = {
  BORDER_WIDTH: '2px',
  BORDER_RADIUS: '10px',
  PADDING: '10px',
  PADDING_BOTTOM: '20px',
  GAP: '10px',
  IMAGE_HEIGHT: {
    PRODUCT: '160px',
    INGREDIENT: '100px',
    ACTIVE: '120px',
  },
} as const

// Button Design Tokens
export const BUTTON = {
  RADIUS: '8px',
  ICON_SIZE: {
    DEFAULT: '20px',
    SMALL: '16px',
    LARGE: '24px',
  },
  CIRCLE_SIZE: {
    DEFAULT: '32px',
    SMALL: '24px',
    LARGE: '40px',
  },
} as const

// Badge Design Tokens
export const BADGE = {
  PADDING_X: {
    DEFAULT: '10px',
    COMPACT: '2.5px',
  },
  PADDING_Y: {
    DEFAULT: '5px',
    COMPACT: '1.5px',
  },
  RADIUS: '4px',
} as const

// CSS Variable References (for use in Tailwind classes)
export const CSS_VARS = {
  PRIMARY: 'var(--sea-slate)',
  SECONDARY: 'var(--sage)',
  ACCENT: 'var(--sea-slate)',
  BACKGROUND: 'var(--background)',
  FOREGROUND: 'var(--foreground)',
  MUTED: 'var(--sage)',
  BORDER: 'var(--sage)',
  CARD_BG: 'var(--product-card-bg)',
  CARD_BORDER: 'var(--product-card-border)',
  CARD_BORDER_HOVER: 'var(--product-card-border-hover)',
  CARD_DETAILS_BG: 'var(--product-card-details-bg)',
} as const

// Tailwind Class Utilities
export const TAILWIND_CLASSES = {
  CARD_BASE: 'bg-white rounded-[10px] border-2 border-[var(--product-card-border)] overflow-hidden',
  CARD_HOVER: 'hover:border-[var(--product-card-border-hover)] transition-colors',
  CARD_DETAILS: 'bg-[var(--product-card-details-bg)] p-[10px] pb-[20px]',
  BUTTON_PRIMARY: 'bg-[var(--sea-slate)] text-white hover:opacity-90 transition-opacity',
  BUTTON_CIRCLE: 'rounded-full size-[32px] flex items-center justify-center shrink-0',
  TEXT_PRIMARY: 'text-[var(--sea-slate)]',
  TEXT_MONO: 'font-mono',
} as const

// Helper function to get status color based on score
export function getStatusColor(score: number): string {
  if (score < 40) return STATUS_COLORS.RED
  if (score < 70) return STATUS_COLORS.ORANGE
  return STATUS_COLORS.GREEN
}

// Helper function to get CSS variable reference
export function cssVar(name: keyof typeof CSS_VARS): string {
  return CSS_VARS[name]
}
