
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAdminRoles } from '@/hooks/useAdminRoles';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, LogIn, LogOut, UserCircle, Home, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MobileNavigation: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdminRoles();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 transition-all duration-200">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-white">
          <div className="flex flex-col space-y-6 mt-12">
            <Link 
              to="/properties" 
              className="text-lg font-medium hover:text-estate-800 transition-colors duration-200"
            >
              Properties
            </Link>
            <Link 
              to="/furniture" 
              className="text-lg font-medium hover:text-estate-800 transition-colors duration-200"
            >
              Furniture
            </Link>
            <Link 
              to="/services" 
              className="text-lg font-medium hover:text-estate-800 transition-colors duration-200"
            >
              Services
            </Link>
            <Link 
              to="/about" 
              className="text-lg font-medium hover:text-estate-800 transition-colors duration-200"
            >
              About
            </Link>
            <Link 
              to="/#testimonials" 
              className="text-lg font-medium hover:text-estate-800 transition-colors duration-200"
            >
              Testimonials
            </Link>
            <Link 
              to="/contact" 
              className="text-lg font-medium hover:text-estate-800 transition-colors duration-200"
            >
              Contact
            </Link>
            
            {user ? (
              <div className="space-y-4 pt-4 border-t">
                <div className="px-1">
                  <div className="text-sm text-gray-500">Signed in as</div>
                  <div className="font-medium truncate">{user?.user_metadata?.name || user?.email}</div>
                </div>
                <Button 
                  className="w-full bg-estate-800 hover:bg-estate-700 text-white font-semibold shadow-md transition-all duration-200 hover:shadow-lg"
                  onClick={() => navigate("/dashboard")}
                >
                  <UserCircle className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
                <Button 
                  className="w-full bg-estate-800 hover:bg-estate-700 text-white font-semibold shadow-md transition-all duration-200 hover:shadow-lg"
                  onClick={() => navigate("/add-property")}
                >
                  <Home className="h-4 w-4 mr-2" />
                  Add Property
                </Button>
                {isAdmin() && (
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-all duration-200 hover:shadow-lg"
                    onClick={() => navigate("/admin")}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Admin Panel
                  </Button>
                )}
                <Button 
                  variant="outline"
                  className="w-full border-estate-800 text-estate-800 hover:bg-estate-50 transition-all duration-200"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="space-y-4 pt-4 border-t">
                <Button 
                  variant="outline"
                  className="w-full border-estate-800 text-estate-800 hover:bg-estate-50 transition-all duration-200"
                  onClick={() => navigate("/login")}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                <Button 
                  className="w-full bg-estate-800 hover:bg-estate-700 text-white font-semibold shadow-md transition-all duration-200 hover:shadow-lg"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
