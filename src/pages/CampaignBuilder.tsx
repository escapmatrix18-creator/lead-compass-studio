import { useState } from "react";
import { motion } from "framer-motion";
// Translation removed for compatibility
import { 
  Save, 
  Send, 
  Upload, 
  MapPin, 
  Building, 
  Mail,
  Calendar,
  Users,
  Eye,
  Settings
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const CampaignBuilder = () => {
  // const { t } = useTranslation();
  const [campaignData, setCampaignData] = useState({
    name: "",
    country: "",
    city: "",
    industry: "",
    companySize: "",
    subject: "",
    template: "",
  });

  const industries = [
    "Technology", "Healthcare", "Finance", "Manufacturing", 
    "Retail", "Education", "Real Estate", "Consulting"
  ];

  const companySizes = [
    "1-10 employees", "11-50 employees", "51-200 employees", 
    "201-1000 employees", "1000+ employees"
  ];

  const countries = ["India", "United States", "United Kingdom", "Canada", "Australia"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading">Create Campaign</h1>
          <p className="text-muted-foreground mt-2">
            Build targeted lead campaigns with compliance-first approach
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline">
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button className="campaign-button">
            <Send className="w-4 h-4 mr-2" />
            Launch Campaign
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Campaign Builder */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="targeting" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="targeting">Targeting</TabsTrigger>
              <TabsTrigger value="template">Template</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
            </TabsList>

            {/* Targeting Tab */}
            <TabsContent value="targeting" className="space-y-4">
              <Card className="campaign-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Target Audience
                  </CardTitle>
                  <CardDescription>
                    Define your ideal lead criteria
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="campaign-name">Campaign Name</Label>
                      <Input
                        id="campaign-name"
                        placeholder="e.g., Mumbai Tech Startups Q1"
                        value={campaignData.name}
                        onChange={(e) => setCampaignData({...campaignData, name: e.target.value})}
                        className="campaign-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Target Country</Label>
                      <Select value={campaignData.country} onValueChange={(value) => setCampaignData({...campaignData, country: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>{country}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Target City</Label>
                      <Input
                        id="city"
                        placeholder="e.g., Mumbai, Delhi, Bangalore"
                        value={campaignData.city}
                        onChange={(e) => setCampaignData({...campaignData, city: e.target.value})}
                        className="campaign-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select value={campaignData.industry} onValueChange={(value) => setCampaignData({...campaignData, industry: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((industry) => (
                            <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company-size">Company Size</Label>
                    <Select value={campaignData.companySize} onValueChange={(value) => setCampaignData({...campaignData, companySize: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        {companySizes.map((size) => (
                          <SelectItem key={size} value={size}>{size}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Lead Source */}
              <Card className="campaign-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="w-5 h-5 mr-2" />
                    Lead Source
                  </CardTitle>
                  <CardDescription>
                    Choose how to source your leads
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div 
                      className="p-4 border-2 border-dashed border-primary/30 rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <h3 className="font-medium">Upload CSV/Excel</h3>
                        <p className="text-sm text-muted-foregroup">Import your existing lead lists</p>
                        <Badge variant="secondary" className="mt-2">Recommended</Badge>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="p-4 border-2 border-dashed border-muted-foreground/30 rounded-lg cursor-pointer hover:border-muted-foreground/50 transition-colors opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-center">
                        <Building className="w-8 h-8 mx-auto mb-2 text-muted-foregroup" />
                        <h3 className="font-medium">API Connector</h3>
                        <p className="text-sm text-muted-foregroup">Connect to verified data sources</p>
                        <Badge variant="outline" className="mt-2">Coming Soon</Badge>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Template Tab */}
            <TabsContent value="template" className="space-y-4">
              <Card className="campaign-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Email Template
                  </CardTitle>
                  <CardDescription>
                    Craft your message with personalization tokens
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Email Subject</Label>
                    <Input
                      id="subject"
                      placeholder="e.g., Quick question about {{company}}'s growth plans"
                      value={campaignData.subject}
                      onChange={(e) => setCampaignData({...campaignData, subject: e.target.value})}
                      className="campaign-input"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="template">Email Body</Label>
                    <Textarea
                      id="template"
                      placeholder={`Hi {{first_name}},

I noticed {{company}} is growing rapidly in {{city}}. I wanted to reach out about...

Available tokens: {{first_name}}, {{last_name}}, {{company}}, {{city}}, {{role}}`}
                      value={campaignData.template}
                      onChange={(e) => setCampaignData({...campaignData, template: e.target.value})}
                      className="min-h-[200px] campaign-input"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{"{{first_name}}"}</Badge>
                    <Badge variant="outline">{"{{last_name}}"}</Badge>
                    <Badge variant="outline">{"{{company}}"}</Badge>
                    <Badge variant="outline">{"{{city}}"}</Badge>
                    <Badge variant="outline">{"{{role}}"}</Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Schedule Tab */}
            <TabsContent value="schedule" className="space-y-4">
              <Card className="campaign-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule
                  </CardTitle>
                  <CardDescription>
                    Configure sending behavior and limits
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Settings className="w-4 h-4 text-warning" />
                      <span className="text-sm font-medium">Compliance Protection Active</span>
                    </div>
                    <p className="text-xs text-muted-foregroup mt-1">
                      Daily sending limits and bounce monitoring automatically enabled
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Daily Send Limit</Label>
                      <Select defaultValue="50">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="25">25 emails/day</SelectItem>
                          <SelectItem value="50">50 emails/day</SelectItem>
                          <SelectItem value="100">100 emails/day</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Time Zone</Label>
                      <Select defaultValue="IST">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="IST">IST (India)</SelectItem>
                          <SelectItem value="PST">PST (US West)</SelectItem>
                          <SelectItem value="EST">EST (US East)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Compliance Tab */}
            <TabsContent value="compliance" className="space-y-4">
              <Card className="campaign-card border-success/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-success">
                    <Users className="w-5 h-5 mr-2" />
                    Ethics-First Campaign
                  </CardTitle>
                  <CardDescription>
                    All campaigns follow ethical marketing practices
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-success/5 rounded-lg">
                      <span className="text-sm">Unsubscribe link required</span>
                      <Badge variant="outline" className="text-success border-success">✓ Auto-added</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-success/5 rounded-lg">
                      <span className="text-sm">Bounce rate monitoring</span>
                      <Badge variant="outline" className="text-success border-success">✓ Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-success/5 rounded-lg">
                      <span className="text-sm">Spam complaint tracking</span>
                      <Badge variant="outline" className="text-success border-success">✓ Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-success/5 rounded-lg">
                      <span className="text-sm">Suppression list check</span>
                      <Badge variant="outline" className="text-success border-success">✓ Required</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
        </div>

        {/* Campaign Preview */}
        <div className="space-y-6">
          <Card className="campaign-card">
            <CardHeader>
              <CardTitle>Campaign Preview</CardTitle>
              <CardDescription>
                Real-time preview of your campaign
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="text-sm space-y-2">
                  <div><strong>Name:</strong> {campaignData.name || "Untitled Campaign"}</div>
                  <div><strong>Target:</strong> {campaignData.city || "Any City"}, {campaignData.country || "Any Country"}</div>
                  <div><strong>Industry:</strong> {campaignData.industry || "All Industries"}</div>
                  <div><strong>Company Size:</strong> {campaignData.companySize || "All Sizes"}</div>
                </div>
              </div>
              
              {campaignData.subject && (
                <div className="p-4 bg-card border rounded-lg">
                  <div className="text-xs text-muted-foregroup mb-1">Subject Line:</div>
                  <div className="font-medium">{campaignData.subject}</div>
                </div>
              )}
              
              <Separator />
              
              <div className="text-center space-y-2">
                <Badge variant="secondary">Estimated Reach</Badge>
                <div className="text-2xl font-bold">2,400</div>
                <div className="text-sm text-muted-foregroup">potential leads</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CampaignBuilder;