
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAdminRoles } from '@/hooks/useAdminRoles';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Admin = () => {
  const { user, isLoading } = useAuth();
  const { userRole, loading: roleLoading, isAdmin } = useAdminRoles();

  if (isLoading || roleLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-estate-800"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin()) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <div className="pt-24">
        <AdminDashboard />
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
