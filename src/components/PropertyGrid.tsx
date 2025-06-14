
import PropertyCard from "./PropertyCard";
import { useEffect, useState, memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Property as SupabaseProperty } from "@/lib/supabase";
import { Property } from "@/types/property";

// Memoized loading skeleton component
const LoadingSkeleton = memo(() => (
  <div className="animate-pulse bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-[350px] sm:h-[400px] shadow-sm"></div>
));

LoadingSkeleton.displayName = "LoadingSkeleton";

// Function to convert Supabase property to frontend property
export const mapSupabasePropertyToProperty = (property: SupabaseProperty): Property => {
  return {
    id: property.id,
    image: property.images && property.images.length > 0 
      ? property.images[0] 
      : "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    title: property.title,
    location: property.location,
    price: `$${property.price.toLocaleString()}`,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    area: property.area,
    type: property.type,
  };
};

interface PropertyGridProps {
  properties?: Property[] | SupabaseProperty[];
  loading?: boolean;
  filterType?: 'sale' | 'rent' | 'all';
  fromSupabase?: boolean;
  onAddToCompare?: (property: Property) => void;
}

const PropertyGrid = memo(({ 
  properties: propProperties, 
  loading = false, 
  filterType = 'all',
  fromSupabase = false,
  onAddToCompare
}: PropertyGridProps) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(loading);
  
  useEffect(() => {
    if (loading) {
      setIsLoading(true);
      return;
    }

    // Use requestAnimationFrame for smoother loading
    const loadProperties = () => {
      if (propProperties) {
        if (fromSupabase) {
          // Convert Supabase properties to frontend properties
          const convertedProperties = (propProperties as SupabaseProperty[]).map(
            mapSupabasePropertyToProperty
          );
          setProperties(convertedProperties);
        } else {
          setProperties(propProperties as Property[]);
        }
      } else {
        // Default properties for demo
        setProperties([
          {
            id: "1",
            image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&q=75&fit=crop&w=800",
            title: "Forest Retreat",
            location: "Aspen, Colorado",
            price: "$2,450,000",
            bedrooms: 4,
            bathrooms: 3,
            area: 3200,
            type: 'sale'
          },
          {
            id: "2",
            image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&q=75&fit=crop&w=800",
            title: "Modern Villa",
            location: "Beverly Hills, CA",
            price: "$5,900,000",
            bedrooms: 6,
            bathrooms: 7,
            area: 6500,
            type: 'sale'
          },
          {
            id: "3",
            image: "https://images.unsplash.com/photo-1433832597046-4f10e10ac764?auto=format&q=75&fit=crop&w=800",
            title: "Urban Penthouse for Rent",
            location: "Manhattan, NY",
            price: "$15,000",
            bedrooms: 3,
            bathrooms: 3.5,
            area: 2800,
            type: 'rent'
          },
          {
            id: "4",
            image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&q=75&fit=crop&w=800",
            title: "Lake House",
            location: "Lake Tahoe, NV",
            price: "$4,200,000",
            bedrooms: 5,
            bathrooms: 4,
            area: 3900,
            type: 'sale'
          },
        ]);
      }
      setIsLoading(false);
    };

    // Optimized loading with reduced delay
    const timer = setTimeout(() => {
      requestAnimationFrame(loadProperties);
    }, 150);
    
    return () => clearTimeout(timer);
  }, [propProperties, fromSupabase, loading]);

  const filteredProperties = filterType === 'all' 
    ? properties 
    : properties.filter(property => property.type === filterType);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto px-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="animate-in fade-in duration-300" style={{ animationDelay: `${i * 50}ms` }}>
            <LoadingSkeleton />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto px-4 pb-20">
      {filteredProperties.map((property, index) => (
        <div 
          key={property.id} 
          className="animate-in fade-in duration-500 will-change-transform hover:z-10 relative" 
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <PropertyCard 
            {...property} 
            type={property.type} 
            onAddToCompare={onAddToCompare}
          />
        </div>
      ))}
    </div>
  );
});

PropertyGrid.displayName = "PropertyGrid";

export default PropertyGrid;
