
import { useState, useEffect } from "react";

export const useDebounceSearch = (searchQuery: string, delay: number = 300) => {
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, delay);
    return () => clearTimeout(timer);
  }, [searchQuery, delay]);

  return debouncedSearch;
};
