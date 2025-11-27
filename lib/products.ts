import {ProductCategory, ProductRange} from "./constants"

export interface StockProduct {
  pharmaId: number, // galien_user_id
  grp: string, // abbi
  name: string,
  price: number, // * 100
  quantity: number,
  updateDate: string,
  currency: string
}

export interface Product {
  id: string
  _id?: any
  name: string
  brand?: string
  category: ProductCategory
  price: number
  currency?: string
  description: string
  traits: string[]
  image: string
  image2?: string
  inStock: boolean
  recommended: boolean
  subtitle?: string
  stocks?: StockProduct[]
  range?: ProductRange
  thumb?: string
}

export const traits = [
  { id: "wrinkles", name: "Wrinkles" },
  { id: "radiance", name: "Radiance" },
  { id: "imperfections", name: "Imperfections" },
  { id: "spots", name: "Spots" },
  { id: "hydration", name: "Hydration" },
  { id: "sensitivity", name: "Sensitivity" },
  { id: "shine", name: "Shine" },
  { id: "texture", name: "Texture" },
]

export const products: Product[] = [
  // In-Lab Creams
  {
    id: "inlab-aloe-vera",
    name: "Aloe Vera Base",
    category: "In-Lab Cream",
    price: 89.0,
    description:
      "Soothing aloe vera base cream made-to-order in our French lab, personalized for your unique skin needs.",
    traits: ["Hydration", "Sensitivity"],
    image: "/images/products/alya-aloe-vera-base.png",
    inStock: true,
    recommended: true,
  },
  {
    id: "inlab-apple-stem-cells",
    name: "Apple Stem Cells Base",
    category: "In-Lab Cream",
    price: 89.0,
    description: "Advanced apple stem cell formula that promotes skin renewal and fights signs of aging.",
    traits: ["Wrinkles", "Radiance"],
    image: "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
    inStock: true,
    recommended: true,
  },
  {
    id: "inlab-honey-shea",
    name: "Honey & Shea Butter Base",
    category: "In-Lab Cream",
    price: 89.0,
    description: "Rich honey and shea butter blend that deeply nourishes and protects dry, sensitive skin.",
    traits: ["Hydration", "Sensitivity"],
    image: "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
    inStock: true,
    recommended: false,
  },
  {
    id: "inlab-selenium-vitamin-c",
    name: "Selenium & Vitamin C Base",
    category: "In-Lab Cream",
    price: 89.0,
    description: "Brightening formula with selenium and vitamin C to even skin tone and boost radiance.",
    traits: ["Radiance", "Spots"],
    image: "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
    inStock: true,
    recommended: true,
  },
  {
    id: "inlab-peptide-complex",
    name: "Peptide Complex Base",
    category: "In-Lab Cream",
    price: 89.0,
    description: "Advanced peptide formula that firms and smooths skin while reducing fine lines and wrinkles.",
    traits: ["Wrinkles", "Texture"],
    image: "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
    inStock: true,
    recommended: false,
  },

  // Mix at Home Creams
  {
    id: "cream-velvety",
    name: "Velvety Cream",
    category: "Mix at Home Cream",
    price: 24.9,
    description:
      "A luxuriously smooth base cream that provides deep nourishment while creating a soft, velvety texture on your skin.",
    traits: ["Hydration", "Texture"],
    image: "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
    inStock: true,
    recommended: true,
  },
  {
    id: "cream-mattifying",
    name: "Mattifying Velvety Cream",
    category: "Mix at Home Cream",
    price: 24.9,
    description:
      "Controls shine while maintaining hydration, perfect for combination to oily skin types seeking a balanced complexion.",
    traits: ["Shine", "Texture"],
    image: "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
    inStock: true,
    recommended: false,
  },
  {
    id: "cream-smooth",
    name: "Smooth Cream",
    category: "Mix at Home Cream",
    price: 24.9,
    description:
      "Lightweight yet nourishing formula that glides effortlessly onto skin, leaving it silky smooth and perfectly balanced.",
    traits: ["Texture", "Radiance"],
    image: "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
    inStock: true,
    recommended: false,
  },
  {
    id: "cream-creamy",
    name: "Creamy Cream",
    category: "Mix at Home Cream",
    price: 24.9,
    description: "Rich, indulgent texture that deeply moisturizes and comforts dry skin with long-lasting hydration.",
    traits: ["Hydration", "Sensitivity"],
    image: "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
    inStock: true,
    recommended: false,
  },

  // Active Concentrates
  {
    id: "concentrate-01-hydration",
    name: "No. 1 Hydration",
    category: "Active Concentrate",
    price: 22.0,
    description:
      "A potent moisture concentrate that deeply penetrates to hydrate all skin layers and maintain lasting suppleness.",
    traits: ["Hydration"],
    image: "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
    inStock: true,
    recommended: true,
  },
  {
    id: "concentrate-02-wrinkles",
    name: "No. 2 Wrinkles",
    category: "Active Concentrate",
    price: 22.0,
    description: "Advanced anti-aging formula that targets fine lines and wrinkles to restore youthful skin texture.",
    traits: ["Wrinkles"],
    image: "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
    inStock: true,
    recommended: true,
  },
  {
    id: "concentrate-03-radiance",
    name: "No. 3 Radiance",
    category: "Active Concentrate",
    price: 22.0,
    description: "Brightening concentrate that revives dull skin and promotes a luminous, even-toned complexion.",
    traits: ["Radiance", "Spots"],
    image: "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
    inStock: true,
    recommended: false,
  },
  {
    id: "concentrate-04-imperfections",
    name: "No. 4 Imperfections",
    category: "Active Concentrate",
    price: 22.0,
    description: "Clarifying treatment that reduces blemishes and refines pores for clearer, smoother skin.",
    traits: ["Imperfections"],
    image: "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
    inStock: true,
    recommended: false,
  },
  {
    id: "concentrate-05-spots",
    name: "No. 5 Spots",
    category: "Active Concentrate",
    price: 22.0,
    description: "Targeted formula that fades dark spots and hyperpigmentation for a more uniform skin tone.",
    traits: ["Spots", "Radiance"],
    image: "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
    inStock: true,
    recommended: false,
  },
  {
    id: "concentrate-06-sensitivity",
    name: "No. 6 Sensitivity",
    category: "Active Concentrate",
    price: 22.0,
    description: "Soothing concentrate that calms reactive skin and strengthens the skin barrier against irritation.",
    traits: ["Sensitivity"],
    image: "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
    inStock: true,
    recommended: false,
  },
  {
    id: "concentrate-07-shine",
    name: "No. 7 Shine",
    category: "Active Concentrate",
    price: 22.0,
    description: "Oil-control formula that mattifies skin and minimizes the appearance of enlarged pores.",
    traits: ["Shine"],
    image: "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
    inStock: true,
    recommended: false,
  },
  {
    id: "concentrate-08-texture",
    name: "No. 8 Texture",
    category: "Active Concentrate",
    price: 22.0,
    description: "Resurfacing treatment that smooths rough texture and promotes skin renewal for refined results.",
    traits: ["Texture"],
    image: "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
    inStock: true,
    recommended: false,
  },
  {
    id: "concentrate-09-firmness",
    name: "No. 9 Firmness",
    category: "Active Concentrate",
    price: 22.0,
    description: "Lifting concentrate that improves elasticity and contours for visibly firmer, more toned skin.",
    traits: ["Wrinkles", "Texture"],
    image: "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
    inStock: true,
    recommended: false,
  },
  {
    id: "concentrate-10-protection",
    name: "No. 10 Protection",
    category: "Active Concentrate",
    price: 22.0,
    description: "Antioxidant-rich formula that shields skin from environmental stressors and premature aging.",
    traits: ["Radiance", "Wrinkles"],
    image: "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
    inStock: true,
    recommended: false,
  },

  // Essentials
  {
    id: "serum-collagen",
    name: "Collagen Firming Serum",
    category: "Essential",
    price: 32.0,
    description:
      "A concentrated serum that boosts collagen production to restore elasticity and reduce visible signs of aging.",
    traits: ["Wrinkles", "Texture"],
    image: "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
    inStock: true,
    recommended: true,
  },
  {
    id: "serum-hyaluronic",
    name: "Hyaluronic Acid Plumping Serum",
    category: "Essential",
    price: 34.0,
    description: "Intensely hydrating serum that plumps skin and smooths fine lines with multi-weight hyaluronic acid.",
    traits: ["Hydration", "Wrinkles"],
    image: "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
    inStock: true,
    recommended: true,
  },
  {
    id: "cleanser-exfoliating",
    name: "Exfoliating Cleansing Foam",
    category: "Essential",
    price: 17.89,
    description: "Gentle yet effective foam cleanser that removes impurities while refining skin texture.",
    traits: ["Texture", "Imperfections"],
    image: "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
    inStock: true,
    recommended: false,
  },
  {
    id: "oil-soothing",
    name: "Soothing and Revitalizing Oil",
    category: "Essential",
    price: 36.0,
    description: "Nourishing facial oil that calms irritation and restores radiance with botanical extracts.",
    traits: ["Sensitivity", "Radiance"],
    image: "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
    inStock: true,
    recommended: false,
  },
  {
    id: "serum-eye",
    name: "Radiance Eye Contour Serum",
    category: "Essential",
    price: 29.0,
    description: "Targeted eye treatment that brightens dark circles and reduces puffiness for refreshed eyes.",
    traits: ["Radiance", "Wrinkles"],
    image: "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
    inStock: true,
    recommended: false,
  },

  // Simple Solutions
  {
    id: "solution-clear-intentions",
    name: "Clear Intentions",
    category: "Simple Solution",
    price: 59.95,
    description: "A fast-acting formula that purifies pores and reduces breakouts while preventing future blemishes.",
    traits: ["Imperfections"],
    subtitle: "Targeting Blemishes",
    image: "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
    inStock: true,
    recommended: false,
  },
  {
    id: "solution-defy-gravity",
    name: "Defy Gravity",
    category: "Simple Solution",
    price: 89.9,
    description: "Complete anti-aging system that lifts, firms, and restores youthful resilience to mature skin.",
    traits: ["Wrinkles", "Texture"],
    subtitle: "Firmness & Elasticity",
    image: "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
    inStock: true,
    recommended: false,
  },
  {
    id: "solution-peace-out",
    name: "Peace Out, Redness",
    category: "Simple Solution",
    price: 59.95,
    description: "Calming regimen designed to reduce redness and strengthen sensitive skin's natural defenses.",
    traits: ["Sensitivity"],
    subtitle: "Soothing Sensitivity",
    image: "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
    inStock: true,
    recommended: false,
  },
  {
    id: "solution-radiance-ritual",
    name: "Radiance Ritual",
    category: "Simple Solution",
    price: 59.95,
    description: "Brightening routine that revives dull, tired skin and combats signs of aging for a luminous glow.",
    traits: ["Radiance", "Wrinkles"],
    subtitle: "Dullness & Aging",
    image: "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
    inStock: true,
    recommended: false,
  },
  {
    id: "solution-sun-undo",
    name: "Sun Undo",
    category: "Simple Solution",
    price: 59.95,
    description: "Reparative treatment that addresses sun damage, dark spots, and uneven tone from UV exposure.",
    traits: ["Spots", "Radiance"],
    subtitle: "Sun Damage Repair",
    image: "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
    inStock: true,
    recommended: false,
  },
  {
    id: "solution-golden-standard",
    name: "The Golden Standard",
    category: "Simple Solution",
    price: 59.95,
    description: "Gradual tanning system that delivers a natural, sun-kissed glow while nourishing skin.",
    traits: ["Radiance"],
    subtitle: "Natural Tanning",
    image: "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
    inStock: true,
    recommended: false,
  },
  {
    id: "solution-smooth-operator",
    name: "The Smooth Operator",
    category: "Simple Solution",
    price: 69.95,
    description: "Wrinkle-smoothing regimen that targets expression lines and restores skin's youthful appearance.",
    traits: ["Wrinkles"],
    subtitle: "Wrinkle Reduction",
    image: "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
    inStock: true,
    recommended: false,
  },
  {
    id: "solution-thirst-aid",
    name: "Thirst Aid Kit",
    category: "Simple Solution",
    price: 59.95,
    description: "Intensive hydration system that quenches dry skin and restores moisture balance.",
    traits: ["Hydration"],
    subtitle: "Deep Hydration",
    image: "/minimalist-cosmetic-pump-bottle-product-photograph.jpg",
    inStock: true,
    recommended: false,
  },
]

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category)
}

export function getProductsByTrait(traitId: string): Product[] {
  return products.filter((p) => p.traits.some((t) => t.toLowerCase() === traitId.toLowerCase()))
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}
