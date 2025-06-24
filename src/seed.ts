import type { SanitizedConfig } from 'payload'

import payload from 'payload'
import { MEAL_PLANS } from './lib/constants'

export const script = async (config: SanitizedConfig) => {
  await payload.init({ config })

  for (const meal of MEAL_PLANS) {
    await payload.create({
      collection: 'meal-plans',
      data: {
        name: meal.name,
        price: meal.price,
        description: meal.description,
        features: meal.features.map((arr, _key) => ({
          feature: arr,
        })),
        deliveryArea: meal.deliveryArea,
        support: meal.support,
        isRecommended: meal.isRecommended,
        detailedDescription: meal.detailedDescription,
        caloriesPerMeal: meal.caloriesPerMeal,
        menuSample: meal.menuSample!.map((arr, _key) => ({
          item: arr,
        })),
        dietaryOptions: meal.dietaryOptions!.map((arr, _key) => ({
          option: arr,
        })),
        faq: meal.faq?.map((arr, _key) => ({
          question: arr.question,
          answer: arr.answer,
        })),
      },
    })
  }
  payload.logger.info('Meal plans successfully seeded!')
  process.exit(0)
}
