
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface PriceRangeFilterProps {
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
}

export const PriceRangeFilter = ({ priceRange, setPriceRange }: PriceRangeFilterProps) => {
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  
  const formatPrice = (value: number) => {
    return `$${(value / 1000000).toFixed(1)}M`;
  };

  return (
    <Collapsible open={isPriceOpen} onOpenChange={setIsPriceOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="flex w-full justify-between p-0 h-auto font-normal hover:bg-estate-50 transition-colors duration-200">
          <span className="text-sm font-medium text-estate-700">Price Range</span>
          {isPriceOpen ? 
            <ChevronUp className="h-4 w-4 transition-transform duration-200" /> : 
            <ChevronDown className="h-4 w-4 transition-transform duration-200" />
          }
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-3 space-y-3 animate-accordion-down">
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
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Min Price"
            className="text-xs"
            value={priceRange[0]}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value <= priceRange[1]) {
                setPriceRange([value, priceRange[1]]);
              }
            }}
          />
          <Input
            type="number"
            placeholder="Max Price"
            className="text-xs"
            value={priceRange[1]}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= priceRange[0]) {
                setPriceRange([priceRange[0], value]);
              }
            }}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
