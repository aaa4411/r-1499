
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useProperties } from "@/hooks/useProperties";
import { useFavorites } from "@/hooks/useFavorites";
import { useAdminRoles } from "@/hooks/useAdminRoles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileHeader from "@/components/dashboard/ProfileHeader";
import StatCards from "@/components/dashboard/StatCards";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import { AdminSetupGuide } from "@/components/admin/AdminSetupGuide";

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { properties, loading } = useProperties();
  const { favorites, loading: favoritesLoading } = useFavorites();
  const { userRole, loading: roleLoading } = useAdminRoles();
  const [profileProgress, setProfileProgress] = useState(65);
  
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);
  
  // Calculate profile completion
  useEffect(() => {
    if (user) {
      let progress = 50; // Base progress for having an account
      if (user.user_metadata?.name) progress += 15;
      if (user.user_metadata?.avatar_url) progress += 15;
      if (user.phone) progress += 20;
      setProfileProgress(progress);
    }
  }, [user]);

  if (isLoading || roleLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-estate-800"></div>
      </div>
    );
  }
  
  // Filter to get only user's properties
  const userProperties = properties.filter(p => p.user_id === user?.id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-28 pb-16">
        <ProfileHeader />
        
        {/* Show admin setup guide if user is not admin but could be */}
        {userRole === 'user' && <AdminSetupGuide />}
        
        <StatCards profileProgress={profileProgress} propertiesCount={userProperties.length} />
        <DashboardTabs 
          userProperties={userProperties}
          favorites={favorites}
          propertiesLoading={loading}
          favoritesLoading={favoritesLoading}
        />
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
