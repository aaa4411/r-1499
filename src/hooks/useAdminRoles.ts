
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { AdminRole } from '@/types/adminRoles';
import { useRoleChecker } from '@/hooks/useRoleChecker';
import { useRoleManagement } from '@/hooks/useRoleManagement';
import { useAdminActivityLogger } from '@/hooks/useAdminActivityLogger';

export const useAdminRoles = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<AdminRole>('user');
  const [loading, setLoading] = useState(true);

  const { hasRole, isAdmin, isSuperAdmin } = useRoleChecker(userRole);
  const { allUserRoles, fetchAllUserRoles, assignRole, removeRole } = useRoleManagement(userRole);
  const { logAdminActivity } = useAdminActivityLogger();

  // Fetch current user's role
  const fetchUserRole = async () => {
    if (!user) {
      setUserRole('user');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .order('role')
        .limit(1);

      if (error) throw error;

      if (data && data.length > 0) {
        setUserRole(data[0].role as AdminRole);
      } else {
        setUserRole('user');
      }
    } catch (error: any) {
      console.error('Error fetching user role:', error);
      setUserRole('user');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserRole();
  }, [user]);

  useEffect(() => {
    if (isAdmin()) {
      fetchAllUserRoles();
    }
  }, [userRole]);

  return {
    userRole,
    loading,
    allUserRoles,
    hasRole,
    isAdmin,
    isSuperAdmin,
    assignRole,
    removeRole,
    fetchUserRole,
    fetchAllUserRoles,
    logAdminActivity
  };
};

// Re-export types for backward compatibility
export type { AdminRole } from '@/types/adminRoles';
