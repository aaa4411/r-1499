
import React, { useState } from 'react';
import { useAdminRoles } from '@/hooks/useAdminRoles';
import { useAdminProperties } from '@/hooks/useAdminProperties';
import { AdminBadge } from '@/components/admin/AdminBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Building, Shield, Activity, Star, AlertTriangle } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { userRole, isAdmin, isSuperAdmin, allUserRoles, assignRole, removeRole } = useAdminRoles();
  const { properties, updatePropertyStatus, togglePropertyFeatured, deleteProperty, getPropertiesByStatus } = useAdminProperties();
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'moderator' | 'property_manager' | 'support_staff' | 'user'>('user');
  const [adminNotes, setAdminNotes] = useState('');

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
  const approvedProperties = getPropertiesByStatus('approved');
  const rejectedProperties = getPropertiesByStatus('rejected');

  const handleAssignRole = async () => {
    if (selectedUserId && selectedRole) {
      await assignRole(selectedUserId, selectedRole);
      setSelectedUserId('');
      setSelectedRole('user');
    }
  };

  const handlePropertyAction = async (propertyId: string, action: string) => {
    switch (action) {
      case 'approve':
        await updatePropertyStatus(propertyId, 'approved', adminNotes);
        break;
      case 'reject':
        await updatePropertyStatus(propertyId, 'rejected', adminNotes);
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
    setAdminNotes('');
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingProperties.length}</div>
            <AdminBadge type="status" value="pending" className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Building className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{properties.length}</div>
            <AdminBadge type="status" value="active" className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {allUserRoles.filter(ur => ur.role !== 'user').length}
            </div>
            <AdminBadge type="role" value="admin" className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Featured Properties</CardTitle>
            <Star className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {properties.filter(p => p.featured).length}
            </div>
            <AdminBadge type="status" value="featured" className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="properties" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="properties">Property Management</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        <TabsContent value="properties" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Property Management</CardTitle>
              <CardDescription>
                Review, approve, reject, and manage all properties on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="pending" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="pending">
                    Pending ({pendingProperties.length})
                  </TabsTrigger>
                  <TabsTrigger value="approved">
                    Approved ({approvedProperties.length})
                  </TabsTrigger>
                  <TabsTrigger value="rejected">
                    Rejected ({rejectedProperties.length})
                  </TabsTrigger>
                  <TabsTrigger value="all">
                    All Properties ({properties.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="pending">
                  <div className="space-y-4">
                    {pendingProperties.map((property) => (
                      <Card key={property.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{property.title}</CardTitle>
                              <CardDescription>{property.location}</CardDescription>
                            </div>
                            <div className="flex gap-2">
                              <AdminBadge type="status" value="pending" />
                              {property.featured && <AdminBadge type="status" value="featured" />}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <Label>Price</Label>
                              <p>${property.price.toLocaleString()}</p>
                            </div>
                            <div>
                              <Label>Type</Label>
                              <p className="capitalize">{property.type}</p>
                            </div>
                            <div>
                              <Label>Bedrooms</Label>
                              <p>{property.bedrooms}</p>
                            </div>
                            <div>
                              <Label>Area</Label>
                              <p>{property.area} sq ft</p>
                            </div>
                          </div>
                          
                          {property.description && (
                            <div className="mt-4">
                              <Label>Description</Label>
                              <p className="text-sm text-muted-foreground">{property.description}</p>
                            </div>
                          )}

                          <div className="mt-4">
                            <Label htmlFor="admin-notes">Admin Notes</Label>
                            <Textarea
                              id="admin-notes"
                              placeholder="Add notes about your decision..."
                              value={adminNotes}
                              onChange={(e) => setAdminNotes(e.target.value)}
                              className="mt-2"
                            />
                          </div>
                        </CardContent>
                        <CardFooter className="flex gap-2">
                          <Button 
                            onClick={() => handlePropertyAction(property.id, 'approve')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Approve
                          </Button>
                          <Button 
                            onClick={() => handlePropertyAction(property.id, 'reject')}
                            variant="destructive"
                          >
                            Reject
                          </Button>
                          <Button 
                            onClick={() => handlePropertyAction(property.id, 'feature')}
                            variant="outline"
                          >
                            Feature
                          </Button>
                          {isSuperAdmin() && (
                            <Button 
                              onClick={() => handlePropertyAction(property.id, 'delete')}
                              variant="destructive"
                              className="ml-auto"
                            >
                              Delete
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                    {pendingProperties.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        No pending properties to review
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="approved">
                  <div className="space-y-4">
                    {approvedProperties.map((property) => (
                      <Card key={property.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{property.title}</CardTitle>
                              <CardDescription>{property.location}</CardDescription>
                            </div>
                            <div className="flex gap-2">
                              <AdminBadge type="status" value="approved" />
                              {property.featured && <AdminBadge type="status" value="featured" />}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <Label>Price</Label>
                              <p>${property.price.toLocaleString()}</p>
                            </div>
                            <div>
                              <Label>Type</Label>
                              <p className="capitalize">{property.type}</p>
                            </div>
                            <div>
                              <Label>Bedrooms</Label>
                              <p>{property.bedrooms}</p>
                            </div>
                            <div>
                              <Label>Area</Label>
                              <p>{property.area} sq ft</p>
                            </div>
                          </div>
                          {property.admin_notes && (
                            <div className="mt-4">
                              <Label>Admin Notes</Label>
                              <p className="text-sm text-muted-foreground">{property.admin_notes}</p>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="flex gap-2">
                          <Button 
                            onClick={() => handlePropertyAction(property.id, property.featured ? 'unfeature' : 'feature')}
                            variant="outline"
                          >
                            {property.featured ? 'Unfeature' : 'Feature'}
                          </Button>
                          <Button 
                            onClick={() => handlePropertyAction(property.id, 'reject')}
                            variant="destructive"
                          >
                            Reject
                          </Button>
                          {isSuperAdmin() && (
                            <Button 
                              onClick={() => handlePropertyAction(property.id, 'delete')}
                              variant="destructive"
                              className="ml-auto"
                            >
                              Delete
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="rejected">
                  <div className="space-y-4">
                    {rejectedProperties.map((property) => (
                      <Card key={property.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{property.title}</CardTitle>
                              <CardDescription>{property.location}</CardDescription>
                            </div>
                            <AdminBadge type="status" value="rejected" />
                          </div>
                        </CardHeader>
                        <CardContent>
                          {property.admin_notes && (
                            <div>
                              <Label>Rejection Reason</Label>
                              <p className="text-sm text-muted-foreground">{property.admin_notes}</p>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="flex gap-2">
                          <Button 
                            onClick={() => handlePropertyAction(property.id, 'approve')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Approve
                          </Button>
                          {isSuperAdmin() && (
                            <Button 
                              onClick={() => handlePropertyAction(property.id, 'delete')}
                              variant="destructive"
                              className="ml-auto"
                            >
                              Delete
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="all">
                  <div className="space-y-4">
                    {properties.map((property) => (
                      <Card key={property.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{property.title}</CardTitle>
                              <CardDescription>{property.location}</CardDescription>
                            </div>
                            <div className="flex gap-2">
                              <AdminBadge type="status" value={property.status as any} />
                              {property.featured && <AdminBadge type="status" value="featured" />}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <Label>Price</Label>
                              <p>${property.price.toLocaleString()}</p>
                            </div>
                            <div>
                              <Label>Type</Label>
                              <p className="capitalize">{property.type}</p>
                            </div>
                            <div>
                              <Label>Status</Label>
                              <AdminBadge type="status" value={property.status as any} />
                            </div>
                            <div>
                              <Label>Created</Label>
                              <p>{new Date(property.created_at).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          {isSuperAdmin() && (
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
                      {isSuperAdmin() && <SelectItem value="admin">Admin</SelectItem>}
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
                      {(isSuperAdmin() || (userRole.role !== 'admin' && userRole.role !== 'super_admin')) && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeRole(userRole.user_id, userRole.role)}
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
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Admin Activity Log
              </CardTitle>
              <CardDescription>
                View recent admin actions and system activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Activity log will show recent admin actions here.
                This feature can be extended with specific activity tracking.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
