
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

export type AdminRole = 'super_admin' | 'admin' | 'moderator' | 'property_manager' | 'support_staff' | 'user';

interface UserRole {
  id: string;
  user_id: string;
  role: AdminRole;
  assigned_by: string | null;
  assigned_at: string;
}

export const useAdminRoles = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<AdminRole>('user');
  const [loading, setLoading] = useState(true);
  const [allUserRoles, setAllUserRoles] = useState<UserRole[]>([]);

  // Check if user has specific role
  const hasRole = (role: AdminRole): boolean => {
    const roleHierarchy = {
      'super_admin': 6,
      'admin': 5,
      'moderator': 4,
      'property_manager': 3,
      'support_staff': 2,
      'user': 1
    };
    
    return roleHierarchy[userRole] >= roleHierarchy[role];
  };

  // Check if user is admin (admin or super_admin)
  const isAdmin = (): boolean => {
    return hasRole('admin');
  };

  // Check if user is super admin
  const isSuperAdmin = (): boolean => {
    return userRole === 'super_admin';
  };

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

  // Fetch all user roles (admin only)
  const fetchAllUserRoles = async () => {
    if (!isAdmin()) return;

    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .order('assigned_at', { ascending: false });

      if (error) throw error;
      setAllUserRoles(data || []);
    } catch (error: any) {
      console.error('Error fetching all user roles:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch user roles',
        variant: 'destructive',
      });
    }
  };

  // Assign role to user (admin only)
  const assignRole = async (targetUserId: string, role: AdminRole) => {
    if (!isAdmin()) {
      toast({
        title: 'Access Denied',
        description: 'You do not have permission to assign roles',
        variant: 'destructive',
      });
      return false;
    }

    // Super admin check for admin roles
    if ((role === 'admin' || role === 'super_admin') && !isSuperAdmin()) {
      toast({
        title: 'Access Denied',
        description: 'Only super admins can assign admin roles',
        variant: 'destructive',
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('user_roles')
        .upsert({
          user_id: targetUserId,
          role,
          assigned_by: user?.id
        }, {
          onConflict: 'user_id,role'
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Role ${role} assigned successfully`,
      });

      // Log admin activity
      await logAdminActivity('assign_role', 'user', targetUserId, { role });
      
      fetchAllUserRoles();
      return true;
    } catch (error: any) {
      console.error('Error assigning role:', error);
      toast({
        title: 'Error',
        description: 'Failed to assign role',
        variant: 'destructive',
      });
      return false;
    }
  };

  // Remove role from user (admin only)
  const removeRole = async (targetUserId: string, role: AdminRole) => {
    if (!isAdmin()) return false;

    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', targetUserId)
        .eq('role', role);

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Role ${role} removed successfully`,
      });

      await logAdminActivity('remove_role', 'user', targetUserId, { role });
      fetchAllUserRoles();
      return true;
    } catch (error: any) {
      console.error('Error removing role:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove role',
        variant: 'destructive',
      });
      return false;
    }
  };

  // Log admin activity
  const logAdminActivity = async (action: string, targetType: string, targetId: string, details?: any) => {
    if (!user || !isAdmin()) return;

    try {
      await supabase
        .from('admin_activity_log')
        .insert({
          admin_id: user.id,
          action,
          target_type: targetType,
          target_id: targetId,
          details
        });
    } catch (error) {
      console.error('Error logging admin activity:', error);
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
