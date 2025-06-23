import { MealPlan, NavLink } from './interfaces'

export const MEAL_PLANS: MealPlan[] = [
  {
    name: 'Starter Plan',
    price: 'Rp 299.000 / week',
    description: 'Perfect for individuals looking to try healthy meals.',
    features: [
      '7 meals (lunch or dinner)',
      'Free delivery in Jabodetabek',
      'Customizable menu',
      'Nutritionist support',
    ],
  },
  {
    name: 'Family Plan',
    price: 'Rp 999.000 / week',
    description: 'Ideal for families or groups up to 4 people.',
    features: [
      '28 meals (lunch & dinner)',
      'Free delivery in Greater Jakarta',
      'Family-style portions',
      'Weekly menu rotation',
    ],
    popular: true,
  },
  {
    name: 'Executive Plan',
    price: 'Rp 1.499.000 / week',
    description: 'For busy professionals who want premium, tailored meals.',
    features: [
      '14 premium meals',
      'Priority delivery',
      'Personalized nutrition plan',
      'Exclusive menu options',
    ],
  },
]

export const NAV_LINKS: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'Meal Plans', href: '/#menu' },
  { name: 'Subscription', href: '/subscription' },
  { name: 'Contact Us', href: '/#contact' },
]
