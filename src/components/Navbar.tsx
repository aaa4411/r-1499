
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavbarBrand } from "./navbar/NavbarBrand";
import { DesktopNavigation } from "./navbar/DesktopNavigation";
import { MobileNavigation } from "./navbar/MobileNavigation";
import { UserMenu } from "./navbar/UserMenu";
import RealtimeNotifications from "./realtime/RealtimeNotifications";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <NavbarBrand isHomePage={location.pathname === "/"} />
          
          <DesktopNavigation />
          
          <div className="flex items-center gap-4">
            {/* Real-time notifications for authenticated users */}
            {user && <RealtimeNotifications />}
            
            <UserMenu />
            
            <MobileNavigation />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
