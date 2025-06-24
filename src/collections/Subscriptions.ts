import type { CollectionConfig } from 'payload'

const Subscriptions: CollectionConfig = {
  slug: 'subscriptions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'plan', 'createdAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Phone Number',
    },
    {
      name: 'plan',
      type: 'text',
      required: true,
      label: 'Selected Plan',
    },
    {
      name: 'mealTypes',
      type: 'array',
      required: true,
      label: 'Meal Types',
      fields: [
        {
          name: 'type',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'deliveryDays',
      type: 'array',
      required: true,
      label: 'Delivery Days',
      fields: [
        {
          name: 'day',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'allergies',
      type: 'text',
      label: 'Allergies / Dietary Restrictions',
    },
  ],
}

export default Subscriptions
