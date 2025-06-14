
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AdminBadge } from '@/components/admin/AdminBadge';

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: 'sale' | 'rent';
  status: string;
  featured: boolean;
  admin_notes: string;
  reviewed_by: string | null;
  reviewed_at: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
}

interface AdminPropertyManagementProps {
  properties: Property[];
  isSuperAdmin: boolean;
  onPropertyAction: (propertyId: string, action: string) => Promise<void>;
}

export const AdminPropertyManagement: React.FC<AdminPropertyManagementProps> = ({
  properties,
  isSuperAdmin,
  onPropertyAction
}) => {
  const [adminNotes, setAdminNotes] = useState('');

  const getPropertiesByStatus = (status: string) => {
    return properties.filter(property => property.status === status);
  };

  const pendingProperties = getPropertiesByStatus('pending');
  const approvedProperties = getPropertiesByStatus('approved');
  const rejectedProperties = getPropertiesByStatus('rejected');

  const handlePropertyAction = async (propertyId: string, action: string) => {
    await onPropertyAction(propertyId, action);
    setAdminNotes('');
  };

  const PropertyCard = ({ property }: { property: Property }) => (
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
            <Label>Bedrooms</Label>
            <p>{property.bedrooms}</p>
          </div>
          <div>
            <Label>Area</Label>
            <p>{property.area} sq ft</p>
          </div>
        </div>
        
        {property.description && property.status === 'pending' && (
          <div className="mt-4">
            <Label>Description</Label>
            <p className="text-sm text-muted-foreground">{property.description}</p>
          </div>
        )}

        {property.admin_notes && property.status !== 'pending' && (
          <div className="mt-4">
            <Label>Admin Notes</Label>
            <p className="text-sm text-muted-foreground">{property.admin_notes}</p>
          </div>
        )}

        {property.status === 'pending' && (
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
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        {property.status === 'pending' && (
          <>
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
          </>
        )}
        
        {property.status === 'approved' && (
          <>
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
          </>
        )}
        
        {property.status === 'rejected' && (
          <Button 
            onClick={() => handlePropertyAction(property.id, 'approve')}
            className="bg-green-600 hover:bg-green-700"
          >
            Approve
          </Button>
        )}
        
        {isSuperAdmin && (
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
  );

  return (
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
                <PropertyCard key={property.id} property={property} />
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
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rejected">
            <div className="space-y-4">
              {rejectedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all">
            <div className="space-y-4">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
