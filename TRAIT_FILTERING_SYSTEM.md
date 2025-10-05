# Trait Filtering System

## Overview
URL-based trait filtering system that allows users to filter products by one or multiple skin traits across the entire website. Filters persist in the URL and auto-reload results.

---

## How It Works

### URL Structure
```
/shop?category=creams&traits=wrinkles,radiance,hydration
```

**Parameters**:
- `category`: Product category (creams, simple-solutions, essentials)
- `traits`: Comma-separated list of trait IDs

---

## User Flows

### 1. From Homepage "Shop by Trait"
```tsx
// User clicks a trait card
<Link href="/shop?category=creams&traits=wrinkles">
  Wrinkles
</Link>
```

**Result**: 
- Navigates to shop page
- Shows only products with "Wrinkles" trait
- Trait filter shows "Wrinkles" as selected
- Scan CTA disappears
- Recommended badges appear

---

### 2. From Side Menu
```tsx
// Mobile navigation
<NavLink href="/shop?category=creams&traits=radiance">
  Radiance
</NavLink>
```

**Result**:
- Same as homepage flow
- Works from any page
- Preserves category selection

---

### 3. From Shop Page Trait Filter
```tsx
// User clicks trait chips
<TraitFilter />
```

**Behavior**:
- Click to toggle trait on/off
- Multiple traits can be selected
- URL updates automatically
- Results filter in real-time
- "All" button clears all filters

---

### 4. Multiple Trait Selection
```
Initial: /shop?category=creams
Click "Wrinkles": /shop?category=creams&traits=wrinkles
Click "Radiance": /shop?category=creams&traits=wrinkles,radiance
Click "Wrinkles" again: /shop?category=creams&traits=radiance
Click "All": /shop?category=creams
```

---

## Component Architecture

### TraitFilter Component
**File**: `components/trait-filter.tsx`

**Features**:
- Reads selected traits from URL
- Toggles traits on/off
- Updates URL with router.push
- Auto-reloads filtered results
- Shows active state for selected traits

**Key Functions**:
```tsx
const selectedTraits = searchParams.get("traits")?.split(",").filter(Boolean) || []

const toggleTrait = (traitId: string) => {
  // Add or remove trait from URL
  // Update URL with router.push
}

const clearTraits = () => {
  // Remove all traits from URL
}
```

---

### Shop Page Integration
**File**: `app/shop/page.tsx`

**Filtering Logic**:
```tsx
const selectedTraits = searchParams.get("traits")?.split(",").filter(Boolean) || []

// Filter products by selected traits
if (selectedTraits.length > 0) {
  filtered = filtered.filter((p) => 
    selectedTraits.some(trait => 
      p.traits.some(t => t.toLowerCase() === trait.toLowerCase())
    )
  )
}
```

**Conditional Rendering**:
```tsx
// Show scan CTA only when no traits selected
{selectedTraits.length === 0 && <ScanCTA />}

// Show recommended badges only when traits selected
<ProductCard showRecommended={selectedTraits.length > 0} />
```

---

## Entry Points

### 1. Homepage Trait Cards
**Location**: `app/page.tsx` - "Shop by Trait" section

```tsx
{traits.map((trait) => (
  <Link href={`/shop?category=creams&traits=${trait.id}`}>
    <Card>
      <h3>{trait.name}</h3>
    </Card>
  </Link>
))}
```

**Traits Available**:
- Wrinkles
- Radiance
- Imperfections
- Spots
- Hydration
- Sensitivity
- Shine
- Texture

---

### 2. Mobile Side Menu
**Location**: `components/header.tsx` - MobileNav component

```tsx
<NavLink href="/shop?category=creams&traits=wrinkles">
  Wrinkles
</NavLink>
```

**Expandable Section**:
- "Shop by Trait" dropdown
- All 8 traits listed
- Direct navigation to filtered shop

---

### 3. Shop Page Trait Filter
**Location**: `components/trait-filter.tsx`

**Interactive Chips**:
- "All" - Clears all filters
- Individual trait chips - Toggle on/off
- Multiple selection supported
- Active state styling

---

## Filtering Behavior

### Single Trait
```
URL: /shop?category=creams&traits=wrinkles
Result: Shows products that have "Wrinkles" in their traits array
```

### Multiple Traits (OR Logic)
```
URL: /shop?category=creams&traits=wrinkles,radiance
Result: Shows products that have EITHER "Wrinkles" OR "Radiance"
```

**Note**: Uses OR logic, not AND. Products matching ANY selected trait are shown.

---

## Visual Feedback

### Trait Filter Chips
**Unselected**:
- Background: `#f5f6f5` (Sage)
- Text: `#586158` (Sea Slate)

**Selected**:
- Background: `#586158` (Sea Slate)
- Text: `#f5f6f5` (Sage)

### Scan CTA
- **Visible**: When `selectedTraits.length === 0`
- **Hidden**: When any trait is selected

### Recommended Badges
- **Visible**: When `selectedTraits.length > 0`
- **Hidden**: When no traits selected

---

## Product Filtering Logic

### In Lab Creams
```tsx
if (selectedTraits.length > 0) {
  filtered = filtered.filter((p) => 
    selectedTraits.some(trait => 
      p.traits.some(t => t.toLowerCase() === trait.toLowerCase())
    )
  )
}
```

### Grouping After Filtering
```tsx
groupedCreams: {
  inLab: filtered.filter((p) => p.category === "In-Lab Cream"),
  mixAtHome: filtered.filter((p) => p.category === "Mix at Home Cream"),
  activeConcentrate: filtered.filter((p) => p.category === "Active Concentrate"),
}
```

**Result**: Each section only shows products matching selected traits

---

## URL State Management

### Reading State
```tsx
const searchParams = useSearchParams()
const selectedTraits = searchParams.get("traits")?.split(",").filter(Boolean) || []
```

### Updating State
```tsx
const params = new URLSearchParams(searchParams.toString())

// Add trait
params.set("traits", [...selectedTraits, newTrait].join(","))

// Remove trait
const newTraits = selectedTraits.filter(t => t !== traitId)
params.set("traits", newTraits.join(","))

// Clear all
params.delete("traits")

router.push(`/shop?${params.toString()}`)
```

---

## Performance Optimizations

### Memoized Filtering
```tsx
const { filteredProducts, groupedCreams } = useMemo(() => {
  // Filtering logic
}, [category, selectedTraits])
```

**Benefits**:
- Only re-filters when category or traits change
- Prevents unnecessary computations
- Smooth user experience

### URL-Based State
**Advantages**:
- Shareable links
- Browser back/forward works
- No local state management
- SSR-friendly

---

## User Experience Flow

### Example: User Looking for Wrinkle Solutions

1. **Homepage**: User sees "Shop by Trait" section
2. **Click**: User clicks "Wrinkles" trait card
3. **Navigate**: Browser goes to `/shop?category=creams&traits=wrinkles`
4. **Filter**: Shop page shows only wrinkle-fighting products
5. **Scan CTA**: Disappears (trait selected)
6. **Badges**: "Recommended" badges appear on best products
7. **Add More**: User clicks "Radiance" chip
8. **Update**: URL becomes `/shop?category=creams&traits=wrinkles,radiance`
9. **Results**: Shows products for wrinkles OR radiance
10. **Clear**: User clicks "All" to see everything again

---

## Integration Points

### Skin Analysis Page
**Future Enhancement**:
```tsx
// After AI scan completes
const detectedTraits = ["wrinkles", "spots", "hydration"]
router.push(`/shop?category=creams&traits=${detectedTraits.join(",")}`)
```

### Product Recommendations
**Current**:
```tsx
// Products marked as recommended
{
  id: "inlab-aloe-vera",
  recommended: true,
  traits: ["Hydration", "Sensitivity"]
}
```

**Display Logic**:
```tsx
{showRecommended && product.recommended && (
  <ProductBadge>Recommended</ProductBadge>
)}
```

---

## Testing Scenarios

### Manual Testing
1. ✅ Click trait from homepage → Filters correctly
2. ✅ Click trait from side menu → Filters correctly
3. ✅ Toggle multiple traits → Shows combined results
4. ✅ Click "All" → Clears all filters
5. ✅ Browser back button → Returns to previous filter state
6. ✅ Share URL → Other user sees same filtered results
7. ✅ Switch categories → Filters persist
8. ✅ Scan CTA appears/disappears correctly
9. ✅ Recommended badges show/hide correctly

### Edge Cases
- ✅ No products match selected traits → Empty state
- ✅ All traits selected → Shows all products (OR logic)
- ✅ Invalid trait ID in URL → Ignored gracefully
- ✅ Category + traits combination → Both filters apply

---

## Future Enhancements

### 1. AND Logic Option
```tsx
// Show products matching ALL selected traits
filtered = filtered.filter((p) => 
  selectedTraits.every(trait => 
    p.traits.some(t => t.toLowerCase() === trait.toLowerCase())
  )
)
```

### 2. Trait Count Badges
```tsx
<button>
  Wrinkles
  <span className="badge">12</span> {/* 12 products */}
</button>
```

### 3. Filter Persistence
```tsx
// Save to localStorage
localStorage.setItem("lastTraitFilter", selectedTraits.join(","))
```

### 4. AI-Powered Recommendations
```tsx
// After skin scan
const aiRecommendedTraits = await analyzeSkin(image)
router.push(`/shop?traits=${aiRecommendedTraits.join(",")}`)
```

---

## Developer Guide

### Adding a New Trait
1. Add to `lib/products.ts`:
```tsx
export const traits = [
  // ...existing traits
  { id: "firmness", name: "Firmness" },
]
```

2. Update products with new trait:
```tsx
{
  id: "product-1",
  traits: ["Wrinkles", "Firmness"],
  // ...
}
```

3. Trait automatically appears in:
   - Homepage trait cards
   - Side menu
   - Shop page filter chips

### Customizing Filter Logic
**File**: `app/shop/page.tsx`

```tsx
// Change from OR to AND logic
if (selectedTraits.length > 0) {
  filtered = filtered.filter((p) => 
    selectedTraits.every(trait =>  // Change: some → every
      p.traits.some(t => t.toLowerCase() === trait.toLowerCase())
    )
  )
}
```

---

## Files Modified

1. ✅ `components/trait-filter.tsx` - URL-based filtering
2. ✅ `app/shop/page.tsx` - Multi-trait filtering logic
3. ✅ `app/page.tsx` - Homepage trait links
4. ✅ `components/header.tsx` - Side menu trait links
5. ✅ `components/trait-link.tsx` - NEW - Reusable trait link component

---

*Trait filtering system implemented: 2025-10-04*
*Supports multiple trait selection with URL-based state*
*Auto-reloads results on filter changes*
