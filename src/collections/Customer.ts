import type { CollectionConfig } from 'payload'

const Customer: CollectionConfig = {
  slug: 'customers',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'createdAt'],
  },
  auth: {
    verify: false,
    maxLoginAttempts: 5,
    lockTime: 600 * 1000, // 10 minutes
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email (used for login)',
      unique: true,
    },
    {
      name: 'password',
      type: 'text',
      required: true,
      label: 'Password',
      minLength: 8,
      admin: {
        description:
          'Minimum 8 characters, must include uppercase, lowercase, number, and special character',
      },
      validate: (val: any) => {
        if (!val) return 'Password is required'
        if (val.length < 8) return 'Password must be at least 8 characters long'

        const hasUppercase = /[A-Z]/.test(val)
        const hasLowercase = /[a-z]/.test(val)
        const hasNumber = /\d/.test(val)
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(val)
        if (!hasUppercase) return 'Password must include at least one uppercase letter'
        if (!hasLowercase) return 'Password must include at least one lowercase letter'
        if (!hasNumber) return 'Password must include at least one number'
        if (!hasSpecialChar) return 'Password must include at least one special character'

        return true
      },
    },
  ],
}

export default Customer
