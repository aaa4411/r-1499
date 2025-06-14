
import { AdminRole, ROLE_HIERARCHY } from '@/types/adminRoles';

export const useRoleChecker = (userRole: AdminRole) => {
  // Check if user has specific role
  const hasRole = (role: AdminRole): boolean => {
    return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[role];
  };

  // Check if user is admin (admin or super_admin)
  const isAdmin = (): boolean => {
    return hasRole('admin');
  };

  // Check if user is super admin
  const isSuperAdmin = (): boolean => {
    return userRole === 'super_admin';
  };

  return {
    hasRole,
    isAdmin,
    isSuperAdmin
  };
};
