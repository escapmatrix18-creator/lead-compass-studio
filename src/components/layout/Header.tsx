import { motion } from "framer-motion";
// useTranslation removed for compatibility
import { Bell, Search, User, Moon, Sun, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useThemeStore } from "@/store/themeStore";

const Header = () => {
  // const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useThemeStore();

  const changeLanguage = (lng: string) => {
    // i18n.changeLanguage(lng);
  };

  return (
    <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between shadow-soft">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search campaigns, leads, or templates..."
            className="pl-10 campaign-input border-0 bg-muted/30"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Globe className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Language</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => changeLanguage('en')}>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeLanguage('hinglish')}>
              Hinglish
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="h-8 w-8 p-0"
        >
          {theme === 'light' ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4" />
          )}
        </Button>

        {/* Notifications */}
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Bell className="w-4 h-4" />
          </Button>
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs"
          >
            3
          </Badge>
        </motion.div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Marketing Team</p>
                <p className="text-xs leading-none text-muted-foreground">
                  team@company.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              Team Management  
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;