
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type AdminRole = 'super_admin' | 'admin' | 'moderator' | 'property_manager' | 'support_staff' | 'user';
export type StatusType = 'pending' | 'approved' | 'rejected' | 'featured' | 'verified' | 'active' | 'suspended' | 'banned';
export type PriorityType = 'high' | 'medium' | 'low';

interface AdminBadgeProps {
  type: 'role' | 'status' | 'priority' | 'action';
  value: AdminRole | StatusType | PriorityType | string;
  className?: string;
}

const getRoleBadgeConfig = (role: AdminRole) => {
  switch (role) {
    case 'super_admin':
      return { text: 'Super Admin', variant: 'destructive' as const, className: 'bg-red-600 hover:bg-red-700' };
    case 'admin':
      return { text: 'Admin', variant: 'default' as const, className: 'bg-blue-600 hover:bg-blue-700' };
    case 'moderator':
      return { text: 'Moderator', variant: 'secondary' as const, className: 'bg-green-600 hover:bg-green-700' };
    case 'property_manager':
      return { text: 'Property Manager', variant: 'outline' as const, className: 'bg-orange-100 text-orange-800 border-orange-300' };
    case 'support_staff':
      return { text: 'Support Staff', variant: 'outline' as const, className: 'bg-purple-100 text-purple-800 border-purple-300' };
    default:
      return { text: 'User', variant: 'outline' as const, className: 'bg-gray-100 text-gray-600' };
  }
};

const getStatusBadgeConfig = (status: StatusType) => {
  switch (status) {
    case 'pending':
      return { text: 'Pending Review', variant: 'outline' as const, className: 'bg-yellow-100 text-yellow-800 border-yellow-300' };
    case 'approved':
      return { text: 'Approved', variant: 'secondary' as const, className: 'bg-green-100 text-green-800' };
    case 'rejected':
      return { text: 'Rejected', variant: 'destructive' as const, className: 'bg-red-100 text-red-800' };
    case 'featured':
      return { text: 'Featured', variant: 'default' as const, className: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' };
    case 'verified':
      return { text: 'Verified', variant: 'default' as const, className: 'bg-blue-100 text-blue-800' };
    case 'active':
      return { text: 'Active', variant: 'secondary' as const, className: 'bg-green-100 text-green-800' };
    case 'suspended':
      return { text: 'Suspended', variant: 'outline' as const, className: 'bg-orange-100 text-orange-800 border-orange-300' };
    case 'banned':
      return { text: 'Banned', variant: 'destructive' as const, className: 'bg-red-900 text-white' };
    default:
      return { text: status, variant: 'outline' as const, className: '' };
  }
};

const getPriorityBadgeConfig = (priority: PriorityType) => {
  switch (priority) {
    case 'high':
      return { text: 'High Priority', variant: 'destructive' as const, className: 'bg-red-100 text-red-800 border-red-300' };
    case 'medium':
      return { text: 'Medium Priority', variant: 'outline' as const, className: 'bg-yellow-100 text-yellow-800 border-yellow-300' };
    case 'low':
      return { text: 'Low Priority', variant: 'secondary' as const, className: 'bg-gray-100 text-gray-600' };
    default:
      return { text: priority, variant: 'outline' as const, className: '' };
  }
};

export const AdminBadge: React.FC<AdminBadgeProps> = ({ type, value, className }) => {
  let config;
  
  switch (type) {
    case 'role':
      config = getRoleBadgeConfig(value as AdminRole);
      break;
    case 'status':
      config = getStatusBadgeConfig(value as StatusType);
      break;
    case 'priority':
      config = getPriorityBadgeConfig(value as PriorityType);
      break;
    case 'action':
      config = { text: value, variant: 'default' as const, className: 'bg-blue-100 text-blue-800' };
      break;
    default:
      config = { text: value, variant: 'outline' as const, className: '' };
  }

  return (
    <Badge 
      variant={config.variant} 
      className={cn(config.className, className)}
    >
      {config.text}
    </Badge>
  );
};
