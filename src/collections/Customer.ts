import type { CollectionConfig } from 'payload'

const Customer: CollectionConfig = {
  slug: 'customers',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'createdAt'],
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    // email and password fields are automatically added by Payload when auth is enabled
  ],
}

export default Customer
