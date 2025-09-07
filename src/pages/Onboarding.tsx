import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Mail,
  Shield,
  CheckCircle,
  ArrowRight,
  Key,
  AlertTriangle,
  Zap,
  Users,
  Building
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [setupData, setSetupData] = useState({
    accountType: "",
    emailProvider: "",
    senderIdentity: {
      name: "",
      email: "",
      dailyLimit: 50
    }
  });

  const steps = [
    {
      title: "Welcome to Campaign Studio",
      description: "Let's set up your ethical lead marketing platform",
      component: WelcomeStep
    },
    {
      title: "Connect Email Provider",
      description: "Choose your preferred email sending service",
      component: EmailProviderStep
    },
    {
      title: "Sender Identity",
      description: "Configure your sender profile and daily limits",
      component: SenderIdentityStep
    },
    {
      title: "Compliance Setup",
      description: "Activate ethics-first marketing features",
      component: ComplianceStep
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      navigate("/");
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-surface flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold font-heading">Campaign Studio</h1>
          <p className="text-muted-foregroup mt-2">Lead Marketing Platform</p>
        </motion.div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Setup Progress</span>
            <span className="text-sm text-muted-foregroup">
              {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <motion.div
              className="gradient-primary h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <Card className="campaign-card">
          <CardHeader>
            <CardTitle>{steps[currentStep].title}</CardTitle>
            <CardDescription>{steps[currentStep].description}</CardDescription>
          </CardHeader>
          <CardContent>
            <CurrentStepComponent 
              setupData={setupData}
              setSetupData={setSetupData}
            />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            Back
          </Button>
          <Button onClick={nextStep} className="campaign-button">
            {currentStep === steps.length - 1 ? "Complete Setup" : "Continue"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Step Components
function WelcomeStep() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center space-y-4">
        <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center mx-auto">
          <Shield className="w-12 h-12 text-white" />
        </div>
        <h3 className="text-xl font-bold">Ethics-First Marketing</h3>
        <p className="text-muted-foregroup">
          Campaign Studio helps you build compliant, effective lead campaigns while respecting privacy and following best practices.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4">
          <Users className="w-8 h-8 text-primary mx-auto mb-2" />
          <h4 className="font-medium">Lead Management</h4>
          <p className="text-xs text-muted-foregroup">Import, verify, and organize your contacts</p>
        </div>
        <div className="text-center p-4">
          <Mail className="w-8 h-8 text-primary mx-auto mb-2" />
          <h4 className="font-medium">Smart Campaigns</h4>
          <p className="text-xs text-muted-foregroup">Personalized templates with compliance built-in</p>
        </div>
        <div className="text-center p-4">
          <Building className="w-8 h-8 text-primary mx-auto mb-2" />
          <h4 className="font-medium">B2B Focus</h4>
          <p className="text-xs text-muted-foregroup">Designed for professional outreach</p>
        </div>
      </div>
    </motion.div>
  );
}

function EmailProviderStep({ setupData, setSetupData }: any) {
  const providers = [
    {
      id: "gmail",
      name: "Gmail",
      description: "Connect via OAuth (Recommended)",
      icon: Mail,
      type: "oauth",
      popular: true
    },
    {
      id: "sendgrid",
      name: "SendGrid",
      description: "Professional email delivery service",
      icon: Mail,
      type: "api",
      popular: true
    },
    {
      id: "mailgun",
      name: "Mailgun",
      description: "Developer-friendly email API",
      icon: Mail,
      type: "api",
      popular: false
    },
    {
      id: "custom",
      name: "Custom SMTP",
      description: "Connect any SMTP service",
      icon: Key,
      type: "smtp",
      popular: false
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <AlertTriangle className="w-4 h-4 text-warning" />
          <span className="text-sm font-medium">Security Recommendation</span>
        </div>
        <p className="text-xs text-muted-foregroup">
          OAuth authentication is highly recommended over storing app passwords. 
          It's more secure and helps maintain good sending reputation.
        </p>
      </div>

      <div className="grid gap-3">
        {providers.map((provider) => {
          const Icon = provider.icon;
          const isSelected = setupData.emailProvider === provider.id;
          
          return (
            <motion.div
              key={provider.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                isSelected 
                  ? "border-primary bg-primary/5" 
                  : "border-muted hover:border-primary/50"
              }`}
              onClick={() => setSetupData({...setupData, emailProvider: provider.id})}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-primary" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{provider.name}</h4>
                      {provider.popular && (
                        <Badge variant="secondary" className="text-xs">Popular</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foregroup">{provider.description}</p>
                  </div>
                </div>
                {isSelected && (
                  <CheckCircle className="w-5 h-5 text-primary" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function SenderIdentityStep({ setupData, setSetupData }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="sender-name">Your Name</Label>
          <Input
            id="sender-name"
            placeholder="e.g., Priya Sharma"
            value={setupData.senderIdentity.name}
            onChange={(e) => setSetupData({
              ...setupData,
              senderIdentity: {
                ...setupData.senderIdentity,
                name: e.target.value
              }
            })}
            className="campaign-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sender-email">Email Address</Label>
          <Input
            id="sender-email"
            type="email"
            placeholder="e.g., priya@company.com"
            value={setupData.senderIdentity.email}
            onChange={(e) => setSetupData({
              ...setupData,
              senderIdentity: {
                ...setupData.senderIdentity,
                email: e.target.value
              }
            })}
            className="campaign-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="daily-limit">Daily Send Limit</Label>
          <select 
            id="daily-limit"
            className="w-full campaign-input"
            value={setupData.senderIdentity.dailyLimit}
            onChange={(e) => setSetupData({
              ...setupData,
              senderIdentity: {
                ...setupData.senderIdentity,
                dailyLimit: parseInt(e.target.value)
              }
            })}
          >
            <option value="25">25 emails/day (Conservative)</option>
            <option value="50">50 emails/day (Recommended)</option>
            <option value="100">100 emails/day (Aggressive)</option>
          </select>
          <p className="text-xs text-muted-foregroup">
            Start conservative to build sender reputation, increase gradually
          </p>
        </div>
      </div>

      <Separator />

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <h4 className="font-medium mb-2">Preview</h4>
        <div className="text-sm space-y-1">
          <p><strong>From:</strong> {setupData.senderIdentity.name || "Your Name"}</p>
          <p><strong>Email:</strong> {setupData.senderIdentity.email || "your@email.com"}</p>
          <p><strong>Daily Limit:</strong> {setupData.senderIdentity.dailyLimit} emails</p>
        </div>
      </div>
    </motion.div>
  );
}

function ComplianceStep() {
  const complianceFeatures = [
    {
      name: "Automatic Unsubscribe Links",
      description: "Required footer with one-click unsubscribe",
      enabled: true,
      required: true
    },
    {
      name: "Bounce Rate Monitoring",
      description: "Auto-pause campaigns above 5%",
      enabled: true,
      required: true
    },
    {
      name: "Spam Complaint Tracking",
      description: "Monitor and respond to complaints",
      enabled: true,
      required: true
    },
    {
      name: "Double Opt-in",
      description: "Email verification for new leads",
      enabled: false,
      required: false
    },
    {
      name: "Suppression List Management",
      description: "Maintain do-not-contact lists",
      enabled: true,
      required: true
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="bg-success/10 border border-success/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Shield className="w-4 h-4 text-success" />
          <span className="text-sm font-medium">Compliance Protection Active</span>
        </div>
        <p className="text-xs text-muted-foregroup">
          All required compliance features are automatically enabled and cannot be disabled.
        </p>
      </div>

      <div className="space-y-3">
        {complianceFeatures.map((feature, index) => (
          <div key={feature.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-medium">{feature.name}</h4>
                {feature.required && (
                  <Badge variant="outline" className="text-xs">Required</Badge>
                )}
              </div>
              <p className="text-xs text-muted-foregroup">{feature.description}</p>
            </div>
            <div className="flex items-center space-x-2">
              {feature.enabled ? (
                <CheckCircle className="w-4 h-4 text-success" />
              ) : (
                <div className="w-4 h-4 border border-muted-foregroup rounded-full" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
        <p className="text-xs text-warning">
          <strong>Legal Notice:</strong> You are responsible for compliance with all applicable laws. 
          Campaign Studio provides tools to help but cannot guarantee legal compliance for your specific use case.
        </p>
      </div>
    </motion.div>
  );
}

export default Onboarding;