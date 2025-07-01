# Sea Catering - Meal Subscription Management System

A modern web application built with Payload CMS, Next.js, and TypeScript for managing meal subscription services. This system provides a complete solution for catering businesses to manage meal plans, subscriptions, customers, and testimonials.

## 🚀 Features

### Core Functionality
- **Meal Plan Management**: Create and manage different meal plans with pricing, features, and dietary options
- **Subscription System**: Handle customer subscriptions with flexible delivery schedules
- **Customer Management**: Comprehensive customer database with subscription tracking
- **Testimonials**: Collect and display customer reviews and testimonials
- **Admin Dashboard**: Intuitive admin interface powered by Payload CMS

### Technical Features
- **Modern Stack**: Built with Next.js 15, React 19, and TypeScript
- **Database**: PostgreSQL with Payload CMS ORM
- **Authentication**: Built-in user authentication and role management
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **API Integration**: REST API endpoints

## 📁 Project Structure

```
sea-catering/
├── src/
│   ├── collections/          # Payload CMS collections
│   │   ├── Customer.ts       # Customer data management
│   │   ├── MealPlans.ts      # Meal plan configurations
│   │   ├── Media.ts          # File upload handling
│   │   ├── Subscriptions.ts  # Subscription management
│   │   ├── Testimonials.ts   # Customer testimonials
│   │   └── Users.ts          # User authentication
│   ├── app/                  # Next.js app directory
│   ├── components/           # Reusable React components
│   ├── actions/              # Server actions
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions
│   ├── public/               # Static assets
│   ├── payload.config.ts     # Payload CMS configuration
│   └── seed.ts               # Database seeding
├── docker-compose.yml        # Docker development setup
├── Dockerfile               # Production Docker image
└── package.json             # Dependencies and scripts
```

## 🛠 Installation & Setup

### Prerequisites
- Node.js 20.9.0+
- npm latest or pnpm latest
- PostgreSQL database

### Method 1: Local Development with npm/pnpm

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sea-catering
   ```

2. **Install dependencies**
   ```bash
   # Using pnpm (recommended)
   pnpm install

   # Or using npm
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   ```

   Configure your environment variables in `.env`:
   ```env
   NEXT_PUBLIC_URL=http://localhost:3000
   DATABASE_URI=postgresql://username:password@localhost:5432/sea_catering
   PAYLOAD_SECRET=your-secret-key
   ```

4. **Start development server**
   ```bash
   # Using pnpm
   pnpm dev

   # Or using npm
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

### Method 2: Docker Compose Development

1. **Clone and setup**
   ```bash
   git clone <repository-url>
   cd sea-catering
   cp .env.example .env
   ```

2. **Configure environment for Docker**
   Update your `.env` file:
   ```env
   NEXT_PUBLIC_URL=http://localhost:3000
   DATABASE_URI=postgresql://postgres:password@postgres:5432/sea_catering
   PAYLOAD_SECRET=your-secret-key
   ```

3. **Start with Docker Compose**
   ```bash
   docker-compose up
   ```

   This will:
   - Start PostgreSQL database on port 5433
   - Install dependencies automatically
   - Seed the database with initial data
   - Start the development server on port 3000

4. **Access the application**
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin
   - PostgreSQL: localhost:5433

## 📊 Data Collections

### Meal Plans
- Plan details (name, price, description)
- Features and benefits
- Delivery frequency
- Dietary options and restrictions
- Sample menus and calorie information
- FAQ section

### Subscriptions
- Customer subscription management
- Plan associations
- Delivery scheduling

### Customers
- Customer profiles and contact information
- Subscription history

### Testimonials
- Customer reviews and ratings
- Display management

## 🔧 Configuration

### Database
The application uses PostgreSQL with Payload CMS as the ORM. Database configuration is handled in `payload.config.ts`.

### Authentication
User authentication is built-in with Payload CMS, supporting role-based access control.

### Environment Variables
Ensure these are set in production:
- `DATABASE_URI`: PostgreSQL connection string
- `PAYLOAD_SECRET`: Secret key for encryption
- `NEXT_PUBLIC_URL`: Your production URL


## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For questions and support:
- Create an issue in the repository
- Check the [Payload CMS documentation](https://payloadcms.com/docs)
- Review the [Next.js documentation](https://nextjs.org/docs)
