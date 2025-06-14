import * as React from "react";
import { Menu, LogIn, LogOut, UserCircle, Home } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  // Determine if this is the home page (for styling)
  const isHomePage = location.pathname === "/";

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className={`${isHomePage ? 'absolute' : 'sticky top-0'} w-full z-50 ${!isHomePage ? 'bg-estate-800/95 backdrop-blur-sm border-b border-estate-700/20 py-4' : ''} transition-all duration-300`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16 lg:h-24">
          <Link 
            to="/" 
            className="text-2xl lg:text-3xl font-display text-white tracking-wide hover:opacity-90 transition-all duration-200 hover:scale-105"
          >
            Elite Real Estate
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/properties" 
              className="text-white hover:text-white/80 transition-all duration-200 font-medium relative group"
            >
              Properties
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </Link>
            {user && (
              <>
                <Link
                  to="/dashboard"
                  className="text-white hover:text-white/80 transition-all duration-200 font-medium relative group"
                >
                  Dashboard
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </Link>
                <Link
                  to="/add-property"
                  className="text-white hover:text-white/80 transition-all duration-200 font-medium relative group"
                >
                  Add Property
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </Link>
              </>
            )}
            <Link 
              to="/furniture" 
              className="text-white hover:text-white/80 transition-all duration-200 font-medium relative group"
            >
              Furniture
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-white hover:bg-transparent hover:text-white/80 focus:bg-transparent focus:text-white/80 data-[active]:bg-transparent data-[state=open]:bg-transparent p-0 font-medium">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[250px] bg-white text-black rounded-lg shadow-lg">
                      <ListItem href="/services" title="Real Estate Services">
                        Buy, sell, and manage properties.
                      </ListItem>
                      <ListItem href="/furniture" title="Furniture Services">
                        Furnish your dream home.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Link 
              to="/about" 
              className="text-white hover:text-white/80 transition-all duration-200 font-medium relative group"
            >
              About
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </Link>
            <Link 
              to="/#testimonials" 
              className="text-white hover:text-white/80 transition-all duration-200 font-medium relative group"
            >
              Testimonials
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </Link>
            <Link 
              to="/contact" 
              className="text-white hover:text-white/80 transition-all duration-200 font-medium relative group"
            >
              Contact
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative rounded-full overflow-hidden bg-white/10 hover:bg-white/20 transition-all duration-200 hover:scale-110">
                    <UserCircle className="h-5 w-5 text-white" />
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
                    className="hover:bg-estate-50 cursor-pointer transition-colors"
                  >
                    <UserCircle className="h-4 w-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleSignOut}
                    className="hover:bg-estate-50 cursor-pointer transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 transition-all duration-200 hover:scale-105"
                  onClick={() => navigate("/login")}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                <Button 
                  variant="outline" 
                  className="text-black border-white bg-white hover:bg-white/90 font-semibold shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
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
        </div>
      </div>
    </nav>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & { href: string }
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-gray-900">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Navbar;
