
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PropertyType } from "@/types/property";

interface PropertyTypeFilterProps {
  propertyType: PropertyType;
  setPropertyType: React.Dispatch<React.SetStateAction<PropertyType>>;
}

export const PropertyTypeFilter = ({ propertyType, setPropertyType }: PropertyTypeFilterProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-estate-700">Property Type</h3>
      <Select 
        value={propertyType} 
        onValueChange={(value: PropertyType) => setPropertyType(value)}
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
  );
};
