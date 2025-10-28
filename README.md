# CommuneX - Local Service Marketplace

A modern platform connecting customers with local service providers (workers) for home repairs, cleaning, landscaping, and more.

## 🚀 Features

- **Dual User Roles**: CUSTOMER and WORKER role-based authentication
- **Service Requests**: Customers can post service requests with AI-powered category classification
- **Worker Profiles**: Workers can create profiles, set availability, and manage services
- **Search & Discovery**: Advanced search with category filtering and worker profiles
- **Real-time Messaging**: Socket.IO-based messaging system (planned)
- **Reviews & Ratings**: Worker rating and review system
- **Secure Payments**: Payment processing with platform fees
- **Modern UI**: Built with Next.js 16, Tailwind CSS, and Shadcn/ui

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0.0 with Turbopack
- **Database**: PostgreSQL (Neon) with Drizzle ORM
- **Authentication**: Clerk
- **AI**: OpenAI GPT-4o-mini for service request classification
- **UI**: Shadcn/ui, Tailwind CSS
- **Language**: TypeScript

## 📋 Prerequisites

- Node.js 18+ and pnpm
- Neon PostgreSQL database
- Clerk account
- OpenAI API key

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone git@github.com:Piramilan/Commune-X.git
cd Commune-X
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://neondb_owner:npg_vlkFJY8QyUg0@ep-noisy-breeze-ahy9bm76-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard

# Clerk Webhooks
WEBHOOK_SECRET="whsec_..."

# OpenAI (for AI classification)
OPENAI_API_KEY="sk-..."

# Base URL
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### 4. Push Database Schema

```bash
npx drizzle-kit push
```

### 5. Seed Database (Optional)

Access the seed endpoint to populate your database with test data:

```bash
# Start the dev server first, then visit:
curl -X POST http://localhost:3000/api/seed
```

### 6. Run the Development Server

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/                      # Next.js app directory
│   ├── api/                 # API routes
│   │   ├── categories/      # Service categories
│   │   ├── classify/        # AI classification
│   │   ├── onboarding/      # User role selection
│   │   ├── requests/        # Service requests
│   │   ├── search/          # Worker search
│   │   ├── seed/            # Database seeding
│   │   └── webhooks/        # Clerk webhooks
│   ├── dashboard/           # Customer dashboard
│   ├── provider/            # Worker dashboard
│   ├── admin/               # Admin dashboard
│   ├── sign-in/             # Clerk sign-in
│   ├── sign-up/             # Clerk sign-up
│   ├── onboarding/          # Role selection
│   ├── search/              # Worker search page
│   ├── worker/              # Worker profile pages
│   └── settings/            # User settings
├── components/              # React components
│   ├── ui/                  # Shadcn/ui components
│   ├── navbar.tsx           # Navigation bar
│   ├── footer.tsx            # Footer
│   ├── profile-form.tsx     # Profile management
│   ├── new-request-form.tsx # Service request form
│   └── payment-form.tsx     # Payment form
├── lib/                     # Utility functions
│   ├── auth.ts              # Authentication helpers
│   ├── db.ts                # Database instance
│   ├── ai.ts                # AI classification
│   ├── socket.ts            # Socket.IO setup
│   └── utils.ts             # General utilities
├── src/
│   └── db/                  # Database configuration
│       ├── schema.ts        # Drizzle schema
│       └── index.ts         # Database connection
├── drizzle.config.ts        # Drizzle ORM config
└── middleware.ts            # Next.js middleware
```

## 🔐 Authentication Flow

1. **Sign Up**: User signs up via Clerk
2. **Onboarding**: User selects CUSTOMER or WORKER role
3. **Role-Based Access**: 
   - CUSTOMER → Access to `/dashboard` and customer features
   - WORKER → Access to `/provider` and worker features

## 📊 Database Schema

### Key Tables

- **app_users**: User accounts with Clerk integration
- **profiles**: Extended user profiles (phone, bio, location, ratings)
- **categories**: Service categories (plumbing, electrical, etc.)
- **worker_services**: Services offered by workers
- **requests**: Service requests from customers
- **request_assignments**: Worker requests for assignments
- **reviews**: Worker reviews and ratings
- **payments**: Payment transactions

## 🚦 User Roles

### Customer Flow
1. Browse categories or search for workers
2. Create service requests
3. Receive proposals from workers
4. Accept proposals and communicate with workers
5. Complete payment and leave reviews

### Worker Flow
1. Complete worker profile
2. Set service categories and pricing
3. Set availability schedule
4. Browse and respond to service requests
5. Receive payments and build reputation

## 🎨 Pages

- **Home** (`/`): Landing page with features and categories
- **Search** (`/search`): Search for workers by category
- **Categories** (`/categories`): Browse all service categories
- **How It Works** (`/how-it-works`): Platform explanation
- **Dashboard** (`/dashboard`): Customer dashboard
- **Provider** (`/provider`): Worker dashboard
- **Settings** (`/settings`): User settings and profile
- **Worker Profile** (`/worker/[id]`): Individual worker profiles

## 🔑 API Endpoints

- `GET /api/categories` - Get all service categories
- `POST /api/classify` - AI-powered category classification
- `POST /api/requests` - Create service request
- `GET /api/requests` - Get user's requests
- `GET /api/search` - Search workers by category
- `POST /api/onboarding` - Set user role (CUSTOMER/WORKER)
- `POST /api/seed` - Seed database with test data

## 🧪 Testing

1. **Sign up** as a new user
2. **Complete onboarding** by selecting CUSTOMER or WORKER role
3. **Browse services** and create requests (customer)
4. **Set up profile** and manage services (worker)
5. **Test search** and filtering functionality

## 📝 Environment Variables Reference

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key |
| `CLERK_SECRET_KEY` | Clerk secret key |
| `WEBHOOK_SECRET` | Clerk webhook secret |
| `OPENAI_API_KEY` | OpenAI API key for AI features |
| `NEXT_PUBLIC_BASE_URL` | Base URL for the application |

## 🛡️ Security

- All API routes are protected with Clerk authentication
- Role-based access control enforced at middleware level
- Database credentials stored securely in environment variables
- Clerk webhooks verified with secret key

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Database Migration

The database schema is managed by Drizzle ORM. To deploy:

```bash
npx drizzle-kit push
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

Private project - All rights reserved

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js, Drizzle ORM, and Clerk

