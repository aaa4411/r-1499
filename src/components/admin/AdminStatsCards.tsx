
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminBadge } from '@/components/admin/AdminBadge';
import { Users, Building, Star, AlertTriangle } from 'lucide-react';

interface AdminStatsCardsProps {
  pendingCount: number;
  totalProperties: number;
  adminUsersCount: number;
  featuredCount: number;
}

export const AdminStatsCards: React.FC<AdminStatsCardsProps> = ({
  pendingCount,
  totalProperties,
  adminUsersCount,
  featuredCount
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingCount}</div>
          <AdminBadge type="status" value="pending" className="mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
          <Building className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProperties}</div>
          <AdminBadge type="status" value="active" className="mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
          <Users className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{adminUsersCount}</div>
          <AdminBadge type="role" value="admin" className="mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Featured Properties</CardTitle>
          <Star className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{featuredCount}</div>
          <AdminBadge type="status" value="featured" className="mt-2" />
        </CardContent>
      </Card>
    </div>
  );
};
