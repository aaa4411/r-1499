
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AdminBadge } from '@/components/admin/AdminBadge';
import { AdminRole, UserRole } from '@/types/adminRoles';

interface AdminUserManagementProps {
  isSuperAdmin: boolean;
  allUserRoles: UserRole[];
  onAssignRole: (userId: string, role: AdminRole) => Promise<boolean>;
  onRemoveRole: (userId: string, role: AdminRole) => Promise<boolean>;
}

export const AdminUserManagement: React.FC<AdminUserManagementProps> = ({
  isSuperAdmin,
  allUserRoles,
  onAssignRole,
  onRemoveRole
}) => {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'moderator' | 'property_manager' | 'support_staff' | 'user'>('user');

  const handleAssignRole = async () => {
    if (selectedUserId && selectedRole) {
      await onAssignRole(selectedUserId, selectedRole);
      setSelectedUserId('');
      setSelectedRole('user');
    }
  };

  return (
    <div className="space-y-6">
      {isSuperAdmin && (
        <Card>
          <CardHeader>
            <CardTitle>Assign User Role</CardTitle>
            <CardDescription>
              Assign roles to users. Only super admins can assign admin roles.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="user-id">User ID</Label>
              <Input
                id="user-id"
                placeholder="Enter user ID..."
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="role-select">Role</Label>
              <Select value={selectedRole} onValueChange={(value: any) => setSelectedRole(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="support_staff">Support Staff</SelectItem>
                  <SelectItem value="property_manager">Property Manager</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                  {isSuperAdmin && <SelectItem value="admin">Admin</SelectItem>}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAssignRole}>
              Assign Role
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All User Roles</CardTitle>
          <CardDescription>
            View and manage all user roles in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {allUserRoles.map((userRole) => (
              <div key={userRole.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">User ID: {userRole.user_id}</p>
                  <p className="text-sm text-muted-foreground">
                    Assigned: {new Date(userRole.assigned_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <AdminBadge type="role" value={userRole.role} />
                  {(isSuperAdmin || (userRole.role !== 'admin' && userRole.role !== 'super_admin')) && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onRemoveRole(userRole.user_id, userRole.role)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
