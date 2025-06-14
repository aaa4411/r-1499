
import { useState, useEffect, useCallback } from 'react';
import { type Property } from '@/lib/supabase';
import * as propertyService from '@/services/propertyService';
import { uploadPropertyImage } from '@/services/storageService';
import { supabase } from '@/lib/supabase';

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    const { data, error } = await propertyService.fetchProperties();
    setProperties(data);
    if (error) setError(error);
    setLoading(false);
  }, []);

  const getPropertyById = async (id: string) => {
    setLoading(true);
    const { data } = await propertyService.getPropertyById(id);
    setLoading(false);
    return data;
  };

  const addProperty = async (property: any) => {
    setLoading(true);
    const { data } = await propertyService.addProperty(property);
    setLoading(false);
    return data;
  };

  const updateProperty = async (id: string, updates: any) => {
    setLoading(true);
    const { data } = await propertyService.updateProperty(id, updates);
    setLoading(false);
    return data;
  };

  const deleteProperty = async (id: string) => {
    setLoading(true);
    const { success } = await propertyService.deleteProperty(id);
    setLoading(false);
    return success;
  };

  // Real-time property updates
  useEffect(() => {
    console.log('Setting up real-time property updates...');
    
    // Initial fetch
    fetchProperties();

    // Set up real-time subscription
    const channel = supabase
      .channel('properties-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'properties'
        },
        (payload) => {
          console.log('Real-time property update:', payload);
          
          setProperties(currentProperties => {
            const newProperties = [...currentProperties];
            
            switch (payload.eventType) {
              case 'INSERT':
                // Add new property if it doesn't exist
                if (!newProperties.find(p => p.id === payload.new.id)) {
                  newProperties.unshift(payload.new as Property);
                }
                break;
                
              case 'UPDATE':
                // Update existing property
                const updateIndex = newProperties.findIndex(p => p.id === payload.new.id);
                if (updateIndex !== -1) {
                  newProperties[updateIndex] = payload.new as Property;
                }
                break;
                
              case 'DELETE':
                // Remove deleted property
                return newProperties.filter(p => p.id !== payload.old.id);
            }
            
            return newProperties;
          });
        }
      )
      .subscribe((status) => {
        console.log('Properties subscription status:', status);
      });

    return () => {
      console.log('Cleaning up properties subscription...');
      supabase.removeChannel(channel);
    };
  }, [fetchProperties]);

  return {
    properties,
    loading,
    error,
    fetchProperties,
    getPropertyById,
    addProperty,
    updateProperty,
    deleteProperty,
    uploadPropertyImage,
  };
};
