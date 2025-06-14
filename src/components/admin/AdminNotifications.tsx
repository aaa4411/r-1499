
import React, { useState, useEffect } from 'react';
import { useAdminRoles } from '@/hooks/useAdminRoles';
import { useAdminProperties } from '@/hooks/useAdminProperties';
import { AdminBadge } from '@/components/admin/AdminBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, BellOff, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export const AdminNotifications: React.FC = () => {
  const { isAdmin } = useAdminRoles();
  const { getPropertiesByStatus } = useAdminProperties();
  const [isOpen, setIsOpen] = useState(false);

  if (!isAdmin()) return null;

  const pendingProperties = getPropertiesByStatus('pending');
  const recentActivities = [
    {
      id: '1',
      type: 'property_submitted',
      message: 'New property submitted for review',
      time: '5 minutes ago',
      icon: Clock,
      priority: 'medium'
    },
    {
      id: '2',
      type: 'property_approved',
      message: 'Property "Luxury Villa" approved',
      time: '1 hour ago',
      icon: CheckCircle,
      priority: 'low'
    }
  ];

  const notificationCount = pendingProperties.length;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          {notificationCount > 0 ? <Bell className="h-5 w-5" /> : <BellOff className="h-5 w-5" />}
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1.5 py-0.5 min-w-[20px] h-5 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Admin Notifications</h3>
            <AdminBadge type="status" value="active" />
          </div>
          
          {notificationCount > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Pending Reviews</p>
                  <p className="text-xs text-gray-600">
                    {notificationCount} properties awaiting review
                  </p>
                </div>
                <AdminBadge type="priority" value="high" />
              </div>
              
              <Link to="/admin" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full">
                  View Admin Dashboard
                </Button>
              </Link>
            </div>
          ) : (
            <div className="text-center py-4">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">All caught up!</p>
              <p className="text-xs text-gray-500">No pending notifications</p>
            </div>
          )}

          {recentActivities.length > 0 && (
            <div className="border-t pt-3">
              <h4 className="text-sm font-medium mb-2">Recent Activity</h4>
              <div className="space-y-2">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start gap-2 text-sm">
                      <Icon className="h-4 w-4 text-gray-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      <AdminBadge type="priority" value={activity.priority as any} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
