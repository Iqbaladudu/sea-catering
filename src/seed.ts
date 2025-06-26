import type { SanitizedConfig } from 'payload'

import payload from 'payload'
import { MEAL_PLANS, TESTIMONIALS } from './lib/constants'

export const script = async (config: SanitizedConfig) => {
  await payload.init({ config })
  await mealPlansSeed()
  await testimonialsSeed()
  process.exit(0)
}

async function mealPlansSeed() {
  const allTestimonials = await payload.find({
    collection: 'meal-plans',
    limit: 1000,
  })
  for (const testimonial of allTestimonials.docs) {
    await payload.delete({
      collection: 'meal-plans',
      id: testimonial.id,
    })
  }

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
        popular: meal.popular,
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
}

async function testimonialsSeed() {
  const allTestimonials = await payload.find({
    collection: 'testimonials',
    limit: 1000,
  })
  for (const testimonial of allTestimonials.docs) {
    await payload.delete({
      collection: 'testimonials',
      id: testimonial.id,
    })
  }

  for (const testimonial of TESTIMONIALS) {
    await payload.create({
      collection: 'testimonials',
      data: testimonial,
    })
  }

  payload.logger.info('Testimonials successfully seeded!')
}
