
import React from 'react';
import { useRealtimeNotifications } from '@/hooks/useRealtimeNotifications';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, BellOff, Wifi, WifiOff } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { formatDistanceToNow } from 'date-fns';

const RealtimeNotifications = () => {
  const { notificationState, propertyUpdates, clearNotifications, isConnected } = useRealtimeNotifications();

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'INSERT': return '🏠';
      case 'UPDATE': return '🔄';
      case 'DELETE': return '🗑️';
      default: return '📢';
    }
  };

  const getEventDescription = (update: any) => {
    const { eventType, new: newData, old: oldData } = update;
    
    switch (eventType) {
      case 'INSERT':
        return `New property: ${newData?.title || 'Unknown'}`;
      case 'UPDATE':
        if (oldData?.status !== newData?.status) {
          return `Status changed to ${newData?.status}`;
        } else if (oldData?.featured !== newData?.featured && newData?.featured) {
          return `Now featured`;
        }
        return `Property updated`;
      case 'DELETE':
        return `Property removed`;
      default:
        return 'Property changed';
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Connection Status */}
      <div className="flex items-center gap-1">
        {isConnected ? (
          <Wifi className="w-4 h-4 text-green-500" />
        ) : (
          <WifiOff className="w-4 h-4 text-red-500" />
        )}
        <span className="text-xs text-gray-500 hidden sm:inline">
          {isConnected ? 'Live' : 'Offline'}
        </span>
      </div>

      {/* Notifications Bell */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="relative">
            {notificationState.updateCount > 0 ? (
              <Bell className="w-4 h-4 text-blue-600" />
            ) : (
              <BellOff className="w-4 h-4 text-gray-400" />
            )}
            {notificationState.updateCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {notificationState.updateCount > 99 ? '99+' : notificationState.updateCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="end">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Property Updates</h3>
              {notificationState.updateCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearNotifications}
                  className="text-xs"
                >
                  Clear all
                </Button>
              )}
            </div>
            {notificationState.lastUpdate && (
              <p className="text-xs text-gray-500 mt-1">
                Last update {formatDistanceToNow(notificationState.lastUpdate, { addSuffix: true })}
              </p>
            )}
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {propertyUpdates.length > 0 ? (
              <div className="divide-y">
                {propertyUpdates.slice(0, 10).map((update, index) => (
                  <div key={`${update.id}-${index}`} className="p-3 hover:bg-gray-50">
                    <div className="flex items-start gap-3">
                      <span className="text-lg">{getEventIcon(update.eventType)}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {update.new?.title || update.old?.title || 'Property'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {getEventDescription(update)}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {update.new?.location || update.old?.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No recent updates</p>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default RealtimeNotifications;
