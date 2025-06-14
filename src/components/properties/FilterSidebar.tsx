
import { useState } from "react";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
  propertyType: "sale" | "rent" | "all";
  setPropertyType: React.Dispatch<React.SetStateAction<"sale" | "rent" | "all">>;
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
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  
  const formatPrice = (value: number) => {
    return `$${(value / 1000000).toFixed(1)}M`;
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-estate-700">Price Range</h3>
        <div className="px-2">
          <Slider 
            defaultValue={priceRange} 
            value={priceRange}
            max={10000000} 
            step={100000} 
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="my-6"
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-estate-600">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-estate-700">Bedrooms</h3>
        <Select value={bedrooms} onValueChange={setBedrooms}>
          <SelectTrigger className="w-full transition-all duration-200 hover:border-estate-300 focus:border-estate-400">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent className="bg-white z-50 border shadow-lg">
            <SelectItem value="" className="hover:bg-estate-50 cursor-pointer">Any</SelectItem>
            <SelectItem value="1" className="hover:bg-estate-50 cursor-pointer">1</SelectItem>
            <SelectItem value="2" className="hover:bg-estate-50 cursor-pointer">2</SelectItem>
            <SelectItem value="3" className="hover:bg-estate-50 cursor-pointer">3</SelectItem>
            <SelectItem value="4" className="hover:bg-estate-50 cursor-pointer">4</SelectItem>
            <SelectItem value="5+" className="hover:bg-estate-50 cursor-pointer">5+</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-estate-700">Bathrooms</h3>
        <Select value={bathrooms} onValueChange={setBathrooms}>
          <SelectTrigger className="w-full transition-all duration-200 hover:border-estate-300 focus:border-estate-400">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent className="bg-white z-50 border shadow-lg">
            <SelectItem value="" className="hover:bg-estate-50 cursor-pointer">Any</SelectItem>
            <SelectItem value="1" className="hover:bg-estate-50 cursor-pointer">1</SelectItem>
            <SelectItem value="2" className="hover:bg-estate-50 cursor-pointer">2</SelectItem>
            <SelectItem value="3" className="hover:bg-estate-50 cursor-pointer">3</SelectItem>
            <SelectItem value="4+" className="hover:bg-estate-50 cursor-pointer">4+</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-estate-700">Property Type</h3>
        <Select 
          value={propertyType} 
          onValueChange={(value: "sale" | "rent" | "all") => setPropertyType(value)}
        >
          <SelectTrigger className="w-full transition-all duration-200 hover:border-estate-300 focus:border-estate-400">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent className="bg-white z-50 border shadow-lg">
            <SelectItem value="all" className="hover:bg-estate-50 cursor-pointer">All Types</SelectItem>
            <SelectItem value="sale" className="hover:bg-estate-50 cursor-pointer">For Sale</SelectItem>
            <SelectItem value="rent" className="hover:bg-estate-50 cursor-pointer">For Rent</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen} className="border-t pt-4">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="flex w-full justify-between p-0 h-auto font-normal hover:bg-estate-50 transition-colors duration-200">
            <span className="text-sm font-medium text-estate-700">Advanced Filters</span>
            {isAdvancedOpen ? 
              <ChevronUp className="h-4 w-4 transition-transform duration-200" /> : 
              <ChevronDown className="h-4 w-4 transition-transform duration-200" />
            }
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-4 animate-accordion-down">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-estate-700">Square Footage</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Input
                  type="number"
                  placeholder="Min"
                  className="w-full transition-all duration-200 hover:border-estate-300 focus:border-estate-400"
                  value={minArea || ''}
                  onChange={(e) => setMinArea(e.target.value ? Number(e.target.value) : null)}
                />
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Max"
                  className="w-full transition-all duration-200 hover:border-estate-300 focus:border-estate-400"
                  value={maxArea || ''}
                  onChange={(e) => setMaxArea(e.target.value ? Number(e.target.value) : null)}
                />
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      <Button 
        className="w-full mt-6 bg-estate-800 hover:bg-estate-700 transition-all duration-200 hover:shadow-md"
        variant="outline"
        onClick={() => {
          resetFilters();
          setIsOpen(false);
        }}
      >
        Reset Filters
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
          <SheetContent className="w-full sm:w-80 bg-white">
            <SheetHeader className="mb-6">
              <SheetTitle className="text-estate-800">Filters</SheetTitle>
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
              Filters
            </h2>
            <FilterContent />
          </div>
        </div>
      </div>
    </>
  );
};
