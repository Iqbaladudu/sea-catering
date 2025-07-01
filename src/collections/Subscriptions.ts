import type { CollectionConfig } from 'payload'

const Subscriptions: CollectionConfig = {
  slug: 'subscriptions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'plan', 'status', 'createdAt'],
  },
  fields: [
    {
      name: 'customer',
      type: 'relationship',
      required: false,
      label: 'Customer',
      relationTo: 'customers',
    },
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
      type: 'relationship',
      required: true,
      label: 'Selected Plan',
      relationTo: 'meal-plans',
    },
    {
      name: 'mealTypes',
      type: 'select',
      required: true,
      label: 'Meal Types',
      hasMany: true,
      options: [
        { label: 'Breakfast', value: 'breakfast' },
        { label: 'Lunch', value: 'lunch' },
        { label: 'Dinner', value: 'dinner' },
      ],
    },
    {
      name: 'deliverDays',
      type: 'select',
      required: true,
      label: 'Deliver Days',
      hasMany: true, // Allows multiple selections
      options: [
        { label: 'Monday', value: 'monday' },
        { label: 'Tuesday', value: 'tuesday' },
        { label: 'Wednesday', value: 'wednesday' },
        { label: 'Thursday', value: 'thursday' },
        { label: 'Friday', value: 'friday' },
        { label: 'Saturday', value: 'saturday' },
        { label: 'Sunday', value: 'sunday' },
      ],
    },
    {
      name: 'allergies',
      type: 'text',
      label: 'Allergies / Dietary Restrictions',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      label: 'Subscription Status',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Paused', value: 'paused' },
        { label: 'Canceled', value: 'canceled' },
      ],
    },
  ],
}

export default Subscriptions
