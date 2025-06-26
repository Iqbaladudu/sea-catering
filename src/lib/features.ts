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
