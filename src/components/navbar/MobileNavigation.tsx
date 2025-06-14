
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAdminRoles } from '@/hooks/useAdminRoles';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Badge } from '@/components/ui/badge';
import { Menu, LogIn, LogOut, UserCircle, Home, Shield, Heart, Search, Plus, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import RealtimeNotifications from '../realtime/RealtimeNotifications';

export const MobileNavigation: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdminRoles();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    setOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  const mainNavItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/properties", label: "Properties", icon: Search },
    { path: "/furniture", label: "Furniture", icon: UserCircle },
    { path: "/services", label: "Services", icon: Shield },
    { path: "/about", label: "About", icon: UserCircle },
    { path: "/contact", label: "Contact", icon: UserCircle },
  ];

  return (
    <div className="md:hidden">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 transition-all duration-200">
            <Menu className="h-6 w-6" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[85vh]">
          <DrawerHeader className="text-left">
            <DrawerTitle className="text-xl font-display">Menu</DrawerTitle>
          </DrawerHeader>
          
          <div className="flex flex-col h-full px-4 pb-6">
            {/* User Info Section */}
            {user && (
              <div className="bg-estate-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-estate-200 rounded-full flex items-center justify-center">
                    <UserCircle className="h-6 w-6 text-estate-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-estate-800 truncate">
                      {user?.user_metadata?.name || user?.email}
                    </div>
                    <div className="text-sm text-estate-500">
                      {isAdmin() && <Badge variant="secondary" className="text-xs">Admin</Badge>}
                    </div>
                  </div>
                  <RealtimeNotifications />
                </div>
              </div>
            )}

            {/* Main Navigation */}
            <div className="space-y-2 mb-6">
              {mainNavItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    isActive(item.path)
                      ? 'bg-estate-100 text-estate-800 font-medium'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Quick Actions */}
            {user && (
              <div className="space-y-3 mb-6">
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Quick Actions
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="h-16 flex-col gap-2"
                    onClick={() => handleNavigation("/add-property")}
                  >
                    <Plus className="h-5 w-5" />
                    <span className="text-xs">Add Property</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-16 flex-col gap-2"
                    onClick={() => handleNavigation("/dashboard")}
                  >
                    <UserCircle className="h-5 w-5" />
                    <span className="text-xs">Dashboard</span>
                  </Button>
                </div>
              </div>
            )}

            {/* Authentication Section */}
            <div className="mt-auto space-y-3">
              {user ? (
                <div className="space-y-3">
                  {isAdmin() && (
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => handleNavigation("/admin")}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Admin Panel
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="w-full border-red-200 text-red-600 hover:bg-red-50"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleNavigation("/login")}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                  <Button
                    className="w-full bg-estate-800 hover:bg-estate-700"
                    onClick={() => handleNavigation("/register")}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
