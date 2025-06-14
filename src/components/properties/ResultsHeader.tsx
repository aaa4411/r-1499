
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal, Grid3X3, LayoutGrid } from "lucide-react";
import { PropertyType } from "@/types/property";
import { FilterSidebar } from "./FilterSidebar";

interface ResultsHeaderProps {
  propertiesCount: number;
  searchQuery: string;
  propertyType: PropertyType;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  showMobileFilters: boolean;
  setShowMobileFilters: (show: boolean) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  bedrooms: string;
  setBedrooms: (value: string) => void;
  bathrooms: string;
  setBathrooms: (value: string) => void;
  minArea: number | null;
  setMinArea: (value: number | null) => void;
  maxArea: number | null;
  setMaxArea: (value: number | null) => void;
  setPropertyType: (type: PropertyType) => void;
  resetFilters: () => void;
}

const ResultsHeader = ({
  propertiesCount,
  searchQuery,
  propertyType,
  viewMode,
  setViewMode,
  sortBy,
  setSortBy,
  showMobileFilters,
  setShowMobileFilters,
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
  setPropertyType,
  resetFilters,
}: ResultsHeaderProps) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-sm border border-white/20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-estate-800 font-bold text-xl">
              {propertiesCount} {propertiesCount === 1 ? 'Property' : 'Properties'}
            </p>
            <p className="text-estate-500 text-sm">
              {searchQuery ? `Found for "${searchQuery}"` : 'Available now'}
            </p>
          </div>
          {propertyType !== "all" && (
            <Badge variant="secondary" className="bg-estate-100 text-estate-700">
              {propertyType === "sale" ? "For Sale" : "For Rent"}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-8 px-3"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-8 px-3"
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile filters button */}
          <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="pt-6">
                <FilterSidebar 
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  bedrooms={bedrooms}
                  setBedrooms={setBedrooms}
                  bathrooms={bathrooms}
                  setBathrooms={setBathrooms}
                  minArea={minArea}
                  setMinArea={setMinArea}
                  maxArea={maxArea}
                  setMaxArea={setMaxArea}
                  propertyType={propertyType}
                  setPropertyType={setPropertyType}
                  resetFilters={resetFilters}
                />
              </div>
            </SheetContent>
          </Sheet>

          {/* Sort dropdown */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[180px] bg-white border-gray-200">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ResultsHeader;
