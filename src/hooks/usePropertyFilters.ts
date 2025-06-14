
import { useState, useEffect, useCallback } from "react";
import { Property, PropertyType } from "@/types/property";
import { allProperties } from "@/data/properties";
import { useDebounceSearch } from "./useDebounceSearch";
import { useLocalPropertyFilter } from "./useLocalPropertyFilter";
import { useSupabasePropertyFilter } from "./useSupabasePropertyFilter";

export const usePropertyFilters = (initialSearch: string, initialType: PropertyType) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [propertyType, setPropertyType] = useState<PropertyType>(initialType);
  const [priceRange, setPriceRange] = useState<[number, number]>([1000000, 8000000]);
  const [bedrooms, setBedrooms] = useState<string>("any");
  const [bathrooms, setBathrooms] = useState<string>("any");
  const [minArea, setMinArea] = useState<number | null>(null);
  const [maxArea, setMaxArea] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(allProperties);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounceSearch(searchQuery);

  const filterParams = {
    debouncedSearch,
    propertyType,
    priceRange,
    bedrooms,
    bathrooms,
    minArea,
    maxArea,
    sortBy
  };

  const { filterLocalData } = useLocalPropertyFilter(filterParams);
  const { fetchFromSupabase } = useSupabasePropertyFilter(filterParams);

  useEffect(() => {
    const executeFiltering = async () => {
      setLoading(true);
      
      // Try Supabase first with timeout
      const supabaseResult = await Promise.race([
        fetchFromSupabase(),
        new Promise<null>(resolve => setTimeout(() => resolve(null), 2000))
      ]);
      
      if (supabaseResult) {
        setFilteredProperties(supabaseResult);
      } else {
        // Fall back to local filtering
        const localResults = filterLocalData();
        setFilteredProperties(localResults);
      }
      
      setLoading(false);
    };

    executeFiltering();
  }, [fetchFromSupabase, filterLocalData]);

  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setPriceRange([1000000, 8000000]);
    setBedrooms("any");
    setBathrooms("any");
    setMinArea(null);
    setMaxArea(null);
    setPropertyType("all");
    setSortBy("newest");
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    propertyType,
    setPropertyType,
    priceRange,
    setPriceRange,
    bedrooms,
    setBedrooms,
    bathrooms,
    setBathrooms,
    minArea,
    setMinArea,
    maxArea,
    setMaxArea,
    sortBy,
    setSortBy,
    filteredProperties,
    resetFilters,
    loading,
  };
};
