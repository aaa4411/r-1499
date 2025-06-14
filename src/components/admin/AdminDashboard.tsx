
import React from 'react';
import { useAdminRoles } from '@/hooks/useAdminRoles';
import { useAdminProperties } from '@/hooks/useAdminProperties';
import { AdminBadge } from '@/components/admin/AdminBadge';
import { AdminStatsCards } from '@/components/admin/AdminStatsCards';
import { AdminPropertyManagement } from '@/components/admin/AdminPropertyManagement';
import { AdminUserManagement } from '@/components/admin/AdminUserManagement';
import { AdminActivityLog } from '@/components/admin/AdminActivityLog';
import { AdminAnalytics } from '@/components/admin/AdminAnalytics';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { userRole, isAdmin, isSuperAdmin, allUserRoles, assignRole, removeRole } = useAdminRoles();
  const { properties, updatePropertyStatus, togglePropertyFeatured, deleteProperty, getPropertiesByStatus } = useAdminProperties();

  if (!isAdmin()) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Access Denied
            </CardTitle>
            <CardDescription>
              You need admin privileges to access this dashboard.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const pendingProperties = getPropertiesByStatus('pending');
  const adminUsersCount = allUserRoles.filter(ur => ur.role !== 'user').length;
  const featuredPropertiesCount = properties.filter(p => p.featured).length;

  const handlePropertyAction = async (propertyId: string, action: string) => {
    switch (action) {
      case 'approve':
        await updatePropertyStatus(propertyId, 'approved');
        break;
      case 'reject':
        await updatePropertyStatus(propertyId, 'rejected');
        break;
      case 'feature':
        await togglePropertyFeatured(propertyId, true);
        break;
      case 'unfeature':
        await togglePropertyFeatured(propertyId, false);
        break;
      case 'delete':
        if (confirm('Are you sure you want to delete this property?')) {
          await deleteProperty(propertyId);
        }
        break;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-2 mt-2">
            <AdminBadge type="role" value={userRole} />
            <span className="text-muted-foreground">Welcome to the admin control panel</span>
          </div>
        </div>
      </div>

      <AdminStatsCards
        pendingCount={pendingProperties.length}
        totalProperties={properties.length}
        adminUsersCount={adminUsersCount}
        featuredCount={featuredPropertiesCount}
      />

      <Tabs defaultValue="properties" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="properties">Property Management</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        <TabsContent value="properties" className="space-y-6">
          <AdminPropertyManagement
            properties={properties}
            isSuperAdmin={isSuperAdmin()}
            onPropertyAction={handlePropertyAction}
          />
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <AdminUserManagement
            isSuperAdmin={isSuperAdmin()}
            allUserRoles={allUserRoles}
            onAssignRole={assignRole}
            onRemoveRole={removeRole}
          />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <AdminAnalytics />
        </TabsContent>

        <TabsContent value="activity">
          <AdminActivityLog />
        </TabsContent>
      </Tabs>
    </div>
  );
};
