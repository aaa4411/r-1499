
import { useCallback, useMemo } from "react";
import { Property, PropertyType } from "@/types/property";
import { allProperties } from "@/data/properties";
import { parsePrice } from "@/utils/priceUtils";

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

export const useLocalPropertyFilter = (filterParams: FilterParams) => {
  const filterDeps = useMemo(() => filterParams, [
    filterParams.debouncedSearch,
    filterParams.propertyType,
    filterParams.priceRange,
    filterParams.bedrooms,
    filterParams.bathrooms,
    filterParams.minArea,
    filterParams.maxArea,
    filterParams.sortBy
  ]);

  const filterLocalData = useCallback(() => {
    let filtered = [...allProperties];

    if (filterDeps.debouncedSearch) {
      const lowerSearch = filterDeps.debouncedSearch.toLowerCase();
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(lowerSearch) ||
        property.title.toLowerCase().includes(lowerSearch)
      );
    }
    
    // Price filtering with early return for better performance
    filtered = filtered.filter(property => {
      const numericPrice = parsePrice(property.price);
      return numericPrice >= filterDeps.priceRange[0] && numericPrice <= filterDeps.priceRange[1];
    });
    
    if (filterDeps.bedrooms && filterDeps.bedrooms !== "any") {
      filtered = filtered.filter(property => 
        filterDeps.bedrooms === "5+" 
          ? property.bedrooms >= 5
          : property.bedrooms === parseInt(filterDeps.bedrooms)
      );
    }
    
    if (filterDeps.bathrooms && filterDeps.bathrooms !== "any") {
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
          const priceA = parsePrice(a.price);
          const priceB = parsePrice(b.price);
          return priceA - priceB;
        });
        break;
      case "price-high":
        filtered.sort((a, b) => {
          const priceA = parsePrice(a.price);
          const priceB = parsePrice(b.price);
          return priceB - priceA;
        });
        break;
    }
    
    return filtered;
  }, [filterDeps]);

  return { filterLocalData };
};
