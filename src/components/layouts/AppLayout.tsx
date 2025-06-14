
import React from 'react';
import Navbar from '@/components/Navbar';
import MobileBottomNav from '@/components/mobile/MobileBottomNav';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pb-16 md:pb-0">
        {children}
      </main>
      <MobileBottomNav />
    </div>
  );
};

export default AppLayout;
