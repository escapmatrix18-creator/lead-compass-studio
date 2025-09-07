import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
// Translation removed for compatibility
import { 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Mail,
  Building,
  MapPin,
  User,
  CheckCircle,
  AlertCircle,
  MoreHorizontal,
  Eye,
  Users
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock lead data
const mockLeads = [
  {
    id: 1,
    company: "TechCorp Solutions",
    city: "Mumbai",
    country: "India",
    contactName: "Priya Sharma",
    role: "HR Director",
    emails: ["priya.sharma@techcorp.in", "hr@techcorp.in"],
    verificationStatus: "verified",
    source: "Upload",
    consentStatus: "pending",
    lastVerified: "2024-01-15",
    notes: "Interested in Q2 hiring"
  },
  {
    id: 2,
    company: "Digital Marketing Hub",
    city: "Delhi",
    country: "India", 
    contactName: "Rahul Gupta",
    role: "CEO",
    emails: ["rahul@dmhub.com"],
    verificationStatus: "unverified",
    source: "API",
    consentStatus: "granted",
    lastVerified: "2024-01-10",
    notes: ""
  },
  {
    id: 3,
    company: "InnovateLabs",
    city: "Bangalore",
    country: "India",
    contactName: "Sarah Johnson",
    role: "CTO",
    emails: ["sarah.j@innovatelabs.in", "tech@innovatelabs.in"],
    verificationStatus: "verified",
    source: "Connector",
    consentStatus: "granted",
    lastVerified: "2024-01-12",
    notes: "Tech budget approved for Q1"
  },
  {
    id: 4,
    company: "GrowthScale Ventures",
    city: "Pune",
    country: "India",
    contactName: "Amit Patel",
    role: "Founder",
    emails: ["amit@growthscale.in"],
    verificationStatus: "bounced",
    source: "Upload",
    consentStatus: "pending",
    lastVerified: "2024-01-08",
    notes: "Invalid email - needs update"
  }
];

const LeadManager = () => {
  // const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCity, setFilterCity] = useState("all");

  const filteredLeads = useMemo(() => {
    return mockLeads.filter(lead => {
      const matchesSearch = 
        lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.city.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = filterStatus === "all" || lead.verificationStatus === filterStatus;
      const matchesCity = filterCity === "all" || lead.city === filterCity;
      
      return matchesSearch && matchesStatus && matchesCity;
    });
  }, [searchQuery, filterStatus, filterCity]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="status-success">Verified</Badge>;
      case "unverified":
        return <Badge variant="secondary">Unverified</Badge>;
      case "bounced":
        return <Badge className="status-error">Bounced</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getConsentBadge = (status: string) => {
    switch (status) {
      case "granted":
        return <Badge className="status-success">Granted</Badge>;
      case "pending":
        return <Badge className="status-warning">Pending</Badge>;
      case "denied":
        return <Badge className="status-error">Denied</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleSelectLead = (leadId: number) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const handleSelectAll = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(filteredLeads.map(lead => lead.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading">Leads</h1>
          <p className="text-muted-foreground mt-2">
            Manage your lead database with advanced filtering and verification
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import CSV
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="campaign-button">
            <Mail className="w-4 h-4 mr-2" />
            Create Campaign
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="campaign-card">
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search companies, contacts, or cities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 campaign-input"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="unverified">Unverified</SelectItem>
                  <SelectItem value="bounced">Bounced</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterCity} onValueChange={setFilterCity}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                  <SelectItem value="Bangalore">Bangalore</SelectItem>
                  <SelectItem value="Pune">Pune</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lead Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="campaign-card">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Total Leads</span>
            </div>
            <div className="text-2xl font-bold mt-2">{filteredLeads.length}</div>
          </CardContent>
        </Card>
        
        <Card className="campaign-card">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-success" />
              <span className="text-sm font-medium">Verified</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {filteredLeads.filter(l => l.verificationStatus === "verified").length}
            </div>
          </CardContent>
        </Card>
        
        <Card className="campaign-card">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-warning" />
              <span className="text-sm font-medium">Pending</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {filteredLeads.filter(l => l.verificationStatus === "unverified").length}
            </div>
          </CardContent>
        </Card>
        
        <Card className="campaign-card">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-destructive" />
              <span className="text-sm font-medium">Bounced</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {filteredLeads.filter(l => l.verificationStatus === "bounced").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bulk Actions */}
      {selectedLeads.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 p-4 bg-primary/5 border border-primary/20 rounded-lg"
        >
          <span className="text-sm font-medium">
            {selectedLeads.length} lead{selectedLeads.length > 1 ? 's' : ''} selected
          </span>
          <Button size="sm" variant="outline">
            Verify Emails
          </Button>
          <Button size="sm" variant="outline">
            Add to Campaign
          </Button>
          <Button size="sm" variant="outline">
            Export Selected
          </Button>
          <Button size="sm" variant="outline">
            Mark Consent
          </Button>
        </motion.div>
      )}

      {/* Leads Table */}
      <Card className="campaign-card">
        <CardHeader>
          <CardTitle>Lead Database</CardTitle>
          <CardDescription>
            {filteredLeads.length} leads found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedLeads.length === filteredLeads.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Emails</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Consent</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead, index) => (
                  <motion.tr
                    key={lead.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-muted/50"
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedLeads.includes(lead.id)}
                        onCheckedChange={() => handleSelectLead(lead.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Building className="w-4 h-4 text-muted-foregroup" />
                        <div>
                          <div className="font-medium">{lead.company}</div>
                          {lead.notes && (
                            <div className="text-xs text-muted-foregroup">{lead.notes}</div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-muted-foregroup" />
                        <div>
                          <div className="font-medium">{lead.contactName}</div>
                          <div className="text-xs text-muted-foregroup">{lead.role}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foregroup" />
                        <div>
                          <div>{lead.city}</div>
                          <div className="text-xs text-muted-foregroup">{lead.country}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {lead.emails.map((email, i) => (
                          <div key={i} className="text-sm flex items-center space-x-1">
                            <Mail className="w-3 h-3 text-muted-foregroup" />
                            <span>{email}</span>
                            {email.includes('@') && email.split('@')[0].includes('.') ? (
                              <Badge variant="outline" className="text-xs">Personal</Badge>
                            ) : (
                              <Badge variant="secondary" className="text-xs">Generic</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(lead.verificationStatus)}
                    </TableCell>
                    <TableCell>
                      {getConsentBadge(lead.consentStatus)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{lead.source}</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="w-4 h-4 mr-2" />
                            Verify Email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark Consent
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadManager;