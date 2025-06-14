
import React, { useState } from 'react';
import { Search, Filter, X, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Badge } from '@/components/ui/badge';

interface MobileSearchBarProps {
  onSearch: (query: string) => void;
  onFilterOpen: () => void;
  activeFilters?: number;
}

const MobileSearchBar = ({ onSearch, onFilterOpen, activeFilters = 0 }: MobileSearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = () => {
    onSearch(searchQuery);
    setIsSearchOpen(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <>
      {/* Compact Search Bar */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <Drawer open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DrawerTrigger asChild>
              <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3 cursor-pointer">
                <Search className="h-5 w-5 text-gray-400" />
                <span className="text-gray-500 text-sm">
                  {searchQuery || "Search properties..."}
                </span>
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 ml-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearSearch();
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Search Properties</DrawerTitle>
              </DrawerHeader>
              <div className="px-4 pb-6">
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Enter location, property type..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      />
                    </div>
                    <Button onClick={handleSearch} className="bg-estate-600 hover:bg-estate-700">
                      Search
                    </Button>
                  </div>
                  
                  {/* Popular Searches */}
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Popular Searches</div>
                    <div className="flex flex-wrap gap-2">
                      {['Downtown', 'Villa', 'Apartment', 'Luxury', 'Beachfront'].map((term) => (
                        <Button
                          key={term}
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs"
                          onClick={() => {
                            setSearchQuery(term);
                            onSearch(term);
                            setIsSearchOpen(false);
                          }}
                        >
                          <MapPin className="h-3 w-3 mr-1" />
                          {term}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>

          <Button
            variant="outline"
            size="sm"
            className="relative"
            onClick={onFilterOpen}
          >
            <Filter className="h-4 w-4" />
            {activeFilters > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
                {activeFilters}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default MobileSearchBar;
