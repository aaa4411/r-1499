
import React from "react";
import { useLocation } from "react-router-dom";
import { NavbarBrand } from "./navbar/NavbarBrand";
import { DesktopNavigation } from "./navbar/DesktopNavigation";
import { MobileNavigation } from "./navbar/MobileNavigation";

const Navbar = () => {
  const location = useLocation();
  
  // Determine if this is the home page (for styling)
  const isHomePage = location.pathname === "/";

  return (
    <nav className={`${isHomePage ? 'absolute' : 'sticky top-0'} w-full z-50 ${!isHomePage ? 'bg-estate-800/95 backdrop-blur-sm border-b border-estate-700/20 py-4' : ''} transition-all duration-300`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16 lg:h-24">
          <NavbarBrand isHomePage={isHomePage} />
          <DesktopNavigation />
          <MobileNavigation />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
