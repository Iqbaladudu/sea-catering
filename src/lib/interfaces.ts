export interface NavLink {
  name: string
  href: string
}

export interface MealPlan {
  name: string
  price: string
  description: string
  features: string[]
  popular?: boolean
  mealsPerWeek?: number
  deliveryArea?: string
  support?: string
  isRecommended?: boolean
  detailedDescription?: string
  caloriesPerMeal?: string
  menuSample?: string[]
  deliveryFrequency?: string
  dietaryOptions?: string[]
  faq?: { question: string; answer: string }[]
}
