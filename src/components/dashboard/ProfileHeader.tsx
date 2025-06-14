
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useAdminRoles } from '@/hooks/useAdminRoles';
import { AdminBadge } from '@/components/admin/AdminBadge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Settings, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfileHeader = () => {
  const { user } = useAuth();
  const { userRole, isAdmin } = useAdminRoles();

  if (!user) return null;

  const displayName = user.user_metadata?.name || user.email?.split('@')[0] || 'User';
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase();

  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.user_metadata?.avatar_url} />
              <AvatarFallback className="text-lg font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {displayName}!
              </h1>
              <p className="text-gray-600 mt-1">{user.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <AdminBadge type="role" value={userRole} />
                {isAdmin() && (
                  <AdminBadge type="status" value="verified" />
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {isAdmin() && (
              <Link to="/admin">
                <Button variant="outline" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Admin Panel
                </Button>
              </Link>
            )}
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
