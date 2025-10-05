export interface ActiveIngredient {
  id: string
  number: number
  name: string
  image: string
  traits: string[]
  description: string
}

export const activeIngredients: ActiveIngredient[] = [
  {
    id: "active-01-soybean",
    number: 1,
    name: "Soybean",
    image: "/placeholder.svg?height=400&width=400",
    traits: ["Wrinkles"],
    description: "Rich in proteins and vitamins that help reduce fine lines and improve skin elasticity.",
  },
  {
    id: "active-02-oat",
    number: 2,
    name: "Oat",
    image: "/placeholder.svg?height=400&width=400",
    traits: ["Radiance"],
    description: "Nourishing grain extract that brightens and soothes while improving skin texture.",
  },
  {
    id: "active-03-yarrow",
    number: 3,
    name: "Yarrow",
    image: "/placeholder.svg?height=400&width=400",
    traits: ["Imperfections"],
    description: "Botanical extract with anti-inflammatory properties that calms and clarifies skin.",
  },
  {
    id: "active-04-chamomile",
    number: 4,
    name: "Chamomile",
    image: "/placeholder.svg?height=400&width=400",
    traits: ["Sensitivity"],
    description: "Gentle flower extract that soothes irritation and reduces redness.",
  },
  {
    id: "active-05-green-tea",
    number: 5,
    name: "Green Tea",
    image: "/placeholder.svg?height=400&width=400",
    traits: ["Radiance", "Spots"],
    description: "Antioxidant-rich extract that protects and brightens skin tone.",
  },
  {
    id: "active-06-rosehip",
    number: 6,
    name: "Rosehip",
    image: "/placeholder.svg?height=400&width=400",
    traits: ["Wrinkles", "Spots"],
    description: "Vitamin-rich oil that regenerates skin and fades dark spots.",
  },
  {
    id: "active-07-licorice",
    number: 7,
    name: "Licorice",
    image: "/placeholder.svg?height=400&width=400",
    traits: ["Spots", "Radiance"],
    description: "Natural brightening agent that evens skin tone and reduces hyperpigmentation.",
  },
  {
    id: "active-08-niacinamide",
    number: 8,
    name: "Niacinamide",
    image: "/placeholder.svg?height=400&width=400",
    traits: ["Imperfections", "Shine"],
    description: "Multi-tasking vitamin that minimizes pores and controls oil production.",
  },
  {
    id: "active-09-peptides",
    number: 9,
    name: "Peptides",
    image: "/placeholder.svg?height=400&width=400",
    traits: ["Wrinkles", "Texture"],
    description: "Amino acid chains that stimulate collagen production and firm skin.",
  },
  {
    id: "active-10-hyaluronic",
    number: 10,
    name: "Hyaluronic Acid",
    image: "/placeholder.svg?height=400&width=400",
    traits: ["Hydration", "Wrinkles"],
    description: "Moisture-binding molecule that plumps and hydrates all skin layers.",
  },
  {
    id: "active-11-retinol",
    number: 11,
    name: "Retinol",
    image: "/placeholder.svg?height=400&width=400",
    traits: ["Wrinkles", "Texture"],
    description: "Vitamin A derivative that accelerates cell turnover and reduces signs of aging.",
  },
  {
    id: "active-12-vitamin-c",
    number: 12,
    name: "Vitamin C",
    image: "/placeholder.svg?height=400&width=400",
    traits: ["Radiance", "Spots"],
    description: "Powerful antioxidant that brightens and protects against environmental damage.",
  },
  {
    id: "active-13-salicylic",
    number: 13,
    name: "Salicylic Acid",
    image: "/placeholder.svg?height=400&width=400",
    traits: ["Imperfections", "Texture"],
    description: "Beta hydroxy acid that exfoliates and unclogs pores for clearer skin.",
  },
  {
    id: "active-14-azelaic",
    number: 14,
    name: "Azelaic Acid",
    image: "/placeholder.svg?height=400&width=400",
    traits: ["Spots", "Imperfections"],
    description: "Multi-functional acid that treats acne and fades post-inflammatory marks.",
  },
  {
    id: "active-15-ceramides",
    number: 15,
    name: "Ceramides",
    image: "/placeholder.svg?height=400&width=400",
    traits: ["Hydration", "Sensitivity"],
    description: "Lipid molecules that restore and strengthen the skin barrier.",
  },
  {
    id: "active-16-centella",
    number: 16,
    name: "Centella Asiatica",
    image: "/placeholder.svg?height=400&width=400",
    traits: ["Sensitivity", "Wrinkles"],
    description: "Healing herb that calms inflammation and promotes collagen synthesis.",
  },
  {
    id: "active-17-bakuchiol",
    number: 17,
    name: "Bakuchiol",
    image: "/placeholder.svg?height=400&width=400",
    traits: ["Wrinkles", "Radiance"],
    description: "Natural retinol alternative that smooths wrinkles without irritation.",
  },
  {
    id: "active-18-zinc",
    number: 18,
    name: "Zinc",
    image: "/placeholder.svg?height=400&width=400",
    traits: ["Imperfections", "Shine"],
    description: "Mineral that regulates oil production and has anti-inflammatory properties.",
  },
  {
    id: "active-19-alpha-arbutin",
    number: 19,
    name: "Alpha Arbutin",
    image: "/placeholder.svg?height=400&width=400",
    traits: ["Spots", "Radiance"],
    description: "Gentle brightening agent that inhibits melanin production for even tone.",
  },
  {
    id: "active-20-coq10",
    number: 20,
    name: "CoQ10",
    image: "/placeholder.svg?height=400&width=400",
    traits: ["Wrinkles", "Radiance"],
    description: "Antioxidant enzyme that energizes cells and reduces oxidative stress.",
  },
  {
    id: "active-21-squalane",
    number: 21,
    name: "Squalane",
    image: "/placeholder.svg?height=400&width=400",
    traits: ["Hydration", "Texture"],
    description: "Lightweight oil that mimics skin's natural sebum for balanced hydration.",
  },
  {
    id: "active-22-tranexamic",
    number: 22,
    name: "Tranexamic Acid",
    image: "/placeholder.svg?height=400&width=400",
    traits: ["Spots", "Radiance"],
    description: "Advanced ingredient that targets stubborn dark spots and melasma.",
  },
  {
    id: "active-23-ferulic",
    number: 23,
    name: "Ferulic Acid",
    image: "/placeholder.svg?height=400&width=400",
    traits: ["Radiance", "Wrinkles"],
    description: "Plant-based antioxidant that enhances vitamin C effectiveness and protects skin.",
  },
  {
    id: "active-24-glycolic",
    number: 24,
    name: "Glycolic Acid",
    image: "/placeholder.svg?height=400&width=400",
    traits: ["Texture", "Radiance"],
    description: "Alpha hydroxy acid that exfoliates surface cells for smoother, brighter skin.",
  },
  {
    id: "active-25-resveratrol",
    number: 25,
    name: "Resveratrol",
    image: "/placeholder.svg?height=400&width=400",
    traits: ["Wrinkles", "Radiance"],
    description: "Powerful antioxidant from grapes that fights aging and environmental damage.",
  },
  {
    id: "active-26-allantoin",
    number: 26,
    name: "Allantoin",
    image: "/placeholder.svg?height=400&width=400",
    traits: ["Sensitivity", "Hydration"],
    description: "Soothing compound that promotes healing and moisturizes irritated skin.",
  },
]

export function getActiveIngredientsByTraits(traits: string[]): ActiveIngredient[] {
  return activeIngredients.filter((ingredient) =>
    traits.some((trait) => ingredient.traits.some((t) => t.toLowerCase() === trait.toLowerCase())),
  )
}

export function getActiveIngredientById(id: string): ActiveIngredient | undefined {
  return activeIngredients.find((ingredient) => ingredient.id === id)
}
