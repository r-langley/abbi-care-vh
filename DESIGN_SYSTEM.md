# ABBI Design System

## Color Palette

### Primary Colors
- **Sea Slate**: `#586158` - Primary brand color, buttons, active states
- **Sage**: `#f5f6f5` - Background, card details sections
- **Evergreen**: `#3e463e` - Darker accent

### Status Colors
- **Red**: `#ff3b30` - Low scores, needs attention
- **Orange**: `#ff9500` - Moderate scores
- **Green**: `#34c759` - Good scores

### Neutral Colors
- **Black**: `#000000` - Primary text
- **White**: `#ffffff` - Backgrounds, cards
- **Gray**: `#e7e7e7` - Borders, dividers

## Typography

### Font Families
- **Figtree**: Primary sans-serif (body text, headings)
- **Instrument Serif**: Italic accents ("Skin", "Creams", "Actives")
- **Geist Mono**: Numbers, prices, technical data

### Text Sizes
- **Headings**: 24px (semibold, tracking -0.48px)
- **Subheadings**: 18px (semibold, tracking normal)
- **Body**: 16px (medium, tracking -0.32px)
- **Small**: 14px (medium, tracking -0.28px)
- **Tiny**: 13px (medium, tracking -0.26px)
- **Micro**: 12px (semibold/medium, tracking -0.24px)

### Line Heights
- Standard: `1.15` (tight, for headings)
- Body: `1.35` (comfortable reading)

## Spacing System

### Gaps
- **Micro**: 5px - Between related items
- **Small**: 10px - Standard gap
- **Medium**: 20px - Section spacing
- **Large**: 23px - Major sections

### Padding
- **Card Details**: 10px (20px bottom)
- **Sections**: 20px (px-5 py-5)
- **Buttons**: 10px horizontal, 5px vertical

## Components

### Cards

#### Product Card
- Border: 2px `#f5f6f5`
- Hover: Border `#586158`
- Image: 160px height
- Details: `#f5f6f5` background
- Padding: 10px (20px bottom)
- Gap: 10px

#### Ingredient Card
- Same as Product Card
- Image: 100px height
- Optional description hiding
- Number display: Geist Mono

#### Active Ingredient Card
- For Active Concentrates (products)
- Image: 120px height
- Number + Name display

### Badges

#### Recommended Badge
- Background: `#586158`
- Text: White, 12px semibold
- Padding: 10px x 5px (default) or 2.5px x 1.5px (compact)
- Border radius: 4px

### Buttons
- Primary: `#586158` background, white text
- Size: 32px circle for add buttons
- Icon size: 20px
- Hover: opacity-90

#### Button Variants
- **default**: Standard button with background and padding
- **outline**: Border button with hover fill
- **secondary**: Light background button
- **ghost**: Transparent with hover background
- **link**: Simple underlined link with padding removed
- **textLink**: Truly inline text link with no padding, flows with text content

### Carousels
- Horizontal scroll
- Gap: 5px between items
- Smooth scrolling
- No scroll bars (overflow-x-auto)

## Layout Patterns

### Grid Layouts
- **2 columns**: Product grids, ingredient grids
- **3 columns**: Active ingredients, concentrates
- **4 columns**: Trait carousel (when not scrolling)
- Gap: 8-10px

### Sections
- Background alternation: White / Sage
- Padding: 20px
- Max width: 800px (centered for sheets)

### Navigation
- Header: Sticky, backdrop blur
- Side menu: 50% viewport width
- Footer: Standard

## Interactive States

### Hover
- Border color change: `#f5f6f5` → `#586158`
- Opacity: 90% for buttons
- Transition: colors, opacity

### Active
- Bold text for selected items
- Border highlight
- Full opacity

## Accessibility

### Screen Readers
- All dialogs have titles (sr-only when hidden)
- Alt text for all images
- Semantic HTML structure

### Focus States
- Visible focus indicators
- Keyboard navigation support

## Component Hierarchy

### Atomic Components (ui/)
- Badge
- Button
- Card
- Dialog/Sheet
- Typography
- Nav Link

### Feature Components
- ProductCard
- IngredientCard
- ActiveIngredientCard
- RecommendedBadge
- CategoryCarousel
- SpiderChart

### Page Components
- Header
- Footer
- MySkinResults
- SkinResultsSheet
- TraitFilter

## Design Tokens

### CSS Variables (Preferred)
Always use CSS variables for colors instead of hardcoded hex values:

```tsx
// ✅ CORRECT - Use semantic tokens
className="bg-primary text-primary-foreground"
className="border-muted hover:border-primary"
className="bg-muted text-primary"

// ❌ WRONG - Don't hardcode colors
className="bg-[#586158] text-white"
className="border-[#f5f6f5] hover:border-[#586158]"
```

### Available Semantic Tokens
- `--primary`: Sea Slate (#586158)
- `--primary-foreground`: White
- `--secondary` / `--muted`: Sage (#f5f6f5)
- `--accent`: Sea Slate
- `--background`: White
- `--foreground`: Black
- `--border`: Sage
- `--destructive`: Status Red

### TypeScript Constants
Import from `@/lib/design-tokens` for programmatic use:

```tsx
import { COLORS, SPACING, CARD, CSS_VARS } from '@/lib/design-tokens'
```

## Best Practices

1. **Consistency**: Use existing components, don't create duplicates
2. **Spacing**: Follow the spacing system (5px, 10px, 20px, 23px)
3. **Colors**: ALWAYS use CSS variables/Tailwind classes, NEVER hardcode hex values
4. **Typography**: Match font sizes and tracking exactly
5. **Borders**: 2px for cards, 1px for dividers
6. **Hover**: Always include hover states with `transition-colors` or `transition-opacity`
7. **Accessibility**: Include sr-only titles, alt text
8. **Responsive**: Mobile-first, use max-width constraints
9. **Font Mono**: Use `font-mono` class instead of inline `fontFamily` styles
10. **Card Components**: Use shared card patterns from `ui/base-card.tsx` when possible
