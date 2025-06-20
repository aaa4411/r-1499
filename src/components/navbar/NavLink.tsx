
import React from 'react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export const NavLink: React.FC<NavLinkProps> = ({ to, children, className = "" }) => {
  return (
    <Link 
      to={to} 
      className={`text-white hover:text-white/80 transition-all duration-200 font-medium relative group ${className}`}
    >
      {children}
      <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
    </Link>
  );
};
