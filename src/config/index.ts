// Feature flags and environment-driven configuration
export const config = {
  // Feature Flags
  features: {
    ENABLE_CRAWLER_UI: import.meta.env.VITE_FEATURE_ENABLE_CRAWLER_UI === 'true',
    ENABLE_PROXY_UI: import.meta.env.VITE_FEATURE_ENABLE_PROXY_UI === 'true',
    ENABLE_ADVANCED_ANALYTICS: import.meta.env.VITE_FEATURE_ENABLE_ANALYTICS === 'true',
    ENABLE_A11Y_DEBUG: import.meta.env.DEV,
    ENABLE_TELEMETRY: import.meta.env.VITE_FEATURE_ENABLE_TELEMETRY !== 'false',
    ENABLE_DEV_TOOLS: import.meta.env.DEV,
  },

  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 30000,
    retryAttempts: 3,
    retryDelay: 1000,
  },

  // UI Configuration
  ui: {
    defaultTheme: (import.meta.env.VITE_DEFAULT_THEME as 'light' | 'dark') || 'light',
    enableAnimations: import.meta.env.VITE_ENABLE_ANIMATIONS !== 'false',
    virtualizationThreshold: 100,
    csvPreviewRows: 50,
    maxFileSize: 10 * 1024 * 1024, // 10MB
  },

  // i18n Configuration
  i18n: {
    defaultLanguage: import.meta.env.VITE_I18N_DEFAULT_LANG || 'en',
    supportedLanguages: ['en', 'hi-Hinglish'],
    fallbackLanguage: 'en',
  },

  // Security Configuration
  security: {
    maskPII: import.meta.env.VITE_MASK_PII !== 'false',
    consentRequired: import.meta.env.VITE_CONSENT_REQUIRED !== 'false',
    showRateLimitNotice: import.meta.env.VITE_SHOW_RATE_LIMIT_NOTICE !== 'false',
  },

  // Performance Configuration
  performance: {
    enableCodeSplitting: true,
    prefetchRoutes: import.meta.env.VITE_PREFETCH_ROUTES !== 'false',
    cacheTimeout: 5 * 60 * 1000, // 5 minutes
  },

  // Development Configuration
  dev: {
    enableMocking: import.meta.env.VITE_ENABLE_MOCKING !== 'false',
    showBundleAnalyzer: import.meta.env.VITE_SHOW_BUNDLE_ANALYZER === 'true',
    enableHotKeys: import.meta.env.DEV,
  },
} as const;

export type Config = typeof config;