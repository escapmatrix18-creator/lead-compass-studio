import React from "react";
import { motion } from "framer-motion";
// Translation removed for compatibility
import { 
  Settings as SettingsIcon,
  User,
  Mail,
  Shield,
  Bell,
  Globe,
  Palette,
  Download,
  Upload,
  Trash2
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  // const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading">Settings</h1>
          <p className="text-muted-foregroup mt-2">
            Manage your account, preferences, and platform configuration
          </p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="campaign-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal information and account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input
                    id="first-name"
                    placeholder="Enter your first name"
                    defaultValue="Marketing"
                    className="campaign-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input
                    id="last-name"
                    placeholder="Enter your last name"
                    defaultValue="Team"
                    className="campaign-input"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  defaultValue="team@company.com"
                  className="campaign-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  placeholder="Enter your company name"
                  defaultValue="Your Company"
                  className="campaign-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  placeholder="Enter your role"
                  defaultValue="Marketing Manager"
                  className="campaign-input"
                />
              </div>
              
              <Separator />
              
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="campaign-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose how you want to be notified about campaign activity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Campaign Completion</h4>
                    <p className="text-sm text-muted-foregroup">Get notified when campaigns finish</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">High Bounce Rate</h4>
                    <p className="text-sm text-muted-foregroup">Alert when bounce rate exceeds threshold</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Spam Complaints</h4>
                    <p className="text-sm text-muted-foregroup">Immediate alerts for spam complaints</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Daily Summary</h4>
                    <p className="text-sm text-muted-foregroup">Daily email with campaign performance</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Weekly Reports</h4>
                    <p className="text-sm text-muted-foregroup">Weekly analytics and insights</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="notification-email">Notification Email</Label>
                <Input
                  id="notification-email"
                  type="email"
                  placeholder="notifications@company.com"
                  defaultValue="team@company.com"
                  className="campaign-input"
                />
              </div>
              
              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="campaign-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage your account security and authentication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foregroup">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">API Access</h4>
                    <p className="text-sm text-muted-foregroup">Generate API keys for integrations</p>
                  </div>
                  <Button variant="outline">Manage Keys</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Active Sessions</h4>
                    <p className="text-sm text-muted-foregroup">View and manage active sessions</p>
                  </div>
                  <Button variant="outline">View Sessions</Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Change Password</h3>
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    className="campaign-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    className="campaign-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    className="campaign-input"
                  />
                </div>
                <Button>Update Password</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card className="campaign-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="w-5 h-5 mr-2" />
                App Preferences
              </CardTitle>
              <CardDescription>
                Customize your Campaign Studio experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Dark Mode</h4>
                    <p className="text-sm text-muted-foregroup">Toggle dark theme</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Compact View</h4>
                    <p className="text-sm text-muted-foregroup">Show more data in less space</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto-save Drafts</h4>
                    <p className="text-sm text-muted-foregroup">Automatically save campaign drafts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <select id="language" className="w-full campaign-input">
                    <option value="en">English</option>
                    <option value="hinglish">Hinglish</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select id="timezone" className="w-full campaign-input">
                    <option value="IST">IST (India Standard Time)</option>
                    <option value="PST">PST (Pacific Standard Time)</option>
                    <option value="EST">EST (Eastern Standard Time)</option>
                  </select>
                </div>
              </div>
              
              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Tab */}
        <TabsContent value="data" className="space-y-6">
          <Card className="campaign-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="w-5 h-5 mr-2" />
                Data Management
              </CardTitle>
              <CardDescription>
                Import, export, and manage your campaign data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Export All Data</h4>
                    <p className="text-sm text-muted-foregroup">Download all campaigns, leads, and analytics</p>
                  </div>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Import Campaigns</h4>
                    <p className="text-sm text-muted-foregroup">Import campaigns from other platforms</p>
                  </div>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Import
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Data Retention</h4>
                    <p className="text-sm text-muted-foregroup">Configure how long to keep campaign data</p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <h4 className="font-medium text-destructive mb-2">Danger Zone</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Delete All Campaigns</h5>
                      <p className="text-sm text-muted-foregroup">Permanently remove all campaign data</p>
                    </div>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Delete Account</h5>
                      <p className="text-sm text-muted-foregroup">Permanently delete your account and all data</p>
                    </div>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;