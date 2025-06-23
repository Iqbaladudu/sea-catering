import { CalendarCheck, Info, Truck, Utensils } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

export const features: Feature[] = [
  {
    icon: <Utensils className="w-8 h-8 text-primary" />,
    title: 'Meal Customization',
    description: 'Personalize your meals to fit your taste, diet, and lifestyle.',
  },
  {
    icon: <Truck className="w-8 h-8 text-primary" />,
    title: 'Nationwide Delivery',
    description: 'Fast, fresh delivery to all major cities across Indonesia.',
  },
  {
    icon: <Info className="w-8 h-8 text-primary" />,
    title: 'Nutritional Transparency',
    description:
      'Detailed nutritional info for every meal, so you know exactly what you’re eating.',
  },
  {
    icon: <CalendarCheck className="w-8 h-8 text-primary" />,
    title: 'Flexible Subscription',
    description: 'Pause, skip, or reschedule your meal plans anytime with ease.',
  },
]

export default function Features() {
  return (
    <>
      <h1 className="text-2xl lg:text-3xl text-gray-900 font-bold mt-10">Our Featured Services</h1>
      <section
        id="features"
        className="w-full container px-4 py-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
      >
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="flex flex-col items-center text-center shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl bg-white"
          >
            <CardHeader className="w-full flex-row justify-center items-center">
              <div className="mb-2 mx-auto">{feature.icon}</div>
              <CardTitle className="text-lg md:text-xl font-semibold">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm md:text-base">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  )
}
