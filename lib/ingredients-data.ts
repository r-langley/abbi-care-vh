export interface Ingredient {
  id: string
  number: number
  name: string
  description: string
  traits: string[]
}

export const ingredients: Ingredient[] = [
  {
    id: "1",
    number: 1,
    name: "Soybean Collagen Booster",
    description: "Reduces wrinkles, strengthens and smooths skin's dermal layer.",
    traits: ["Wrinkles"],
  },
  {
    id: "2",
    number: 2,
    name: "Organic Oat Lifting Complex",
    description: "Instantly firms and lifts skin with natural sugar network.",
    traits: ["Firmness"],
  },
  {
    id: "3",
    number: 3,
    name: "Yarrow Epidermal Regenerator",
    description: "Smooths wrinkles, restores surface lipids, and protects skin barrier.",
    traits: ["Wrinkles"],
  },
  {
    id: "4",
    number: 4,
    name: "Grape Juice Polyphenol Protector",
    description: "Prevents aging, protects DNA, and strengthens cell barrier.",
    traits: ["Wrinkles"],
  },
  {
    id: "5",
    number: 5,
    name: "Brèdes Mafane Wrinkle Reducer",
    description: "Instantly smooths skin and reduces wrinkles without invasive procedures.",
    traits: ["Wrinkles"],
  },
  {
    id: "6",
    number: 6,
    name: "Nasturtium Oxygen Booster",
    description: "Contains digital oxygen to enhance oxygen skin barrier.",
    traits: ["Radiance"],
  },
  {
    id: "7",
    number: 7,
    name: "Berry Complexion Illuminator",
    description: "Reduces dark spots, age spots, and reduces skin blemishes.",
    traits: ["Spots", "Radiance"],
  },
  {
    id: "8",
    number: 8,
    name: "Berry Pigmentation Balancer",
    description: "Evens tone and reduces spots and pigmentation with antioxidants.",
    traits: ["Spots"],
  },
  {
    id: "9",
    number: 9,
    name: "Green Chemistry Anti-Glycation Salt",
    description: "Unifies complexion, firms skin, and reduces age-related discoloration.",
    traits: ["Firmness", "Spots"],
  },
  {
    id: "10",
    number: 10,
    name: "Meadowsweet Sebum-Regulation Salt",
    description: "Targets inflammation and alleviates skin texture.",
    traits: ["Texture", "Shine"],
  },
  {
    id: "11",
    number: 11,
    name: "Iris Zinc Skin Purifier",
    description: "Purifies skin, reduces pores, and banishes imperfections.",
    traits: ["Imperfections"],
  },
  {
    id: "12",
    number: 12,
    name: "Wild Acanthus Dermal Protector",
    description: "Shields skin, repairs skin, and supports skin's barrier function.",
    traits: ["Sensitivity"],
  },
  {
    id: "13",
    number: 13,
    name: "Pre-Probiotic Microbiota Balancer",
    description: "Balances microbiome, enhances radiance, and improves skin comfort.",
    traits: ["Radiance", "Sensitivity"],
  },
  {
    id: "14",
    number: 14,
    name: "Organic Brown Flax Seed Soother",
    description: "Prevents irritation, soothes inflammation, and calms sensitive skin.",
    traits: ["Sensitivity"],
  },
  {
    id: "15",
    number: 15,
    name: "Red Sage Sensitive Skin Protector",
    description: "Calms sensitive skin, reduces redness, and protects barrier.",
    traits: ["Sensitivity"],
  },
  {
    id: "16",
    number: 16,
    name: "Marine Brown Algae Soothing Shield",
    description: "Prevents redness, soothes inflamed skin, and reduces irritation.",
    traits: ["Sensitivity"],
  },
  {
    id: "17",
    number: 17,
    name: "Chinese Plant Pore Refiner",
    description: "Minimizes pores, controls bacteria, and purifies skin complexion.",
    traits: ["Imperfections"],
  },
  {
    id: "18",
    number: 18,
    name: "Biotechnology Skin Detoxifier",
    description: "Stimulates natural waste elimination and prevents oxidation.",
    traits: ["Radiance"],
  },
  {
    id: "19",
    number: 19,
    name: "Soybean and Enoki Pigmentation Corrector",
    description: "Corrects pigmentation and brightens overall skin tones.",
    traits: ["Spots", "Radiance"],
  },
  {
    id: "20",
    number: 20,
    name: "Wild Rose Sebum Normalizer",
    description: "Regulates sebum production, prevents shine, and controls shine.",
    traits: ["Shine"],
  },
  {
    id: "21",
    number: 21,
    name: "Japanese Cedar Hydration Enhancer",
    description: "Renews epidermal layers, prevents dehydration, and improves suppleness.",
    traits: ["Hydration"],
  },
  {
    id: "22",
    number: 22,
    name: "Lentil Pore-Refining Minimizer",
    description: "Reduces pore size, controls oil, and mattifies skin surface.",
    traits: ["Imperfections", "Shine"],
  },
  {
    id: "23",
    number: 23,
    name: "Chestnut Epidermal Moisture Promoter",
    description: "Promotes skin barrier, restores moisture balance, and enhances suppleness.",
    traits: ["Hydration"],
  },
  {
    id: "24",
    number: 24,
    name: "Brazilian Bark Cell-Renewal Energizer",
    description: "Energizes cells, boosts cell renewal, and boosts cell lifespan.",
    traits: ["Radiance"],
  },
  {
    id: "25",
    number: 25,
    name: "Corn Glucose Hydration Biopolymer",
    description: "Deeply hydrates, soothes skin, and provides lightweight softness.",
    traits: ["Hydration"],
  },
  {
    id: "26",
    number: 26,
    name: "Pearl Chemistry Moisture Lock",
    description: "Locks in moisture and strengthens barrier protection.",
    traits: ["Hydration"],
  },
]

export function getIngredientsByTraits(traits: string[]): Ingredient[] {
  return ingredients.filter((ingredient) =>
    traits.some((trait) => ingredient.traits.some((t) => t.toLowerCase() === trait.toLowerCase())),
  )
}

export function getIngredientById(id: string): Ingredient | undefined {
  return ingredients.find((ingredient) => ingredient.id === id)
}
