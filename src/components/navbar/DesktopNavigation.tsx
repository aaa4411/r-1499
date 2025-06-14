
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useAdminRoles } from '@/hooks/useAdminRoles';
import { NavLink } from './NavLink';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Shield } from 'lucide-react';

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & { to: string }
>(({ className, title, children, to, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={to}
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

export const DesktopNavigation: React.FC = () => {
  const { user } = useAuth();
  const { isAdmin } = useAdminRoles();

  return (
    <div className="hidden md:flex items-center space-x-6">
      <NavLink to="/properties">Properties</NavLink>
      
      {user && (
        <>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/add-property">Add Property</NavLink>
          {isAdmin() && (
            <NavLink to="/admin" className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              Admin Panel
            </NavLink>
          )}
        </>
      )}
      
      <NavLink to="/furniture">Furniture</NavLink>
      
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-700 focus:bg-gray-50 focus:text-gray-700 data-[active]:bg-gray-50 data-[state=open]:bg-gray-50 p-0 font-medium">
              Services
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[250px] bg-white text-black rounded-lg shadow-lg border">
                <ListItem to="/services" title="Real Estate Services">
                  Buy, sell, and manage properties.
                </ListItem>
                <ListItem to="/furniture" title="Furniture Services">
                  Furnish your dream home.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      
      <NavLink to="/about">About</NavLink>
      <NavLink to="/#testimonials">Testimonials</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </div>
  );
};
