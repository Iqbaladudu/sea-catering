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
    mealsPerWeek: 7,
    deliveryArea: 'Jabodetabek',
    support: 'Nutritionist support',
    isRecommended: false,
    detailedDescription:
      'The Starter Plan is designed for individuals who want to eat healthy without hassle. Enjoy a rotating menu with balanced nutrition, delivered fresh to your door.',
    caloriesPerMeal: '400-600 kcal',
    menuSample: ['Grilled Chicken Salad', 'Beef Teriyaki Bowl', 'Vegetarian Pasta'],
    deliveryFrequency: 'Once per day',
    dietaryOptions: ['Regular', 'Vegetarian'],
    faq: [
      {
        question: 'Can I pause my plan?',
        answer: 'Yes, you can pause anytime via your dashboard.',
      },
      {
        question: 'Are there vegan options?',
        answer: 'Currently, we offer vegetarian but not full vegan.',
      },
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
    mealsPerWeek: 28,
    deliveryArea: 'Greater Jakarta',
    support: 'Family nutritionist support',
    isRecommended: true,
    detailedDescription:
      'The Family Plan is perfect for busy families. Get generous portions, kid-friendly options, and flexible delivery times.',
    caloriesPerMeal: '500-700 kcal',
    menuSample: ['Chicken Katsu Bento', 'Salmon Rice Bowl', 'Vegetable Stir Fry'],
    deliveryFrequency: 'Twice per day',
    dietaryOptions: ['Regular', 'Vegetarian', 'Kids'],
    faq: [
      {
        question: 'Can I change delivery address?',
        answer: 'Yes, contact support to update your address.',
      },
      { question: 'Is there a minimum order?', answer: 'No minimum for Family Plan.' },
    ],
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
    mealsPerWeek: 14,
    deliveryArea: 'All major cities',
    support: 'Personal nutritionist',
    isRecommended: false,
    detailedDescription:
      'The Executive Plan offers gourmet meals, priority delivery, and a personal nutritionist for tailored meal planning.',
    caloriesPerMeal: '450-650 kcal',
    menuSample: ['Steak & Quinoa Salad', 'Seared Tuna Bowl', 'Vegan Buddha Bowl'],
    deliveryFrequency: 'Flexible (choose your schedule)',
    dietaryOptions: ['Regular', 'Low Carb', 'Vegan'],
    faq: [
      {
        question: 'Can I request custom meals?',
        answer: 'Yes, contact your assigned nutritionist.',
      },
      { question: 'Is delivery available on weekends?', answer: 'Yes, 7 days a week.' },
    ],
  },
]

export const NAV_LINKS: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'Meal Plans', href: '/#menu' },
  { name: 'Subscription', href: '/subscription' },
  { name: 'Contact Us', href: '/#contact' },
]
