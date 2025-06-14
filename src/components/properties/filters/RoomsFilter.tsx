
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface RoomsFilterProps {
  bedrooms: string;
  setBedrooms: (value: string) => void;
  bathrooms: string;
  setBathrooms: (value: string) => void;
}

export const RoomsFilter = ({ bedrooms, setBedrooms, bathrooms, setBathrooms }: RoomsFilterProps) => {
  const [isRoomsOpen, setIsRoomsOpen] = useState(true);

  return (
    <Collapsible open={isRoomsOpen} onOpenChange={setIsRoomsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="flex w-full justify-between p-0 h-auto font-normal hover:bg-estate-50 transition-colors duration-200">
          <span className="text-sm font-medium text-estate-700">Bedrooms & Bathrooms</span>
          {isRoomsOpen ? 
            <ChevronUp className="h-4 w-4 transition-transform duration-200" /> : 
            <ChevronDown className="h-4 w-4 transition-transform duration-200" />
          }
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-3 space-y-4 animate-accordion-down">
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-estate-600">Bedrooms</h4>
          <Select value={bedrooms} onValueChange={setBedrooms}>
            <SelectTrigger className="w-full transition-all duration-200 hover:border-estate-300 focus:border-estate-400">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50 border shadow-lg">
              <SelectItem value="any" className="hover:bg-estate-50 cursor-pointer">Any</SelectItem>
              <SelectItem value="1" className="hover:bg-estate-50 cursor-pointer">1</SelectItem>
              <SelectItem value="2" className="hover:bg-estate-50 cursor-pointer">2</SelectItem>
              <SelectItem value="3" className="hover:bg-estate-50 cursor-pointer">3</SelectItem>
              <SelectItem value="4" className="hover:bg-estate-50 cursor-pointer">4</SelectItem>
              <SelectItem value="5+" className="hover:bg-estate-50 cursor-pointer">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-estate-600">Bathrooms</h4>
          <Select value={bathrooms} onValueChange={setBathrooms}>
            <SelectTrigger className="w-full transition-all duration-200 hover:border-estate-300 focus:border-estate-400">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50 border shadow-lg">
              <SelectItem value="any" className="hover:bg-estate-50 cursor-pointer">Any</SelectItem>
              <SelectItem value="1" className="hover:bg-estate-50 cursor-pointer">1</SelectItem>
              <SelectItem value="2" className="hover:bg-estate-50 cursor-pointer">2</SelectItem>
              <SelectItem value="3" className="hover:bg-estate-50 cursor-pointer">3</SelectItem>
              <SelectItem value="4+" className="hover:bg-estate-50 cursor-pointer">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
