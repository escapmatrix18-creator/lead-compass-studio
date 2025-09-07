# Campaign Studio - Lead Campaign & Marketing Platform

A production-grade, compliance-first lead campaign and marketing platform built with React, TypeScript, and modern web technologies.

## 🚀 Features

### Core Functionality
- **Campaign Builder**: Create targeted lead campaigns with advanced filtering
- **Lead Management**: Import, verify, and manage lead databases with compliance tracking
- **Multi-Sender Support**: Configure multiple sender identities with rotation strategies
- **Compliance Center**: Ethics-first approach with automatic unsubscribe, bounce monitoring
- **Integration Hub**: Connect with Gmail, SendGrid, Mailgun, and API connectors
- **Real-time Monitoring**: Live campaign tracking with analytics and performance metrics

### Technical Features
- **Modern Stack**: React 18, TypeScript, Vite, TailwindCSS
- **State Management**: Zustand for lightweight state management
- **Data Fetching**: TanStack Query for server state management
- **UI Components**: Shadcn/ui with custom design system
- **Animations**: Framer Motion for smooth micro-interactions
- **Backend Ready**: Supabase integration for authentication and database
- **Responsive Design**: Mobile-first design with dark/light mode support

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: TailwindCSS with custom design system
- **Components**: Shadcn/ui component library
- **State**: Zustand + TanStack Query
- **Animations**: Framer Motion
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Build**: Vite with TypeScript
- **Linting**: ESLint + Prettier

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Setup
1. Clone the repository:
```bash
git clone <repository-url>
cd campaign-studio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your environment variables:
```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3001/api
VITE_OAUTH_REDIRECT_URI=http://localhost:5173/auth/callback

# Supabase Configuration (if using)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Start the development server:
```bash
npm run dev
```

## 🚦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   └── layout/         # Layout components (Header, Sidebar, etc.)
├── pages/              # Page components
│   ├── Dashboard.tsx
│   ├── CampaignBuilder.tsx
│   ├── LeadManager.tsx
│   └── ...
├── hooks/              # Custom React hooks
│   ├── useAuth.ts
│   ├── useCampaigns.ts
│   └── useLeads.ts
├── lib/                # Utility libraries
│   ├── api.ts          # API service layer
│   ├── constants.ts    # App constants
│   ├── mockData.ts     # Development mock data
│   └── utils.ts        # Utility functions
├── store/              # Zustand stores
│   └── themeStore.ts
├── integrations/       # Third-party integrations
│   └── supabase/
└── assets/            # Static assets
```

## 🔌 Backend Integration

The frontend is designed to work with any backend that implements the expected API contract:

### Required API Endpoints

```typescript
// Campaign Management
GET    /api/campaigns           - List campaigns
POST   /api/campaigns           - Create campaign
GET    /api/campaigns/:id       - Get campaign
PUT    /api/campaigns/:id       - Update campaign
DELETE /api/campaigns/:id       - Delete campaign

// Lead Management  
GET    /api/leads              - List leads (with filters)
POST   /api/leads/import       - Import leads from CSV/Excel
POST   /api/leads/verify       - Verify lead emails
POST   /api/leads/export       - Export leads

// Sending & Testing
POST   /api/send/test          - Send test email
POST   /api/campaigns/:id/send - Launch campaign
GET    /api/campaigns/:id/stats - Get campaign analytics

// Integrations
POST   /api/integrations/connect - Connect email provider
GET    /api/integrations         - List connected integrations

// Health Check
GET    /api/health              - API health status
```

### Data Models

See `src/lib/api.ts` for complete TypeScript interfaces:

- `Campaign` - Campaign configuration and metadata
- `Lead` - Lead contact information and verification status
- `ApiResponse<T>` - Standardized API response wrapper

## 🔐 Authentication & Security

### Supabase Auth (Recommended)
The app includes Supabase authentication setup:

```typescript
// Auth hooks available
import { useAuth } from '@/hooks/useAuth';

const { user, signIn, signUp, signOut, isAuthenticated } = useAuth();
```

### Security Features
- **CSRF Protection**: Built-in request validation
- **Compliance Monitoring**: Automatic bounce/complaint tracking  
- **Data Encryption**: Sensitive data encrypted at rest
- **OAuth Preferred**: Secure authentication over app passwords
- **Audit Logging**: All actions logged for compliance

## 📊 Compliance & Ethics

Campaign Studio is built with ethics-first marketing principles:

### Required Compliance Features
- ✅ Automatic unsubscribe links in all emails
- ✅ Bounce rate monitoring (auto-pause at 5%+)
- ✅ Spam complaint tracking
- ✅ Suppression list management
- ✅ Double opt-in support
- ✅ GDPR/CAN-SPAM compliance tools

### Legal Considerations
- Always obtain proper consent before sending emails
- Respect unsubscribe requests immediately
- Use crawler/scraping features only with permission
- Monitor bounce and complaint rates regularly
- Maintain accurate suppression lists
- Consult legal counsel for jurisdiction-specific requirements

## 🎨 Design System

The app uses a comprehensive design system built on CSS custom properties:

### Color Tokens
```css
/* Primary Brand */
--primary: 224 71% 50%;
--primary-variant: 248 100% 70%;

/* Status Colors */
--success: 142 76% 36%;
--warning: 47 96% 53%;
--destructive: 0 84% 60%;

/* Gradients */
--gradient-primary: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-variant)));
--gradient-surface: linear-gradient(135deg, hsl(var(--background)), hsl(var(--muted)));
```

### Component Styling
All components use semantic tokens from the design system. See `src/index.css` and `tailwind.config.ts` for the complete system.

## 🧪 Development Features

### Mock Data
The app includes comprehensive mock data for development:
- Sample campaigns, leads, and analytics in `src/lib/mockData.ts`
- Simulated API responses for offline development
- Error state simulation for robust testing

### Custom Hooks
- `useCampaigns()` - Campaign CRUD operations
- `useLeads()` - Lead management with filtering
- `useAuth()` - Authentication state management
- Error boundaries for production stability

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Setup
Ensure production environment variables are configured:
- `VITE_API_BASE_URL` - Your production API URL
- `VITE_SUPABASE_URL` - Supabase project URL (if using)
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key (if using)

### Deployment Platforms
The app can be deployed to any static hosting service:
- **Vercel** (Recommended for React apps)
- **Netlify**
- **AWS CloudFront + S3**
- **Google Cloud Storage**

## 🔧 Development

### Adding New Features
1. Create components in `src/components/`
2. Add custom hooks in `src/hooks/`
3. Define API contracts in `src/lib/api.ts`
4. Update constants in `src/lib/constants.ts`
5. Add mock data in `src/lib/mockData.ts`
6. Follow the existing component patterns

### Code Quality
- TypeScript strict mode enabled
- ESLint + Prettier configured
- Component prop validation
- Error boundaries for production stability

## 📞 Support

For questions or issues:
1. Check the existing documentation
2. Review the TypeScript interfaces in `src/lib/api.ts`
3. Examine the mock data for expected formats
4. Consult the compliance documentation

## 📄 License

This project is proprietary. All rights reserved.

---

**⚠️ Important**: This platform is designed for ethical B2B marketing only. Users are responsible for compliance with all applicable laws and regulations including GDPR, CAN-SPAM, and local data protection laws.