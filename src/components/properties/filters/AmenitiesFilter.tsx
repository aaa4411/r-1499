
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export const AmenitiesFilter = () => {
  const [isAmenitiesOpen, setIsAmenitiesOpen] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  
  const amenities = [
    { id: "pool", label: "Swimming Pool" },
    { id: "garage", label: "Garage" },
    { id: "garden", label: "Garden" },
    { id: "gym", label: "Home Gym" },
    { id: "office", label: "Home Office" },
    { id: "fireplace", label: "Fireplace" },
    { id: "balcony", label: "Balcony" },
    { id: "terrace", label: "Terrace" }
  ];

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenityId)
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  return (
    <Collapsible open={isAmenitiesOpen} onOpenChange={setIsAmenitiesOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="flex w-full justify-between p-0 h-auto font-normal hover:bg-estate-50 transition-colors duration-200">
          <span className="text-sm font-medium text-estate-700">Amenities</span>
          {isAmenitiesOpen ? 
            <ChevronUp className="h-4 w-4 transition-transform duration-200" /> : 
            <ChevronDown className="h-4 w-4 transition-transform duration-200" />
          }
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-3 space-y-2 animate-accordion-down">
        <div className="grid grid-cols-2 gap-2">
          {amenities.map((amenity) => (
            <div key={amenity.id} className="flex items-center space-x-2">
              <Checkbox
                id={amenity.id}
                checked={selectedAmenities.includes(amenity.id)}
                onCheckedChange={() => toggleAmenity(amenity.id)}
                className="data-[state=checked]:bg-estate-600 data-[state=checked]:border-estate-600"
              />
              <label
                htmlFor={amenity.id}
                className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {amenity.label}
              </label>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
