
import { FilterSidebar } from "./FilterSidebar";
import { PropertyType } from "@/types/property";

interface PropertiesLayoutProps {
  children: React.ReactNode;
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
  propertyType: PropertyType;
  setPropertyType: (type: PropertyType) => void;
  resetFilters: () => void;
}

const PropertiesLayout = ({
  children,
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
  resetFilters,
}: PropertiesLayoutProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <div className="lg:w-80 flex-shrink-0">
        <div className="sticky top-32">
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
      </div>
      
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </div>
  );
};

export default PropertiesLayout;
