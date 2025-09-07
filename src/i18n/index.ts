import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { config } from '@/config';

// Import translation resources
import enDashboard from '../locales/en/dashboard.json';
import enCampaign from '../locales/en/campaign.json';
import enLeads from '../locales/en/leads.json';
import enSettings from '../locales/en/settings.json';
import enCommon from '../locales/en/common.json';

import hiDashboard from '../locales/hi-Hinglish/dashboard.json';
import hiCampaign from '../locales/hi-Hinglish/campaign.json';
import hiLeads from '../locales/hi-Hinglish/leads.json';
import hiSettings from '../locales/hi-Hinglish/settings.json';
import hiCommon from '../locales/hi-Hinglish/common.json';

// Translation resources
const resources = {
  en: {
    dashboard: enDashboard,
    campaign: enCampaign,
    leads: enLeads,
    settings: enSettings,
    common: enCommon,
  },
  'hi-Hinglish': {
    dashboard: hiDashboard,
    campaign: hiCampaign,
    leads: hiLeads,
    settings: hiSettings,
    common: hiCommon,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: config.i18n.defaultLanguage,
    fallbackLng: config.i18n.fallbackLanguage,
    
    // Namespace configuration
    defaultNS: 'common',
    ns: ['common', 'dashboard', 'campaign', 'leads', 'settings'],
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },

    // Development settings
    debug: import.meta.env.DEV,
    
    // React i18next options
    react: {
      useSuspense: false,
    },
  });

export default i18n;