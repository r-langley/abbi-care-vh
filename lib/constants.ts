// Product Categories
export const PRODUCT_CATEGORIES = {
  IN_LAB_CREAM: "In-Lab Cream",
  MIX_AT_HOME_CREAM: "Mix at Home Cream",
  ACTIVE_CONCENTRATE: "Active Concentrate",
  SIMPLE_SOLUTION: "Simple Solution",
  ESSENTIAL: "Essential",
} as const

export const PRODUCT_RANGES = {
  SUR_MESURE: "SUR_MESURE",
  BASE: "BASE",
  BOOSTER: "BOOSTER",
  PRODUIT_OFFERT: "PRODUIT_OFFERT",
  MOUSSE: "MOUSSE",
  PRET_VENTE: "PRET_VENTE",
  coffrets: "coffrets"
} as const

export type ProductRange = (typeof PRODUCT_RANGES)[keyof typeof PRODUCT_RANGES]

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[keyof typeof PRODUCT_CATEGORIES]

// Skin Traits
export const SKIN_TRAITS = {
  WRINKLES: "wrinkles",
  RADIANCE: "radiance",
  IMPERFECTIONS: "imperfections",
  SPOTS: "spots",
  HYDRATION: "hydration",
  SENSITIVITY: "sensitivity",
  SHINE: "shine",
  TEXTURE: "texture",
} as const

export type SkinTrait = (typeof SKIN_TRAITS)[keyof typeof SKIN_TRAITS]

// Storage Keys
export const STORAGE_KEYS = {
  CART: "abbi-cart",
  AMBASSADOR_CODE: "abbi-ambassador-code",
  USER_PREFERENCES: "abbi-preferences",
  SKIN_ANALYSIS: "abbi-skin-analysis",
} as const

// Shop Categories for URL params
export const SHOP_CATEGORIES = {
  CREAMS: "creams",
  SIMPLE_SOLUTIONS: "simple-solutions",
  ESSENTIALS: "essentials",
} as const

export type ShopCategory = (typeof SHOP_CATEGORIES)[keyof typeof SHOP_CATEGORIES]

// Route paths
export const ROUTES = {
  HOME: "/",
  SHOP: "/shop",
  CART: "/cart",
  SKIN_ANALYSIS: "/skin-analysis",
  PERSONALIZED_CREAMS: "/personalized-creams",
  SIMPLE_SOLUTIONS: "/simple-solutions",
  ESSENTIALS: "/essentials",
  ABOUT: "/about",
  JOIN: "/join",
  PRODUCT: (id: string) => `/product/${id}`,
} as const
