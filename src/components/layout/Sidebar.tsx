import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
// useTranslation removed for compatibility
import { 
  BarChart3, 
  Mail, 
  Users, 
  Settings, 
  Shield, 
  Send, 
  Plug,
  Home,
  ChevronRight,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const navigation = [
  { 
    name: "dashboard", 
    href: "/", 
    icon: Home,
    badge: null
  },
  { 
    name: "campaigns", 
    href: "/campaigns/new", 
    icon: Mail,
    badge: null
  },
  { 
    name: "leads", 
    href: "/leads", 
    icon: Users,
    badge: "12.5k"
  },
  { 
    name: "sending", 
    href: "/sending", 
    icon: Send,
    badge: "Live"
  },
  { 
    name: "integrations", 
    href: "/integrations", 
    icon: Plug,
    badge: null
  },
  { 
    name: "compliance", 
    href: "/compliance", 
    icon: Shield,
    badge: null
  },
  { 
    name: "settings", 
    href: "/settings", 
    icon: Settings,
    badge: null
  },
];

const Sidebar = () => {
  // const { t } = useTranslation();
  const location = useLocation();

  return (
    <motion.div 
      initial={{ x: -240 }}
      animate={{ x: 0 }}
      className="w-60 bg-card border-r border-border flex flex-col shadow-medium"
    >
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <motion.div 
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-lg">Campaign Studio</h1>
            <p className="text-xs text-muted-foreground">Lead Marketing Platform</p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative group",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )
              }
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                {item.badge && (
                  <Badge variant="secondary" className="text-xs py-0 px-2 h-5">
                    {item.badge}
                  </Badge>
                )}
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.3 }}
                  >
                    <ChevronRight className="w-3 h-3" />
                  </motion.div>
                )}
              </div>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Compliance Active</span>
          </div>
          <p className="text-xs text-muted-foreground">
            All campaigns follow ethical marketing practices
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;