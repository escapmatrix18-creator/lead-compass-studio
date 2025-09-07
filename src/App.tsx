import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { motion } from "framer-motion";

// Providers
import { AppProviders } from "@/components/providers/AppProviders";

// Pages
import Dashboard from "@/pages/Dashboard";
import CampaignBuilder from "@/pages/CampaignBuilder";
import LeadManager from "@/pages/LeadManager";
import Integrations from "@/pages/Integrations";
import ComplianceCenter from "@/pages/ComplianceCenter";
import SendingMonitor from "@/pages/SendingMonitor";
import Onboarding from "@/pages/Onboarding";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

// Layout
import AppLayout from "@/components/layout/AppLayout";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const LoadingScreen = () => (
  <div className="min-h-screen bg-gradient-surface flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <LoadingSpinner size="lg" />
      <p className="text-muted-foreground mt-4">Loading Campaign Studio...</p>
    </motion.div>
  </div>
);

const App = () => {
  return (
    <AppProviders>
      <BrowserRouter>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="campaigns/new" element={<CampaignBuilder />} />
              <Route path="campaigns/:id/edit" element={<CampaignBuilder />} />
              <Route path="leads" element={<LeadManager />} />
              <Route path="integrations" element={<Integrations />} />
              <Route path="compliance" element={<ComplianceCenter />} />
              <Route path="sending" element={<SendingMonitor />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppProviders>
  );
};

export default App;