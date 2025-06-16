
import React from 'react';
import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';

interface FeatureBadgeProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const FeatureBadge: React.FC<FeatureBadgeProps> = ({ 
  children, 
  icon, 
  className 
}) => {
  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-4 py-2 rounded-full",
      "bg-white/10 backdrop-blur-sm border border-white/20",
      "text-white text-sm font-medium",
      "shadow-lg",
      className
    )}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </div>
  );
};
