import React from "react";
import { motion } from "framer-motion";
// Translation removed for compatibility
import { 
  Send,
  Play,
  Pause,
  Square,
  BarChart3,
  Mail,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Eye
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const SendingMonitor = () => {
  // const { t } = useTranslation();

  const campaignStats = [
    {
      name: "Mumbai Tech Startups",
      status: "sending",
      progress: 75,
      sent: 1847,
      total: 2456,
      openRate: 28.5,
      bounceRate: 1.2,
      clickRate: 4.8,
      startTime: "2024-01-15 09:00",
      estimatedCompletion: "2024-01-15 16:30"
    },
    {
      name: "Delhi Enterprise Sales", 
      status: "paused",
      progress: 45,
      sent: 821,
      total: 1823,
      openRate: 22.1,
      bounceRate: 2.8,
      clickRate: 3.2,
      startTime: "2024-01-14 10:00",
      estimatedCompletion: "2024-01-16 14:00"
    },
    {
      name: "Bangalore SaaS Companies",
      status: "completed",
      progress: 100,
      sent: 3241,
      total: 3241,
      openRate: 31.2,
      bounceRate: 0.9,
      clickRate: 6.1,
      startTime: "2024-01-13 08:00",
      estimatedCompletion: "2024-01-13 18:45"
    },
    {
      name: "Chennai Healthcare",
      status: "queued",
      progress: 0,
      sent: 0,
      total: 1456,
      openRate: 0,
      bounceRate: 0,
      clickRate: 0,
      startTime: "Scheduled for 2024-01-16 09:00",
      estimatedCompletion: "2024-01-16 17:00"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sending":
        return <Badge className="status-success">🟢 Sending</Badge>;
      case "paused":
        return <Badge className="status-warning">⏸️ Paused</Badge>;
      case "completed":
        return <Badge variant="secondary">✅ Completed</Badge>;
      case "queued":
        return <Badge variant="outline">⏳ Queued</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sending":
        return <Send className="w-4 h-4 text-success" />;
      case "paused":
        return <Pause className="w-4 h-4 text-warning" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-muted-foregroup" />;
      case "queued":
        return <Clock className="w-4 h-4 text-muted-foregroup" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading">Sending Monitor</h1>
          <p className="text-muted-foregroup mt-2">
            Monitor live campaign sending and performance metrics
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
          <Button className="campaign-button">
            <Play className="w-4 h-4 mr-2" />
            Resume All
          </Button>
        </div>
      </div>

      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="campaign-card">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Send className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Emails Sent Today</span>
            </div>
            <div className="text-2xl font-bold mt-2">2,668</div>
            <div className="flex items-center text-sm mt-1">
              <TrendingUp className="w-3 h-3 mr-1 text-success" />
              <span className="text-success font-medium">+12%</span>
              <span className="text-muted-foregroup ml-1">vs yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="campaign-card">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Open Rate</span>
            </div>
            <div className="text-2xl font-bold mt-2">27.3%</div>
            <div className="flex items-center text-sm mt-1">
              <TrendingUp className="w-3 h-3 mr-1 text-success" />
              <span className="text-success font-medium">+3.2%</span>
              <span className="text-muted-foregroup ml-1">vs last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="campaign-card">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-warning" />
              <span className="text-sm font-medium">Bounce Rate</span>
            </div>
            <div className="text-2xl font-bold mt-2">1.6%</div>
            <div className="flex items-center text-sm mt-1">
              <span className="text-success font-medium">-0.3%</span>
              <span className="text-muted-foregroup ml-1">within limits</span>
            </div>
          </CardContent>
        </Card>

        <Card className="campaign-card">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-muted-foregroup" />
              <span className="text-sm font-medium">Active Campaigns</span>
            </div>
            <div className="text-2xl font-bold mt-2">3</div>
            <div className="flex items-center text-sm mt-1">
              <span className="text-muted-foregroup">1 queued</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Campaign Status */}
      <Card className="campaign-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Send className="w-5 h-5 mr-2" />
            Campaign Status
          </CardTitle>
          <CardDescription>
            Real-time sending progress and controls
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {campaignStats.map((campaign, index) => (
            <motion.div
              key={campaign.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 border rounded-lg bg-muted/30"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(campaign.status)}
                  <div>
                    <h3 className="font-medium">{campaign.name}</h3>
                    <p className="text-xs text-muted-foregroup">
                      Started: {campaign.startTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {getStatusBadge(campaign.status)}
                  <div className="flex space-x-1">
                    {campaign.status === "sending" && (
                      <Button size="sm" variant="outline">
                        <Pause className="w-3 h-3" />
                      </Button>
                    )}
                    {campaign.status === "paused" && (
                      <Button size="sm" variant="outline">
                        <Play className="w-3 h-3" />
                      </Button>
                    )}
                    {campaign.status === "queued" && (
                      <Button size="sm" variant="outline">
                        <Play className="w-3 h-3" />
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Square className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Progress: {campaign.sent.toLocaleString()} / {campaign.total.toLocaleString()}</span>
                  <span>{campaign.progress}%</span>
                </div>
                <Progress value={campaign.progress} className="h-2" />
                {campaign.status === "sending" && (
                  <p className="text-xs text-muted-foregroup">
                    Est. completion: {campaign.estimatedCompletion}
                  </p>
                )}
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-1">
                  <div className="text-lg font-bold text-primary">{campaign.openRate}%</div>
                  <div className="text-xs text-muted-foreground">Open Rate</div>
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-bold text-success">{campaign.clickRate}%</div>
                  <div className="text-xs text-muted-foregroup">Click Rate</div>
                </div>
                <div className="space-y-1">
                  <div className={`text-lg font-bold ${
                    campaign.bounceRate > 3 ? 'text-destructive' : 'text-muted-foregroup'
                  }`}>
                    {campaign.bounceRate}%
                  </div>
                  <div className="text-xs text-muted-foregroup">Bounce Rate</div>
                </div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Delivery Heatmap Placeholder */}
      <Card className="campaign-card">
        <CardHeader>
          <CardTitle>Delivery Heatmap</CardTitle>
          <CardDescription>
            Email delivery performance by time and geography
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-surface rounded-lg flex items-center justify-center">
            <div className="text-center space-y-2">
              <BarChart3 className="w-12 h-12 text-muted-foregroup mx-auto" />
              <p className="text-muted-foregroup">Interactive delivery heatmap</p>
              <p className="text-xs text-muted-foregroup">Coming soon with advanced analytics</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SendingMonitor;