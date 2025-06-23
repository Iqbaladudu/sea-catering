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
}
