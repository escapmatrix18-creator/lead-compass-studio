import { motion } from "framer-motion";
// import { useTranslation } from "react-i18next";
import { 
  BarChart3, 
  Users, 
  Mail, 
  TrendingUp, 
  AlertTriangle,
  Activity,
  Plus,
  ArrowUpRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  //const { t } = useTranslation();

  const kpiCards = [
    {
      title: "Total Leads",
      value: "12,547",
      change: "+12.3%",
      icon: Users,
      trend: "up"
    },
    {
      title: "Active Campaigns",
      value: "8",
      change: "+2",
      icon: Mail,
      trend: "up"
    },
    {
      title: "Open Rate",
      value: "24.8%",
      change: "+3.2%",
      icon: BarChart3,
      trend: "up"
    },
    {
      title: "Bounce Rate",
      value: "2.1%",
      change: "-0.5%",
      icon: AlertTriangle,
      trend: "down"
    }
  ];

  const recentCampaigns = [
    {
      name: "Mumbai Tech Startups",
      status: "Active",
      leads: 2456,
      openRate: 28.5,
      progress: 75
    },
    {
      name: "Delhi Enterprise Sales",
      status: "Paused",
      leads: 1823,
      openRate: 22.1,
      progress: 45
    },
    {
      name: "Bangalore SaaS Companies",
      status: "Draft",
      leads: 3241,
      openRate: 0,
      progress: 0
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Monitor your lead campaigns and performance metrics
          </p>
        </div>
        <Button className="campaign-button">
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="campaign-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {kpi.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpi.value}</div>
                  <div className="flex items-center text-sm mt-1">
                    <ArrowUpRight className={`w-3 h-3 mr-1 ${
                      kpi.trend === 'up' ? 'text-success' : 'text-destructive'
                    }`} />
                    <span className={`font-medium ${
                      kpi.trend === 'up' ? 'text-success' : 'text-destructive'
                    }`}>
                      {kpi.change}
                    </span>
                    <span className="text-muted-foregroup ml-1">vs last month</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="campaign-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your latest campaign performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentCampaigns.map((campaign, index) => (
              <motion.div
                key={campaign.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{campaign.name}</h4>
                    <Badge 
                      variant={campaign.status === 'Active' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {campaign.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foregroup">
                    <span>{campaign.leads.toLocaleString()} leads</span>
                    <span>{campaign.openRate}% open rate</span>
                  </div>
                  <Progress value={campaign.progress} className="mt-2" />
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="campaign-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Plus className="w-4 h-4 mr-2" />
              Create New Campaign
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="w-4 h-4 mr-2" />
              Import Leads
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="w-4 h-4 mr-2" />
              Performance Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;