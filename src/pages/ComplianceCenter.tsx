import React from "react";
import { motion } from "framer-motion";
// Translation removed for compatibility
import { 
  Shield,
  CheckCircle,
  AlertTriangle,
  FileText,
  Mail,
  Users,
  Settings,
  Eye,
  Download,
  Lock
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const ComplianceCenter = () => {
  // const { t } = useTranslation();

  const complianceItems = [
    {
      title: "Unsubscribe Links",
      description: "Automatic unsubscribe links in all emails",
      status: "active",
      required: true,
      icon: Mail
    },
    {
      title: "Double Opt-in",
      description: "Email verification before adding to lists",
      status: "active", 
      required: false,
      icon: CheckCircle
    },
    {
      title: "Bounce Monitoring",
      description: "Automatic pause on high bounce rates (>5%)",
      status: "active",
      required: true,
      icon: AlertTriangle
    },
    {
      title: "Spam Complaint Tracking",
      description: "Monitor and pause on complaint threshold",
      status: "active",
      required: true,
      icon: Shield
    },
    {
      title: "Suppression Lists",
      description: "Maintain do-not-contact lists",
      status: "active",
      required: true,
      icon: Users
    },
    {
      title: "Content Filtering",
      description: "Scan for spam-trigger words",
      status: "warning",
      required: false,
      icon: FileText
    }
  ];

  const auditLog = [
    {
      timestamp: "2024-01-15 10:30",
      action: "Campaign paused due to bounce rate (6.2%)",
      campaign: "Mumbai Tech Startups",
      type: "auto"
    },
    {
      timestamp: "2024-01-15 09:15",
      action: "Suppression list updated (+23 emails)",
      campaign: "Global",
      type: "manual"
    },
    {
      timestamp: "2024-01-14 16:45",
      action: "Double opt-in enabled for new leads",
      campaign: "Delhi Enterprise",
      type: "manual"
    },
    {
      timestamp: "2024-01-14 14:20",
      action: "Unsubscribe processed for user@company.com",
      campaign: "Bangalore SaaS",
      type: "auto"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="status-success">Active</Badge>;
      case "warning":
        return <Badge className="status-warning">Warning</Badge>;
      case "inactive":
        return <Badge className="status-error">Inactive</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading">Compliance</h1>
          <p className="text-muted-foregroup mt-2">
            Ensure ethical marketing practices and regulatory compliance
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="campaign-button">
            <FileText className="w-4 h-4 mr-2" />
            Policy Review
          </Button>
        </div>
      </div>

      {/* Compliance Score */}
      <Card className="campaign-card border-success/20">
        <CardHeader>
          <CardTitle className="flex items-center text-success">
            <Shield className="w-5 h-5 mr-2" />
            Compliance Score
          </CardTitle>
          <CardDescription>
            Your current ethical marketing compliance rating
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-success mb-2">92%</div>
              <Badge className="status-success">Excellent</Badge>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Email Authentication</span>
                <span>100%</span>
              </div>
              <Progress value={100} className="h-2" />
              
              <div className="flex justify-between text-sm">
                <span>Consent Management</span>
                <span>95%</span>
              </div>
              <Progress value={95} className="h-2" />
              
              <div className="flex justify-between text-sm">
                <span>Content Guidelines</span>
                <span>80%</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="campaign-card">
          <CardHeader>
            <CardTitle>Compliance Checklist</CardTitle>
            <CardDescription>
              Required and recommended compliance features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {complianceItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4 text-muted-foregroup" />
                    <div>
                      <h4 className="font-medium flex items-center space-x-2">
                        <span>{item.title}</span>
                        {item.required && (
                          <Badge variant="outline" className="text-xs">Required</Badge>
                        )}
                      </h4>
                      <p className="text-xs text-muted-foregroup">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(item.status)}
                    <Switch 
                      checked={item.status === "active"} 
                      disabled={item.required}
                    />
                  </div>
                </motion.div>
              );
            })}
          </CardContent>
        </Card>

        {/* Policy Editor */}
        <Card className="campaign-card">
          <CardHeader>
            <CardTitle>Ethical Data Collection Policy</CardTitle>
            <CardDescription>
              Customize your compliance and privacy policy
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="policy">Privacy Policy Content</Label>
              <Textarea
                id="policy"
                placeholder="Enter your data collection and privacy policy..."
                className="min-h-[150px] campaign-input"
                defaultValue="We collect business contact information for legitimate marketing purposes only. All recipients can unsubscribe at any time. We respect all privacy regulations including GDPR, CAN-SPAM, and local data protection laws."
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="gdpr">GDPR Compliance</Label>
                <Switch id="gdpr" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="canspam">CAN-SPAM Compliance</Label>
                <Switch id="canspam" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="consent-tracking">Consent Tracking</Label>
                <Switch id="consent-tracking" defaultChecked />
              </div>
            </div>
            
            <Separator />
            
            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button className="flex-1">
                <Settings className="w-4 h-4 mr-2" />
                Update Policy
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audit Trail */}
      <Card className="campaign-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Compliance Audit Trail
          </CardTitle>
          <CardDescription>
            Recent compliance actions and system responses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {auditLog.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    entry.type === "auto" ? "bg-primary" : "bg-success"
                  }`} />
                  <div>
                    <p className="text-sm font-medium">{entry.action}</p>
                    <p className="text-xs text-muted-foregroup">
                      Campaign: {entry.campaign} • {entry.timestamp}
                    </p>
                  </div>
                </div>
                <Badge variant={entry.type === "auto" ? "secondary" : "outline"}>
                  {entry.type === "auto" ? "Automatic" : "Manual"}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Legal Notice */}
      <Card className="campaign-card border-warning/20">
        <CardHeader>
          <CardTitle className="flex items-center text-warning">
            <Lock className="w-5 h-5 mr-2" />
            Legal & Compliance Notice
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm space-y-2">
            <p><strong>Important:</strong> This platform is designed for ethical B2B marketing only.</p>
            <p>• Always obtain proper consent before sending marketing emails</p>
            <p>• Respect all unsubscribe requests immediately</p>
            <p>• Use crawler/scraping features only with explicit permission</p>
            <p>• Monitor bounce and complaint rates regularly</p>
            <p>• Maintain accurate suppression lists</p>
          </div>
          
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 mt-4">
            <p className="text-xs text-warning">
              <strong>Disclaimer:</strong> Users are responsible for compliance with all applicable laws and regulations. 
              Consult with legal counsel for specific compliance requirements in your jurisdiction.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceCenter;