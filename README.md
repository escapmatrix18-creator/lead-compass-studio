# Campaign Studio - Lead Marketing Platform

A production-grade, compliance-first lead campaign management platform built with React, TypeScript, and modern web technologies.

## 🚀 Features

- **Dashboard**: Real-time campaign analytics and KPI monitoring
- **Campaign Builder**: Visual campaign creation with targeting and templates
- **Lead Manager**: Advanced lead database with filtering and verification
- **Compliance Center**: Ethics-first marketing with built-in compliance tools
- **Integrations**: Connect to email providers and data sources
- **Sending Monitor**: Live campaign sending with performance tracking

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS + Custom Design System
- **Components**: shadcn/ui + Custom Components
- **Animation**: Framer Motion
- **State**: Zustand
- **Routing**: React Router v6
- **Data Fetching**: TanStack Query
- **Internationalization**: react-i18next (English + Hinglish)

## 🏗 Architecture

### Design System
- Professional blue-purple gradient theme
- HSL-based color system with semantic tokens
- Responsive components with consistent spacing
- Dark/light mode support

### Key Components
- `AppLayout`: Main application shell with sidebar and header
- `CampaignBuilder`: Multi-step campaign creation wizard
- `LeadManager`: Virtualized table with advanced filtering
- `ComplianceCenter`: Ethics and legal compliance management

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Environment Variables

Create a `.env.local` file:

```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_OAUTH_REDIRECT_URI=http://localhost:5173/auth/callback
```

## 🔌 API Integration

The frontend expects these backend endpoints:

### Campaigns
- `GET /api/campaigns` - List campaigns
- `POST /api/campaigns` - Create campaign
- `PUT /api/campaigns/:id` - Update campaign
- `DELETE /api/campaigns/:id` - Delete campaign

### Leads
- `GET /api/leads` - List leads with filtering
- `POST /api/leads/import` - Import CSV/Excel leads
- `POST /api/leads/verify` - Verify email addresses
- `PUT /api/leads/:id` - Update lead

### Sending
- `POST /api/send/test` - Send test email
- `POST /api/send/campaign` - Start campaign sending
- `GET /api/send/status/:id` - Get sending status

### Integrations
- `POST /api/integrations/connect` - Connect email provider
- `GET /api/integrations` - List connected integrations
- `POST /api/webhooks` - Configure webhooks

## 🛡 Compliance & Security

### Built-in Compliance Features
- ✅ Automatic unsubscribe links
- ✅ Bounce rate monitoring (auto-pause >5%)
- ✅ Spam complaint tracking
- ✅ Suppression list management
- ✅ Double opt-in support
- ✅ Content filtering

### Security Best Practices
- OAuth preferred over app passwords
- Encrypted API key storage
- Rate limiting UI controls
- Audit trail logging

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy dist folder to Vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
```

## 📊 Analytics Integration

Mock Service Worker (MSW) is configured for development with sample data:

```javascript
// Mock API responses
export const handlers = [
  rest.get('/api/campaigns', (req, res, ctx) => {
    return res(ctx.json(mockCampaigns))
  }),
  // ... more handlers
]
```

## 🎨 Design System

### Color Palette
```css
/* Primary Brand */
--primary: 229 84% 42%;        /* Deep Blue */
--primary-glow: 229 84% 55%;   /* Bright Blue */

/* Status Colors */
--success: 142 71% 45%;        /* Green */
--warning: 45 93% 58%;         /* Yellow */
--destructive: 0 85% 60%;      /* Red */

/* Gradients */
--gradient-primary: linear-gradient(135deg, hsl(229 84% 42%), hsl(262 83% 58%));
```

### Component Variants
- `campaign-button`: Primary CTA styling
- `campaign-card`: Elevated card with hover effects
- `status-success/warning/error`: Semantic status badges

## 🧪 Testing

```bash
# Run tests
npm test

# Run Storybook
npm run storybook
```

## 📝 Development Guidelines

### Code Standards
- TypeScript strict mode
- ESLint + Prettier configuration
- Conventional commit messages
- Component-first architecture

### Backend Integration Notes
- All API calls should include proper error handling
- Use React Query for caching and background updates
- Implement optimistic updates for better UX
- Follow REST conventions for consistency

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Join our Discord community

---

**Note**: This frontend is designed to work with a backend service. Implement the API endpoints according to the specifications above for full functionality.