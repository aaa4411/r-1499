
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type PropertyStatus = 'pending' | 'approved' | 'rejected' | 'featured' | 'active' | 'suspended';

interface PropertyStatusBadgeProps {
  status: PropertyStatus;
  featured?: boolean;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
}

const getStatusConfig = (status: PropertyStatus, featured?: boolean) => {
  if (featured) {
    return {
      text: 'Featured',
      variant: 'default' as const,
      className: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0'
    };
  }

  switch (status) {
    case 'pending':
      return {
        text: 'Pending Review',
        variant: 'outline' as const,
        className: 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100'
      };
    case 'approved':
      return {
        text: 'Approved',
        variant: 'secondary' as const,
        className: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
      };
    case 'rejected':
      return {
        text: 'Rejected',
        variant: 'destructive' as const,
        className: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
      };
    case 'active':
      return {
        text: 'Active',
        variant: 'secondary' as const,
        className: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
      };
    case 'suspended':
      return {
        text: 'Suspended',
        variant: 'outline' as const,
        className: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100'
      };
    default:
      return {
        text: status,
        variant: 'outline' as const,
        className: 'bg-gray-50 text-gray-600 border-gray-200'
      };
  }
};

export const PropertyStatusBadge: React.FC<PropertyStatusBadgeProps> = ({ 
  status, 
  featured = false, 
  className, 
  size = 'default' 
}) => {
  const config = getStatusConfig(status, featured);
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    default: 'text-sm px-2.5 py-0.5',
    lg: 'text-sm px-3 py-1'
  };

  return (
    <Badge 
      variant={config.variant}
      className={cn(
        config.className,
        sizeClasses[size],
        'font-medium',
        className
      )}
    >
      {config.text}
    </Badge>
  );
};
