
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useAdminRoles } from '@/hooks/useAdminRoles';
import { toast } from '@/hooks/use-toast';

interface AdminProperty {
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

export const useAdminProperties = () => {
  const { user } = useAuth();
  const { isAdmin, logAdminActivity } = useAdminRoles();
  const [properties, setProperties] = useState<AdminProperty[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all properties for admin review
  const fetchAllProperties = async () => {
    if (!isAdmin()) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error: any) {
      console.error('Error fetching properties:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch properties',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Update property status
  const updatePropertyStatus = async (propertyId: string, status: string, adminNotes?: string) => {
    if (!isAdmin()) return false;

    try {
      const updates: any = {
        status,
        reviewed_by: user?.id,
        reviewed_at: new Date().toISOString()
      };

      if (adminNotes) {
        updates.admin_notes = adminNotes;
      }

      const { error } = await supabase
        .from('properties')
        .update(updates)
        .eq('id', propertyId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Property status updated to ${status}`,
      });

      await logAdminActivity('update_property_status', 'property', propertyId, { status, adminNotes });
      fetchAllProperties();
      return true;
    } catch (error: any) {
      console.error('Error updating property status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update property status',
        variant: 'destructive',
      });
      return false;
    }
  };

  // Toggle property featured status
  const togglePropertyFeatured = async (propertyId: string, featured: boolean) => {
    if (!isAdmin()) return false;

    try {
      const { error } = await supabase
        .from('properties')
        .update({ 
          featured,
          reviewed_by: user?.id,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', propertyId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Property ${featured ? 'featured' : 'unfeatured'} successfully`,
      });

      await logAdminActivity('toggle_featured', 'property', propertyId, { featured });
      fetchAllProperties();
      return true;
    } catch (error: any) {
      console.error('Error toggling featured status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update featured status',
        variant: 'destructive',
      });
      return false;
    }
  };

  // Delete property (admin only)
  const deleteProperty = async (propertyId: string) => {
    if (!isAdmin()) return false;

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', propertyId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Property deleted successfully',
      });

      await logAdminActivity('delete_property', 'property', propertyId);
      fetchAllProperties();
      return true;
    } catch (error: any) {
      console.error('Error deleting property:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete property',
        variant: 'destructive',
      });
      return false;
    }
  };

  // Get properties by status
  const getPropertiesByStatus = (status: string) => {
    return properties.filter(property => property.status === status);
  };

  // Get featured properties
  const getFeaturedProperties = () => {
    return properties.filter(property => property.featured);
  };

  useEffect(() => {
    if (isAdmin()) {
      fetchAllProperties();
    }
  }, [isAdmin]);

  return {
    properties,
    loading,
    fetchAllProperties,
    updatePropertyStatus,
    togglePropertyFeatured,
    deleteProperty,
    getPropertiesByStatus,
    getFeaturedProperties
  };
};
