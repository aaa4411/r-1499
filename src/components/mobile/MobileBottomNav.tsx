
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, Heart, User, Plus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

const MobileBottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/properties", icon: Search, label: "Properties" },
    { path: "/add-property", icon: Plus, label: "Add", requiresAuth: true },
    { path: "/dashboard", icon: Heart, label: "Favorites", requiresAuth: true },
    { path: user ? "/dashboard" : "/login", icon: User, label: user ? "Profile" : "Sign In" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const filteredNavItems = navItems.filter(item => !item.requiresAuth || user);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 safe-area-pb">
      <div className="flex items-center justify-around px-2 py-2">
        {filteredNavItems.map((item) => (
          <Button
            key={item.path}
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center gap-1 h-14 px-3 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'text-estate-600 bg-estate-50'
                : 'text-gray-500 hover:text-estate-600 hover:bg-estate-50'
            }`}
            onClick={() => navigate(item.path)}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MobileBottomNav;
