
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAdminRoles } from '@/hooks/useAdminRoles';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogIn, LogOut, UserCircle, Shield } from 'lucide-react';

export const UserMenu: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdminRoles();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (!user) {
    return (
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          className="text-gray-900 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 hover:scale-105"
          onClick={() => navigate("/login")}
        >
          <LogIn className="h-4 w-4 mr-2" />
          Sign In
        </Button>
        <Button 
          variant="outline" 
          className="text-white bg-gray-900 border-gray-900 hover:bg-gray-800 hover:border-gray-800 font-semibold shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg"
          onClick={() => navigate("/register")}
        >
          Sign Up
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full overflow-hidden bg-gray-100 hover:bg-gray-200 transition-all duration-200 hover:scale-110">
          <UserCircle className="h-5 w-5 text-gray-900" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white border shadow-lg z-50">
        <DropdownMenuLabel>
          <div className="font-normal text-sm text-gray-500">Signed in as</div>
          <div className="font-medium truncate">{user?.user_metadata?.name || user?.email}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => navigate("/dashboard")}
          className="hover:bg-gray-50 cursor-pointer transition-colors"
        >
          <UserCircle className="h-4 w-4 mr-2" />
          Dashboard
        </DropdownMenuItem>
        {isAdmin() && (
          <DropdownMenuItem 
            onClick={() => navigate("/admin")}
            className="hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <Shield className="h-4 w-4 mr-2" />
            Admin Panel
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="hover:bg-gray-50 cursor-pointer transition-colors"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
