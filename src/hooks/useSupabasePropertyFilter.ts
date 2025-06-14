
import { useCallback } from "react";
import { Property, PropertyType } from "@/types/property";
import { supabase } from "@/lib/supabase";

interface FilterParams {
  debouncedSearch: string;
  propertyType: PropertyType;
  priceRange: [number, number];
  bedrooms: string;
  bathrooms: string;
  minArea: number | null;
  maxArea: number | null;
  sortBy: string;
}

export const useSupabasePropertyFilter = (filterParams: FilterParams) => {
  const fetchFromSupabase = useCallback(async (): Promise<Property[] | null> => {
    try {
      let query = supabase.from('properties').select('*');
      
      if (filterParams.debouncedSearch) {
        query = query.or(`location.ilike.%${filterParams.debouncedSearch}%,title.ilike.%${filterParams.debouncedSearch}%`);
      }
      
      if (filterParams.propertyType !== "all") {
        query = query.eq('type', filterParams.propertyType);
      }
      
      query = query.gte('price', filterParams.priceRange[0]).lte('price', filterParams.priceRange[1]);
      
      if (filterParams.bedrooms && filterParams.bedrooms !== "any") {
        if (filterParams.bedrooms === "5+") {
          query = query.gte('bedrooms', 5);
        } else {
          query = query.eq('bedrooms', parseInt(filterParams.bedrooms));
        }
      }

      if (filterParams.bathrooms && filterParams.bathrooms !== "any") {
        if (filterParams.bathrooms === "4+") {
          query = query.gte('bathrooms', 4);
        } else {
          query = query.eq('bathrooms', parseInt(filterParams.bathrooms));
        }
      }

      if (filterParams.minArea) {
        query = query.gte('area', filterParams.minArea);
      }

      if (filterParams.maxArea) {
        query = query.lte('area', filterParams.maxArea);
      }
      
      // Handle sorting
      switch (filterParams.sortBy) {
        case "price-low":
          query = query.order('price', { ascending: true });
          break;
        case "price-high":
          query = query.order('price', { ascending: false });
          break;
        case "newest":
          query = query.order('created_at', { ascending: false });
          break;
        case "oldest":
          query = query.order('created_at', { ascending: true });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;
      
      if (!error && data) {
        return data as any;
      }
    } catch (err) {
      console.log("Supabase fetch error:", err);
    }
    return null;
  }, [
    filterParams.debouncedSearch,
    filterParams.propertyType,
    filterParams.priceRange,
    filterParams.bedrooms,
    filterParams.bathrooms,
    filterParams.minArea,
    filterParams.maxArea,
    filterParams.sortBy
  ]);

  return { fetchFromSupabase };
};
