import { MealPlan, NavLink, Testimonial } from './interfaces'

export const MEAL_PLANS: MealPlan[] = [
  {
    name: 'Diet Plan',
    price: 30000,
    description:
      'Perfect for individuals looking to try healthy meals. Pay per meal, no weekly commitment.',
    features: [
      'Order as many meals as you want',
      'Free delivery in Jabodetabek',
      'Customizable menu',
      'Nutritionist support',
    ],
    deliveryArea: 'Jabodetabek',
    support: 'Nutritionist support',
    isRecommended: false,
    detailedDescription:
      'The Diet Plan is designed for individuals who want to eat healthy without hassle. Enjoy a rotating menu with balanced nutrition, delivered fresh to your door. Pay only for the meals you order.',
    caloriesPerMeal: '400-600 kcal',
    menuSample: ['Grilled Chicken Salad', 'Beef Teriyaki Bowl', 'Vegetarian Pasta'],
    deliveryFrequency: 'Flexible (choose your schedule)',
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
    name: 'Protein Plan',
    price: 40000,
    description: 'Ideal for families or groups up to 4 people. Pay per meal, order as needed.',
    features: [
      'Family-style portions',
      'Free delivery in Greater Jakarta',
      'Kid-friendly menu options',
      'Weekly menu rotation',
    ],
    popular: true,
    deliveryArea: 'Greater Jakarta',
    support: 'Family nutritionist support',
    isRecommended: true,
    detailedDescription:
      'The Protein Plan is perfect for busy families. Get generous portions, kid-friendly options, and flexible delivery times. Pay per meal, no minimum order required.',
    caloriesPerMeal: '500-700 kcal',
    menuSample: ['Chicken Katsu Bento', 'Salmon Rice Bowl', 'Vegetable Stir Fry'],
    deliveryFrequency: 'Flexible (choose your schedule)',
    dietaryOptions: ['Regular', 'Vegetarian', 'Kids'],
    faq: [
      {
        question: 'Can I change delivery address?',
        answer: 'Yes, contact support to update your address.',
      },
      { question: 'Is there a minimum order?', answer: 'No minimum for Protein Plan.' },
    ],
  },
  {
    name: 'Royal Plan',
    price: 60000,
    description:
      'For busy professionals who want premium, tailored meals. Pay per meal, order anytime.',
    features: [
      'Premium menu options',
      'Priority delivery',
      'Personalized nutrition plan',
      'Exclusive gourmet meals',
    ],
    deliveryArea: 'All major cities',
    support: 'Personal nutritionist',
    isRecommended: false,
    detailedDescription:
      'The Royal Plan offers gourmet meals, priority delivery, and a personal nutritionist for tailored meal planning. Pay per meal, with flexible scheduling.',
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

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Andrew',
    message: 'The meals are delicious, healthy, and always delivered on time. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Sarah',
    message: 'Great variety of menu options and perfect for families. Even my kids love it!',
    rating: 4,
  },
  {
    name: 'David',
    message: 'Customer service is very responsive. The executive plan truly feels premium!',
    rating: 5,
  },
  {
    name: 'Linda',
    message:
      'I appreciate the flexible subscription and the nutritionist support. Meals are always fresh!',
    rating: 5,
  },
  {
    name: 'Michael',
    message:
      'Affordable, tasty, and healthy. The delivery is always on time and the menu never gets boring.',
    rating: 4,
  },
]

// features.ts
export interface Feature {
  icon: 'CheckCircle2' | 'Truck' | 'ShieldCheck' | 'Users'
  iconClass: string
  title: string
  desc: string
}

export const features: Feature[] = [
  {
    icon: 'CheckCircle2',
    iconClass: 'text-green-500 w-6 h-6',
    title: 'Flexible Plans',
    desc: 'Choose, pause, or change your meal plan anytime.',
  },
  {
    icon: 'Truck',
    iconClass: 'text-blue-500 w-6 h-6',
    title: 'Nationwide Delivery',
    desc: 'Fresh meals delivered to your door, wherever you are.',
  },
  {
    icon: 'ShieldCheck',
    iconClass: 'text-primary w-6 h-6',
    title: 'Nutritionist Support',
    desc: 'Get expert advice for your dietary needs.',
  },
  {
    icon: 'Users',
    iconClass: 'text-yellow-500 w-6 h-6',
    title: 'For Individuals & Families',
    desc: 'Plans for singles, couples, and families.',
  },
]
