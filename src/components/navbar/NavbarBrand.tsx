
import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarBrandProps {
  isHomePage: boolean;
}

export const NavbarBrand: React.FC<NavbarBrandProps> = ({ isHomePage }) => {
  return (
    <Link 
      to="/" 
      className="text-2xl lg:text-3xl font-display text-gray-900 tracking-wide hover:text-gray-700 transition-all duration-200 hover:scale-105"
    >
      Elite Real Estate
    </Link>
  );
};
