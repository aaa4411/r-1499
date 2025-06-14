
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';
import { AdminRole, UserRole } from '@/types/adminRoles';
import { useRoleChecker } from '@/hooks/useRoleChecker';
import { useAdminActivityLogger } from '@/hooks/useAdminActivityLogger';

export const useRoleManagement = (userRole: AdminRole) => {
  const { user } = useAuth();
  const { isAdmin, isSuperAdmin } = useRoleChecker(userRole);
  const { logAdminActivity } = useAdminActivityLogger();
  const [allUserRoles, setAllUserRoles] = useState<UserRole[]>([]);

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

  return {
    allUserRoles,
    fetchAllUserRoles,
    assignRole,
    removeRole
  };
};
