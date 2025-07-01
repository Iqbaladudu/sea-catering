'use client'

import { CalendarCheck, Info, Truck, Utensils, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { motion } from 'framer-motion'
interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  benefits: string[]
}

export const features: Feature[] = [
  {
    icon: <Utensils className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />,
    title: 'Meal Customization',
    description:
      'Personalize your meals to fit your taste, dietary needs, and lifestyle preferences.',
    benefits: ['Dietary restrictions supported', 'Portion size control', 'Ingredient preferences'],
  },
  {
    icon: <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />,
    title: 'Nationwide Delivery',
    description:
      'Fast, fresh delivery to all major cities across Indonesia with temperature control.',
    benefits: ['Same-day delivery available', 'Temperature controlled', 'Tracking included'],
  },
  {
    icon: <Info className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />,
    title: 'Nutritional Transparency',
    description:
      "Detailed nutritional information for every meal, so you know exactly what you're eating.",
    benefits: ['Calorie breakdown', 'Macro nutrients', 'Allergen information'],
  },
  {
    icon: <CalendarCheck className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />,
    title: 'Flexible Subscription',
    description: 'Pause, skip, or reschedule your meal plans anytime with complete flexibility.',
    benefits: ['No commitment required', 'Easy plan changes', '24/7 customer support'],
  },
]

const FeatureCard: React.FC<{ feature: Feature; index: number }> = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Card className="h-full bg-white hover:bg-gray-50/80 transition-all duration-300 rounded-2xl shadow-lg hover:shadow-2xl border-0 group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <CardHeader className="relative pb-3 sm:pb-4 pt-6 sm:pt-8">
          <div className="mb-3 sm:mb-4 mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center group-hover:shadow-lg transition-shadow duration-300">
            {feature.icon}
          </div>
          <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 text-center group-hover:text-gray-700 transition-colors duration-300 px-2">
            {feature.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="relative space-y-3 sm:space-y-4 px-4 sm:px-6 pb-6 sm:pb-8">
          <p className="text-gray-600 text-center leading-relaxed text-sm sm:text-base">
            {feature.description}
          </p>

          <div className="overflow-hidden">
            <div className="pt-3 sm:pt-4 border-t border-gray-100">
              <ul className="space-y-1.5 sm:space-y-2">
                {feature.benefits.map((benefit, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-xs sm:text-sm text-gray-600"
                  >
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500 flex-shrink-0" />
                    <span className="leading-tight">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function Features() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50/50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-emerald-100 text-emerald-700 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <span>✨</span>
            Our Services
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
            Why Choose
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              {' '}
              SEA Catering
            </span>
            ?
          </h2>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed px-2">
            We&apos;re committed to delivering exceptional healthy meals with unmatched convenience
            and transparency. Here&apos;s what makes us different.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div
          id="features"
          className="grid gap-6 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto"
        >
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12 sm:mt-16"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-4 sm:px-6 py-3 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl border border-emerald-200/50 max-w-md sm:max-w-none mx-auto">
            <span className="text-xl sm:text-2xl">🎯</span>
            <p className="text-gray-700 font-medium text-center sm:text-left text-sm sm:text-base">
              Ready to experience the difference?
              <span className="block sm:inline text-emerald-600 font-semibold sm:ml-1">
                Start your healthy journey today!
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
