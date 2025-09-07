import React from "react";
import { motion } from "framer-motion";
// Translation removed for compatibility
import { 
  Plug,
  Mail,
  Database,
  Shield,
  Key,
  CheckCircle,
  AlertTriangle,
  Settings,
  ExternalLink,
  Plus
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const integrations = [
  {
    id: "clearbit",
    name: "Clearbit",
    description: "Professional B2B data enrichment and company insights",
    category: "Data Enrichment",
    status: "available",
    pricing: "Paid API",
    features: ["Company data", "Person enrichment", "Technographics"],
    icon: Database,
    color: "blue"
  },
  {
    id: "hunter",
    name: "Hunter.io",
    description: "Email finder and verification service",
    category: "Email Tools",
    status: "available", 
    pricing: "Freemium",
    features: ["Email finder", "Email verification", "Domain search"],
    icon: Mail,
    color: "green"
  },
  {
    id: "sendgrid",
    name: "SendGrid",
    description: "Email delivery and analytics platform",
    category: "Email Sending",
    status: "connected",
    pricing: "Freemium",
    features: ["Email delivery", "Analytics", "Template management"],
    icon: Mail,
    color: "blue"
  },
  {
    id: "mailgun",
    name: "Mailgun",
    description: "Email API service for developers",
    category: "Email Sending",
    status: "available",
    pricing: "Paid",
    features: ["Email API", "Deliverability", "Analytics"],
    icon: Mail,
    color: "red"
  },
  {
    id: "linkedin",
    name: "LinkedIn Sales Navigator",
    description: "Professional networking and lead generation",
    category: "Lead Generation",
    status: "beta",
    pricing: "Premium",
    features: ["Lead search", "Contact export", "Company insights"],
    icon: Database,
    color: "blue"
  },
  {
    id: "google-places",
    name: "Google Places API",
    description: "Local business data and contact information",
    category: "Local Data",
    status: "available",
    pricing: "Pay-per-use",
    features: ["Business listings", "Contact details", "Location data"],
    icon: Database,
    color: "yellow"
  }
];

const Integrations = () => {
  // const { t } = useTranslation();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="status-success">Connected</Badge>;
      case "available":
        return <Badge variant="secondary">Available</Badge>;
      case "beta":
        return <Badge className="status-warning">Beta</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Data Enrichment":
        return "text-blue-600";
      case "Email Tools":
        return "text-green-600";
      case "Email Sending":
        return "text-purple-600";
      case "Lead Generation":
        return "text-orange-600";
      case "Local Data":
        return "text-yellow-600";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading">Integrations</h1>
          <p className="text-muted-foreground mt-2">
            Connect to data sources and email service providers
          </p>
        </div>
        <Button className="campaign-button">
          <Plus className="w-4 h-4 mr-2" />
          Add Custom Integration
        </Button>
      </div>

      {/* Connected Services */}
      <Card className="campaign-card border-success/20">
        <CardHeader>
          <CardTitle className="flex items-center text-success">
            <CheckCircle className="w-5 h-5 mr-2" />
            Connected Services
          </CardTitle>
          <CardDescription>
            Active integrations and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrations.filter(i => i.status === "connected").map((integration) => {
              const Icon = integration.icon;
              return (
                <motion.div
                  key={integration.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 border rounded-lg bg-success/5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
                        <Icon className="w-4 h-4 text-success" />
                      </div>
                      <div>
                        <h3 className="font-medium">{integration.name}</h3>
                        <p className="text-xs text-muted-foregroup">{integration.category}</p>
                      </div>
                    </div>
                    <Settings className="w-4 h-4 text-muted-foregroup cursor-pointer" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-success">✓ Active & Verified</span>
                    <Button variant="ghost" size="sm">
                      Configure
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Available Integrations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {integrations.filter(i => i.status !== "connected").map((integration, index) => {
          const Icon = integration.icon;
          
          return (
            <motion.div
              key={integration.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="campaign-card h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <p className={`text-xs font-medium ${getCategoryColor(integration.category)}`}>
                          {integration.category}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(integration.status)}
                  </div>
                  <CardDescription className="mt-3">
                    {integration.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foregroup">Pricing:</span>
                    <Badge variant="outline">{integration.pricing}</Badge>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {integration.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1" 
                      variant={integration.status === "beta" ? "outline" : "default"}
                      disabled={integration.status === "beta"}
                    >
                      {integration.status === "beta" ? "Coming Soon" : "Connect"}
                    </Button>
                    <Button variant="outline" size="icon">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* OAuth Configuration */}
      <Card className="campaign-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            OAuth & Security
          </CardTitle>
          <CardDescription>
            Secure authentication and API key management
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-warning" />
              <span className="text-sm font-medium">Security Recommendation</span>
            </div>
            <p className="text-xs text-muted-foregroup">
              Always use OAuth authentication when available. Storing app passwords is insecure and not recommended.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium">OAuth Providers</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-success/5 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-success" />
                    <span className="text-sm">Gmail OAuth</span>
                  </div>
                  <Badge className="status-success">✓ Setup</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-muted-foregroup" />
                    <span className="text-sm">Outlook OAuth</span>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">API Keys</h3>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="api-key">Generic API Connector</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="api-key"
                      type="password"
                      placeholder="Enter API key..."
                      className="campaign-input"
                    />
                    <Button variant="outline">
                      <Key className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-warning">
                    ⚠️ API keys are stored encrypted but OAuth is preferred
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Webhooks */}
      <Card className="campaign-card">
        <CardHeader>
          <CardTitle>Webhook Management</CardTitle>
          <CardDescription>
            Configure webhook endpoints for real-time notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input
                id="webhook-url"
                placeholder="https://your-api.com/webhooks/campaigns"
                className="campaign-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="webhook-events">Events</Label>
              <Input
                id="webhook-events"
                placeholder="campaign.sent, email.bounced, etc."
                className="campaign-input"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">Test Webhook</Button>
            <Button>Save Configuration</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Integrations;