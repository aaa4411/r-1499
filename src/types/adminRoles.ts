
export type AdminRole = 'super_admin' | 'admin' | 'moderator' | 'property_manager' | 'support_staff' | 'user';

export interface UserRole {
  id: string;
  user_id: string;
  role: AdminRole;
  assigned_by: string | null;
  assigned_at: string;
}

export const ROLE_HIERARCHY: Record<AdminRole, number> = {
  'super_admin': 6,
  'admin': 5,
  'moderator': 4,
  'property_manager': 3,
  'support_staff': 2,
  'user': 1
};
