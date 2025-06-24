import type { CollectionConfig } from 'payload'

export const MealPlans: CollectionConfig = {
  slug: 'meal-plans',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'isRecommended'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Plan Name (e.g. Diet Plan)',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Price calculated per meal',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Short Description',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features',
      required: true,
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'deliveryArea',
      type: 'text',
      label: 'Delivery Area',
    },
    {
      name: 'support',
      type: 'text',
      label: 'Support',
    },
    {
      name: 'isRecommended',
      type: 'checkbox',
      label: 'Recommended Plan',
      defaultValue: false,
    },
    {
      name: 'popular',
      type: 'checkbox',
      label: 'Popular plan',
      defaultValue: false,
    },
    {
      name: 'detailedDescription',
      type: 'textarea',
      label: 'Detailed Description',
    },
    {
      name: 'caloriesPerMeal',
      type: 'text',
      label: 'Calories per Meal',
    },
    {
      name: 'menuSample',
      type: 'array',
      label: 'Sample Menu',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'deliveryFrequency',
      type: 'text',
      label: 'Delivery Frequency',
    },
    {
      name: 'dietaryOptions',
      type: 'array',
      label: 'Dietary Options',
      fields: [
        {
          name: 'option',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'faq',
      type: 'array',
      label: 'FAQ',
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}

export default MealPlans
