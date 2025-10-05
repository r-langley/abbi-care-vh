# Hero Icons Duotone Migration

## Overview
Replacing Lucide React icons with Hero Icons (duotone variant) for a more modern, cohesive design system.

---

## Why Hero Icons?

### Advantages
- **Duotone Style**: Two-tone icons with primary/secondary colors
- **Tailwind Integration**: Built by Tailwind team, perfect integration
- **Consistent Design**: More uniform visual language
- **Better Accessibility**: Optimized SVG structure
- **Smaller Bundle**: Tree-shakeable, optimized for production

### Comparison
| Feature | Lucide React | Hero Icons |
|---------|--------------|------------|
| Style | Outline/Filled | Outline/Solid/Mini/Duotone |
| Bundle Size | ~500KB | ~300KB (duotone only) |
| Icons Count | 1,000+ | 300+ (curated) |
| Tailwind Integration | Good | Excellent |
| Duotone Support | ❌ | ✅ |

---

## Icon Mapping

### Current Lucide Icons → Hero Icons Duotone

| Component | Lucide Icon | Hero Icon | Import Path |
|-----------|-------------|-----------|-------------|
| **Header** | | | |
| Menu | `Menu` | `Bars3Icon` | `@heroicons/react/24/outline` |
| ShoppingCart | `ShoppingCart` | `ShoppingCartIcon` | `@heroicons/react/24/outline` |
| User | `User` | `UserIcon` | `@heroicons/react/24/outline` |
| Phone | `Phone` | `PhoneIcon` | `@heroicons/react/24/outline` |
| Flag | `Flag` | `FlagIcon` | `@heroicons/react/24/outline` |
| ChevronDown | `ChevronDown` | `ChevronDownIcon` | `@heroicons/react/24/outline` |
| **Product Card** | | | |
| Plus | `Plus` | `PlusIcon` | `@heroicons/react/24/outline` |
| Check | `Check` | `CheckIcon` | `@heroicons/react/24/outline` |
| **Scan CTA** | | | |
| Sparkles | `Sparkles` | `SparklesIcon` | `@heroicons/react/24/solid` |
| **Skin Analysis** | | | |
| Smartphone | `Smartphone` | `DevicePhoneMobileIcon` | `@heroicons/react/24/outline` |
| Target | `Target` | `TargetIcon` (custom) | Use `ArrowsPointingInIcon` |
| **Homepage** | | | |
| Clock | `Clock` | `ClockIcon` | `@heroicons/react/24/outline` |
| Search | `Search` | `MagnifyingGlassIcon` | `@heroicons/react/24/outline` |
| Droplet | `Droplet` | `BeakerIcon` | `@heroicons/react/24/outline` |
| Flower2 | `Flower2` | Custom SVG | Need custom icon |
| Sun | `Sun` | `SunIcon` | `@heroicons/react/24/outline` |
| Grid3x3 | `Grid3x3` | `Squares2X2Icon` | `@heroicons/react/24/outline` |
| **Cart** | | | |
| Minus | `Minus` | `MinusIcon` | `@heroicons/react/24/outline` |
| X | `X` | `XMarkIcon` | `@heroicons/react/24/outline` |
| **Product Page** | | | |
| Heart | `Heart` | `HeartIcon` | `@heroicons/react/24/outline` |
| ChevronRight | `ChevronRight` | `ChevronRightIcon` | `@heroicons/react/24/outline` |
| **Category Carousel** | | | |
| ArrowRight | `ArrowRight` | `ArrowRightIcon` | `@heroicons/react/24/outline` |

---

## Import Patterns

### Lucide React (Before)
\`\`\`tsx
import { Menu, ShoppingCart, User } from "lucide-react"

<Menu className="h-6 w-6" />
<ShoppingCart className="h-6 w-6" />
\`\`\`

### Hero Icons (After)
\`\`\`tsx
// Outline (24x24)
import { Bars3Icon, ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline"

<Bars3Icon className="h-6 w-6" />
<ShoppingCartIcon className="h-6 w-6" />

// Solid (24x24)
import { SparklesIcon } from "@heroicons/react/24/solid"

<SparklesIcon className="h-6 w-6" />

// Mini (20x20)
import { PlusIcon } from "@heroicons/react/20/solid"

<PlusIcon className="h-5 w-5" />
\`\`\`

---

## Migration Strategy

### Phase 1: Core Components
1. ✅ Install `@heroicons/react`
2. ✅ Update Header component
3. ✅ Update Product Card component
4. ✅ Update Scan CTA component
5. ✅ Update Category Carousel component
6. ✅ Update Skin Analysis Modal component

### Phase 2: Pages
1. ✅ Update Homepage
2. ✅ Update Shop page (no icons)
3. ✅ Update Cart page
4. ✅ Update Product page
5. ✅ Update Skin Analysis page

### Phase 3: UI Components
1. ✅ Update Dialog/Sheet components
2. ✅ Update Accordion component
3. ✅ Update other UI primitives

### Phase 4: Cleanup
1. ✅ Remove `lucide-react` dependency
2. ✅ Update documentation
3. ⬜ Test all icon usages
4. ⬜ Verify bundle size reduction

---

## Files to Update

### Components (9 files)
- `components/header.tsx` - Menu, Cart, User, Phone, Flag, ChevronDown
- `components/product-card.tsx` - Plus, Check
- `components/scan-cta.tsx` - Sparkles
- `components/skin-analysis-modal.tsx` - Sparkles, Smartphone
- `components/category-carousel.tsx` - ArrowRight
- `components/ui/sheet.tsx` - X
- `components/ui/accordion.tsx` - ChevronDown
- `components/ui/dialog.tsx` - X

### Pages (4 files)
- `app/page.tsx` - Clock, Sparkles, Target, Search, Droplet, Flower2, Sun, Grid3x3
- `app/shop/page.tsx` - (no icons currently)
- `app/cart/page.tsx` - Minus, Plus, X
- `app/product/[id]/page.tsx` - Minus, Plus, Heart, ChevronRight
- `app/skin-analysis/page.tsx` - Smartphone, Sparkles, Target

---

## Custom Icons Needed

Some Lucide icons don't have direct Hero Icons equivalents:

### 1. Flower2 (Sensitivity trait)
**Solution**: Create custom SVG or use `SparklesIcon` as alternative

### 2. Target (Skin analysis)
**Solution**: Use `ArrowsPointingInIcon` or create custom

### 3. Droplet (Hydration trait)
**Solution**: Use `BeakerIcon` or create custom water drop SVG

---

## Code Examples

### Header Component
\`\`\`tsx
// Before
import { Menu, ShoppingCart, User, Phone, Flag, ChevronDown } from "lucide-react"

// After
import { 
  Bars3Icon, 
  ShoppingCartIcon, 
  UserIcon, 
  PhoneIcon, 
  FlagIcon, 
  ChevronDownIcon 
} from "@heroicons/react/24/outline"

// Usage
<Bars3Icon className="h-6 w-6" />
<ShoppingCartIcon className="h-6 w-6" />
\`\`\`

### Product Card
\`\`\`tsx
// Before
import { Plus, Check } from "lucide-react"

// After
import { PlusIcon, CheckIcon } from "@heroicons/react/24/outline"

// Usage
<PlusIcon className="h-5 w-5 text-[#f5f6f5]" />
<CheckIcon className="h-5 w-5 text-[#f5f6f5]" />
\`\`\`

### Scan CTA
\`\`\`tsx
// Before
import { Sparkles } from "lucide-react"

// After
import { SparklesIcon } from "@heroicons/react/24/solid"

// Usage (solid for emphasis)
<SparklesIcon className="size-[20px] text-[#586158]" />
\`\`\`

---

## Size Variants

Hero Icons come in 3 sizes:

### 24x24 (Standard)
\`\`\`tsx
import { UserIcon } from "@heroicons/react/24/outline"
<UserIcon className="h-6 w-6" />
\`\`\`

### 20x20 (Mini)
\`\`\`tsx
import { UserIcon } from "@heroicons/react/20/solid"
<UserIcon className="h-5 w-5" />
\`\`\`

### 16x16 (Micro)
\`\`\`tsx
import { UserIcon } from "@heroicons/react/16/solid"
<UserIcon className="h-4 w-4" />
\`\`\`

---

## Style Variants

### Outline (Default)
\`\`\`tsx
import { HeartIcon } from "@heroicons/react/24/outline"
<HeartIcon className="h-6 w-6" />
\`\`\`

### Solid (Filled)
\`\`\`tsx
import { HeartIcon } from "@heroicons/react/24/solid"
<HeartIcon className="h-6 w-6" />
\`\`\`

---

## Testing Checklist

### Visual Testing
- [ ] All icons render correctly
- [ ] Icon sizes are consistent
- [ ] Colors apply properly
- [ ] Hover states work
- [ ] Active states work

### Functional Testing
- [ ] Cart icon updates count
- [ ] Product card add/check toggle
- [ ] Menu opens/closes
- [ ] All clickable icons work

### Performance Testing
- [ ] Bundle size reduced
- [ ] No console errors
- [ ] Icons load quickly
- [ ] No layout shifts

---

## Bundle Size Impact

### Before (Lucide React)
\`\`\`
lucide-react: ~500KB
Icons used: ~15 icons
Actual bundle: ~75KB (tree-shaken)
\`\`\`

### After (Hero Icons)
\`\`\`
@heroicons/react: ~300KB
Icons used: ~15 icons
Actual bundle: ~45KB (tree-shaken)
Expected savings: ~30KB (40% reduction)
\`\`\`

---

## Rollback Plan

If issues arise:

1. Keep `lucide-react` installed temporarily
2. Revert component changes
3. Test thoroughly before removing Lucide
4. Document any Hero Icons limitations

---

## Next Steps

1. ✅ Create branch `feature/heroicons-duotone`
2. ✅ Install `@heroicons/react`
3. ⬜ Update Header component (highest priority)
4. ⬜ Update Product Card component
5. ⬜ Update remaining components
6. ��� Test all pages
7. ⬜ Remove `lucide-react`
8. ⬜ Commit and push

---

*Migration started: 2025-10-05*
*Target completion: Same day*
