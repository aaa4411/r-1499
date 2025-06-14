
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface PropertyUpdate {
  id: string;
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  new?: any;
  old?: any;
}

interface NotificationState {
  isConnected: boolean;
  lastUpdate: Date | null;
  updateCount: number;
}

export const useRealtimeNotifications = () => {
  const { user } = useAuth();
  const [notificationState, setNotificationState] = useState<NotificationState>({
    isConnected: false,
    lastUpdate: null,
    updateCount: 0
  });

  const [propertyUpdates, setPropertyUpdates] = useState<PropertyUpdate[]>([]);

  const showNotification = useCallback((update: PropertyUpdate) => {
    const { eventType, new: newData, old: oldData } = update;
    
    switch (eventType) {
      case 'INSERT':
        toast({
          title: '🏠 New Property Listed',
          description: `${newData?.title || 'A new property'} in ${newData?.location || 'Unknown location'}`,
          duration: 5000,
        });
        break;
      case 'UPDATE':
        if (oldData?.status !== newData?.status) {
          toast({
            title: '📋 Property Status Updated',
            description: `${newData?.title || 'A property'} status changed to ${newData?.status || 'updated'}`,
            duration: 5000,
          });
        } else if (oldData?.featured !== newData?.featured && newData?.featured) {
          toast({
            title: '⭐ Featured Property',
            description: `${newData?.title || 'A property'} is now featured!`,
            duration: 5000,
          });
        } else {
          toast({
            title: '🔄 Property Updated',
            description: `${newData?.title || 'A property'} has been updated`,
            duration: 3000,
          });
        }
        break;
      case 'DELETE':
        toast({
          title: '🗑️ Property Removed',
          description: `A property has been removed from listings`,
          duration: 3000,
        });
        break;
    }
  }, []);

  const clearNotifications = useCallback(() => {
    setPropertyUpdates([]);
    setNotificationState(prev => ({
      ...prev,
      updateCount: 0
    }));
  }, []);

  useEffect(() => {
    console.log('Setting up real-time property subscriptions...');
    
    // Subscribe to property changes
    const propertyChannel = supabase
      .channel('property-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'properties'
        },
        (payload) => {
          console.log('Property change detected:', payload);
          
          const update: PropertyUpdate = {
            id: (payload.new as any)?.id || (payload.old as any)?.id || 'unknown',
            eventType: payload.eventType as 'INSERT' | 'UPDATE' | 'DELETE',
            new: payload.new,
            old: payload.old
          };
          
          setPropertyUpdates(prev => [update, ...prev.slice(0, 49)]); // Keep last 50 updates
          setNotificationState(prev => ({
            isConnected: true,
            lastUpdate: new Date(),
            updateCount: prev.updateCount + 1
          }));
          
          // Show notification for relevant updates
          if (payload.eventType === 'INSERT' || 
              (payload.eventType === 'UPDATE' && (payload.new as any)?.status === 'approved') ||
              (payload.eventType === 'UPDATE' && (payload.new as any)?.featured && !(payload.old as any)?.featured)) {
            showNotification(update);
          }
        }
      )
      .subscribe((status) => {
        console.log('Property subscription status:', status);
        setNotificationState(prev => ({
          ...prev,
          isConnected: status === 'SUBSCRIBED'
        }));
      });

    return () => {
      console.log('Cleaning up real-time subscriptions...');
      supabase.removeChannel(propertyChannel);
      setNotificationState(prev => ({
        ...prev,
        isConnected: false
      }));
    };
  }, [showNotification]);

  return {
    notificationState,
    propertyUpdates,
    clearNotifications,
    isConnected: notificationState.isConnected
  };
};
