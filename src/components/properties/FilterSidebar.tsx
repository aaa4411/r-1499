
import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PropertyType } from "@/types/property";
import { PropertyTypeFilter } from "./filters/PropertyTypeFilter";
import { PriceRangeFilter } from "./filters/PriceRangeFilter";
import { RoomsFilter } from "./filters/RoomsFilter";
import { SquareFootageFilter } from "./filters/SquareFootageFilter";
import { AmenitiesFilter } from "./filters/AmenitiesFilter";

interface FilterSidebarProps {
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  bedrooms: string;
  setBedrooms: (value: string) => void;
  bathrooms: string;
  setBathrooms: (value: string) => void;
  minArea: number | null;
  setMinArea: (value: number | null) => void;
  maxArea: number | null;
  setMaxArea: (value: number | null) => void;
  propertyType: PropertyType;
  setPropertyType: React.Dispatch<React.SetStateAction<PropertyType>>;
  resetFilters: () => void;
}

export const FilterSidebar = ({ 
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
  propertyType, 
  setPropertyType,
  resetFilters
}: FilterSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const FilterContent = () => (
    <div className="space-y-4">
      <PropertyTypeFilter 
        propertyType={propertyType}
        setPropertyType={setPropertyType}
      />

      <PriceRangeFilter 
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />

      <RoomsFilter 
        bedrooms={bedrooms}
        setBedrooms={setBedrooms}
        bathrooms={bathrooms}
        setBathrooms={setBathrooms}
      />

      <SquareFootageFilter 
        minArea={minArea}
        setMinArea={setMinArea}
        maxArea={maxArea}
        setMaxArea={setMaxArea}
      />

      <AmenitiesFilter />
      
      <Button 
        className="w-full mt-6 bg-estate-800 hover:bg-estate-700 transition-all duration-200 hover:shadow-md"
        variant="outline"
        onClick={() => {
          resetFilters();
          setIsOpen(false);
        }}
      >
        Reset All Filters
      </Button>
    </div>
  );

  // Mobile view uses Sheet component
  return (
    <>
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full flex items-center gap-2 hover:bg-estate-50 transition-all duration-200 hover:border-estate-300">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:w-80 bg-white overflow-y-auto">
            <SheetHeader className="mb-6">
              <SheetTitle className="text-estate-800">Advanced Filters</SheetTitle>
            </SheetHeader>
            <FilterContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop view - Enhanced sticky positioning */}
      <div className="hidden lg:block">
        <div className="sticky top-24 z-40">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <h2 className="text-lg font-medium text-estate-800 mb-6 flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-estate-600" />
              Advanced Filters
            </h2>
            <FilterContent />
          </div>
        </div>
      </div>
    </>
  );
};
