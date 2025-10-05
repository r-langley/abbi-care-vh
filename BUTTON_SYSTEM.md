# ABBI Button System

## Overview
Consistent button styling system using monospace typography and harmonized variants across the entire website.

---

## Design Tokens

### Colors
\`\`\`css
--sea-slate: #586158
--sage: #f5f6f5
\`\`\`

### Typography
- **Font**: Geist Mono (monospace)
- **Weight**: Semibold (600) for filled buttons, Medium (500) for text links
- **Sizes**: 14px (sm), 16px (default), 18px (lg)

### Spacing
- **Height**: 32px (sm), 40px (default), 48px (lg)
- **Padding**: 12px/6px (sm), 16px/8px (default), 20px/12px (lg)
- **Border Radius**: 8px

---

## Button Variants

### 1. Default (Filled)
**Primary action button**

\`\`\`tsx
<Button>Click Me</Button>
<Button size="lg" className="font-mono">Analyze My Skin</Button>
\`\`\`

**Styling**:
- Background: `#586158` (Sea Slate)
- Text: `#f5f6f5` (Sage)
- Hover: 90% opacity
- Border radius: 8px
- Font: Semibold

**Use Cases**:
- Primary CTAs
- Form submissions
- Main navigation actions
- "Analyze My Skin" button
- "Create My Formula" button
- Checkout buttons

---

### 2. Text Link
**Inline text link with underline**

\`\`\`tsx
<Button variant="textLink" className="font-mono">
  <Link href="/skin-analysis">Start My Journey</Link>
</Button>
\`\`\`

**Styling**:
- Text: `#586158` (Sea Slate)
- Underline: 2px solid, 40% opacity
- Hover: Full opacity underline
- No background
- Font: Medium
- Padding: 0
- Height: auto

**Use Cases**:
- Inline text links
- "Start My Journey" link
- Secondary navigation
- Learn more links
- Embedded CTAs in paragraphs

---

### 3. Outline
**Secondary action with border**

\`\`\`tsx
<Button variant="outline">Learn More</Button>
\`\`\`

**Styling**:
- Border: 1px solid `#586158`
- Text: `#586158`
- Background: Transparent
- Hover: Fill with `#586158`, text becomes `#f5f6f5`
- Font: Semibold

**Use Cases**:
- Secondary actions
- Cancel buttons
- Alternative options
- Less prominent CTAs

---

### 4. Secondary
**Subtle filled button**

\`\`\`tsx
<Button variant="secondary">View Details</Button>
\`\`\`

**Styling**:
- Background: `#f5f6f5` (Sage)
- Text: `#586158` (Sea Slate)
- Hover: 80% opacity
- Font: Semibold

**Use Cases**:
- Tertiary actions
- Filter buttons
- Tab navigation
- Less prominent actions

---

### 5. Ghost
**Minimal hover-only background**

\`\`\`tsx
<Button variant="ghost">Cancel</Button>
\`\`\`

**Styling**:
- Background: Transparent
- Text: Inherits
- Hover: `#f5f6f5` background
- Font: Medium

**Use Cases**:
- Close buttons
- Dismiss actions
- Minimal UI elements

---

### 6. Link
**Simple underline link**

\`\`\`tsx
<Button variant="link">Read More</Button>
\`\`\`

**Styling**:
- Text: `#586158`
- Underline on hover
- No background
- Font: Medium

**Use Cases**:
- Simple text links
- Footer links
- Navigation links

---

## Size Variants

### Small
\`\`\`tsx
<Button size="sm">Small Button</Button>
\`\`\`
- Height: 32px
- Padding: 12px/6px
- Font size: 14px

### Default
\`\`\`tsx
<Button>Default Button</Button>
\`\`\`
- Height: 40px
- Padding: 16px/8px
- Font size: 16px

### Large
\`\`\`tsx
<Button size="lg">Large Button</Button>
\`\`\`
- Height: 48px
- Padding: 20px/12px
- Font size: 18px

---

## Icon Buttons

### Icon Only
\`\`\`tsx
<Button size="icon">
  <Plus className="h-5 w-5" />
</Button>
\`\`\`

**Sizes**:
- `icon-sm`: 32x32px
- `icon`: 40x40px
- `icon-lg`: 48x48px

---

## Usage Examples

### Homepage Hero
\`\`\`tsx
// Text link variant
<Button asChild variant="textLink" className="font-mono">
  <Link href="/skin-analysis">
    Start My Journey
  </Link>
</Button>
\`\`\`

### AI Skin Analysis CTA
\`\`\`tsx
// Large filled button
<Button asChild size="lg" className="font-mono">
  <Link href="/skin-analysis">Analyze My Skin</Link>
</Button>
\`\`\`

### Scan CTA Component
\`\`\`tsx
<Button asChild size="lg" className="font-mono">
  <Link href="/skin-analysis">
    Create My Formula
  </Link>
</Button>
\`\`\`

### Product Card Add Button
\`\`\`tsx
// Custom circular button (special case)
<button className="bg-[#586158] rounded-full size-[32px]">
  <Plus className="h-5 w-5 text-[#f5f6f5]" />
</button>
\`\`\`

### Cart Footer
\`\`\`tsx
<Button size="lg" className="w-full font-mono">
  CHECKOUT $178
</Button>
\`\`\`

---

## Accessibility

### Focus States
- All buttons have focus-visible ring
- Ring color: `ring-ring/50`
- Ring width: 3px
- Outline: none (using ring instead)

### Disabled States
- Pointer events: none
- Opacity: 50%
- Cursor: not-allowed (automatic)

### ARIA Support
- Invalid state: `aria-invalid` adds destructive ring
- Proper semantic HTML (`<button>` or `<a>`)
- Screen reader friendly

---

## Best Practices

### Do's ✅
- Always use `font-mono` class for consistency
- Use `asChild` prop when wrapping Link components
- Choose variant based on action hierarchy
- Use size variants for visual hierarchy
- Apply consistent spacing around buttons

### Don'ts ❌
- Don't mix font families on buttons
- Don't create custom button styles outside the system
- Don't use multiple primary buttons in the same section
- Don't override core button styles without reason
- Don't forget hover/focus states

---

## Component Props

\`\`\`tsx
interface ButtonProps {
  variant?: 
    | "default"      // Filled primary button
    | "textLink"     // Inline text link
    | "outline"      // Border button
    | "secondary"    // Subtle filled
    | "ghost"        // Minimal
    | "link"         // Simple link
    | "destructive"  // Danger actions
  
  size?: 
    | "default"      // 40px height
    | "sm"           // 32px height
    | "lg"           // 48px height
    | "icon"         // 40x40px
    | "icon-sm"      // 32x32px
    | "icon-lg"      // 48x48px
  
  asChild?: boolean  // Render as child component (for Link)
  disabled?: boolean
  className?: string
}
\`\`\`

---

## Migration Guide

### Before (Old Styles)
\`\`\`tsx
// Inconsistent custom styling
<Link className="font-mono text-sm text-foreground underline...">
  Start My Journey
</Link>

<Button className="font-mono rounded-lg">
  Analyze My Skin
</Button>
\`\`\`

### After (New System)
\`\`\`tsx
// Consistent button variants
<Button asChild variant="textLink" className="font-mono">
  <Link href="/skin-analysis">Start My Journey</Link>
</Button>

<Button asChild size="lg" className="font-mono">
  <Link href="/skin-analysis">Analyze My Skin</Link>
</Button>
\`\`\`

---

## Design System Consistency

### Typography
- All buttons use **Geist Mono** (monospace)
- Consistent with price displays and technical elements
- Creates cohesive brand identity

### Colors
- Primary: Sea Slate (#586158)
- Background: Sage (#f5f6f5)
- Matches overall brand palette

### Spacing
- 8px base unit
- Consistent padding ratios
- Harmonized with grid system

### Interactions
- Opacity-based hovers (90% for filled)
- Color transitions for outlines
- Smooth 200ms transitions

---

## Testing Checklist

- [ ] Buttons render correctly in all variants
- [ ] Hover states work as expected
- [ ] Focus states are visible for keyboard navigation
- [ ] Disabled states prevent interaction
- [ ] Links work with asChild prop
- [ ] Font-mono applies correctly
- [ ] Sizes are consistent across pages
- [ ] Mobile touch targets are adequate (min 44px)
- [ ] Color contrast meets WCAG AA standards

---

*Button system implemented: 2025-10-04*
*Consistent across all pages and components*
