
import { useState, useEffect, useMemo, useCallback } from "react";
import { Property, PropertyType } from "@/types/property";
import { allProperties } from "@/data/properties";
import { supabase } from "@/lib/supabase";

export const usePropertyFilters = (initialSearch: string, initialType: PropertyType) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [propertyType, setPropertyType] = useState<PropertyType>(initialType);
  const [priceRange, setPriceRange] = useState<[number, number]>([1000000, 8000000]);
  const [bedrooms, setBedrooms] = useState<string>("");
  const [bathrooms, setBathrooms] = useState<string>("");
  const [minArea, setMinArea] = useState<number | null>(null);
  const [maxArea, setMaxArea] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(allProperties);
  const [loading, setLoading] = useState(false);

  // Memoize filter dependencies to prevent unnecessary re-renders
  const filterDeps = useMemo(() => ({
    searchQuery,
    propertyType,
    priceRange,
    bedrooms,
    bathrooms,
    minArea,
    maxArea,
    sortBy
  }), [searchQuery, propertyType, priceRange, bedrooms, bathrooms, minArea, maxArea, sortBy]);

  // Debounced search to improve performance
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Optimized local filtering function
  const filterLocalData = useCallback(() => {
    let filtered = [...allProperties];

    if (debouncedSearch) {
      const lowerSearch = debouncedSearch.toLowerCase();
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(lowerSearch) ||
        property.title.toLowerCase().includes(lowerSearch)
      );
    }
    
    // Price filtering with early return for better performance
    filtered = filtered.filter(property => {
      const numericPrice = parseInt(property.price.replace(/[^0-9]/g, ''));
      return numericPrice >= filterDeps.priceRange[0] && numericPrice <= filterDeps.priceRange[1];
    });
    
    if (filterDeps.bedrooms) {
      filtered = filtered.filter(property => 
        filterDeps.bedrooms === "5+" 
          ? property.bedrooms >= 5
          : property.bedrooms === parseInt(filterDeps.bedrooms)
      );
    }
    
    if (filterDeps.bathrooms) {
      filtered = filtered.filter(property => 
        filterDeps.bathrooms === "4+" 
          ? property.bathrooms >= 4
          : property.bathrooms === parseInt(filterDeps.bathrooms)
      );
    }
    
    if (filterDeps.minArea) {
      filtered = filtered.filter(property => property.area >= filterDeps.minArea!);
    }
    
    if (filterDeps.maxArea) {
      filtered = filtered.filter(property => property.area <= filterDeps.maxArea!);
    }
    
    if (filterDeps.propertyType !== "all") {
      filtered = filtered.filter(property => property.type === filterDeps.propertyType);
    }

    // Optimized sorting with memoization
    switch (filterDeps.sortBy) {
      case "price-low":
        filtered.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
          const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
          return priceA - priceB;
        });
        break;
      case "price-high":
        filtered.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
          const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
          return priceB - priceA;
        });
        break;
    }
    
    return filtered;
  }, [debouncedSearch, filterDeps]);

  // Optimized Supabase fetch with better error handling
  const fetchFromSupabase = useCallback(async () => {
    try {
      let query = supabase.from('properties').select('*');
      
      if (debouncedSearch) {
        query = query.or(`location.ilike.%${debouncedSearch}%,title.ilike.%${debouncedSearch}%`);
      }
      
      if (filterDeps.propertyType !== "all") {
        query = query.eq('type', filterDeps.propertyType);
      }
      
      query = query.gte('price', filterDeps.priceRange[0]).lte('price', filterDeps.priceRange[1]);
      
      if (filterDeps.bedrooms) {
        if (filterDeps.bedrooms === "5+") {
          query = query.gte('bedrooms', 5);
        } else {
          query = query.eq('bedrooms', parseInt(filterDeps.bedrooms));
        }
      }

      if (filterDeps.bathrooms) {
        if (filterDeps.bathrooms === "4+") {
          query = query.gte('bathrooms', 4);
        } else {
          query = query.eq('bathrooms', parseInt(filterDeps.bathrooms));
        }
      }

      if (filterDeps.minArea) {
        query = query.gte('area', filterDeps.minArea);
      }

      if (filterDeps.maxArea) {
        query = query.lte('area', filterDeps.maxArea);
      }
      
      // Handle sorting
      switch (filterDeps.sortBy) {
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
        setFilteredProperties(data as any);
        return true;
      }
    } catch (err) {
      console.log("Supabase fetch error:", err);
    }
    return false;
  }, [debouncedSearch, filterDeps]);

  useEffect(() => {
    const executeFiltering = async () => {
      setLoading(true);
      
      // Try Supabase first with timeout
      const supabaseSuccess = await Promise.race([
        fetchFromSupabase(),
        new Promise(resolve => setTimeout(() => resolve(false), 2000))
      ]);
      
      if (!supabaseSuccess) {
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
    setBedrooms("");
    setBathrooms("");
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
