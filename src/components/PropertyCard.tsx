
import { MapPin, Bed, Bath, Square, Home, Tag, Scale, Video, Heart } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import { Button } from "./ui/button";
import VirtualTourModal from "./property/VirtualTourModal";
import { PropertyStatusBadge } from "./property/PropertyStatusBadge";
import { memo } from "react";

interface PropertyCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
  id?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  type?: 'sale' | 'rent';
  status?: string;
  featured?: boolean;
  onAddToCompare?: (property: any) => void;
  images?: string[];
  showAdminBadges?: boolean;
}

const PropertyCard = memo(({ 
  image, 
  title, 
  location, 
  price, 
  id = "1",
  bedrooms,
  bathrooms,
  area,
  type = 'sale',
  status = 'approved',
  featured = false,
  onAddToCompare,
  images = [],
  showAdminBadges = false
}: PropertyCardProps) => {
  const displayPrice = type === 'rent' ? `${price}/month` : price;
  const propertyData = { id, image, title, location, price, bedrooms, bathrooms, area, type, status, featured };

  const handleAddToCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCompare) {
      onAddToCompare(propertyData);
    }
  };

  return (
    <Link to={`/property/${id}`} className="block group">
      <Card className="overflow-hidden cursor-pointer transition-all duration-300 border-0 bg-white transform hover:-translate-y-2 hover:shadow-2xl will-change-transform h-full">
        <CardContent className="p-0 h-full flex flex-col">
          <div className="relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[4/3] overflow-hidden">
            <img
              src={image}
              alt={title}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 will-change-transform"
              loading="lazy"
              decoding="async"
            />
            
            {/* Gradient overlay that appears on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Status badges - Top left */}
            <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1">
              {/* Property type badge */}
              <div className={`${type === 'sale' ? 'bg-blue-500/95' : 'bg-green-500/95'} backdrop-blur-sm text-white px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-lg flex items-center gap-1 shadow-sm transform group-hover:scale-105 transition-transform duration-200`}>
                {type === 'sale' ? <Tag className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Home className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                <span className="hidden xs:inline">{type === 'sale' ? 'For Sale' : 'For Rent'}</span>
              </div>
              
              {/* Status badge - show for admins or non-approved properties */}
              {(showAdminBadges || status !== 'approved' || featured) && (
                <PropertyStatusBadge 
                  status={status as any}
                  featured={featured}
                  size="sm"
                  className="transform group-hover:scale-105 transition-transform duration-200"
                />
              )}
            </div>
            
            {/* Price Badge - Top right */}
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/95 backdrop-blur-sm text-estate-800 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-lg shadow-sm transform group-hover:scale-105 transition-transform duration-200">
              {displayPrice}
            </div>
            
            {/* Mobile-first action buttons */}
            <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-1 sm:gap-2">
                  <VirtualTourModal 
                    propertyTitle={title}
                    images={images.length > 0 ? images : [image]}
                  />
                  {onAddToCompare && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAddToCompare}
                      className="bg-white/95 backdrop-blur-sm hover:bg-white shadow-sm flex items-center gap-1 px-2 sm:px-3 text-xs sm:text-sm h-7 sm:h-8"
                    >
                      <Scale className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span className="hidden sm:inline">Compare</span>
                    </Button>
                  )}
                </div>
                
                <div className="flex items-center">
                  <FavoriteButton 
                    propertyId={id} 
                    variant="outline" 
                    size="sm"
                    className="bg-white/95 backdrop-blur-sm hover:bg-white shadow-sm h-7 sm:h-8 w-7 sm:w-8 p-0"
                    showText={false}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-3 sm:p-4 md:p-5 flex-1 flex flex-col">
            {/* Title - Responsive font size */}
            <h3 className="text-base sm:text-lg font-medium text-estate-800 line-clamp-2 group-hover:text-estate-600 transition-colors mb-2 leading-snug">
              {title}
            </h3>
            
            {/* Location */}
            <div className="flex items-start mt-1 text-estate-500 mb-3 sm:mb-4">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 flex-shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm line-clamp-2 leading-relaxed">{location}</span>
            </div>
            
            {/* Property details - Better mobile layout */}
            {(bedrooms !== undefined || bathrooms !== undefined || area !== undefined) && (
              <div className="mt-auto">
                <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3 sm:pt-4 border-t border-gray-100 text-estate-600">
                  {bedrooms !== undefined && (
                    <div className="flex flex-col sm:flex-row items-center sm:justify-center text-center">
                      <Bed className="w-3.5 h-3.5 sm:w-4 sm:h-4 mb-1 sm:mb-0 sm:mr-1" />
                      <span className="text-xs sm:text-xs font-medium">{bedrooms} {bedrooms === 1 ? 'Bed' : 'Beds'}</span>
                    </div>
                  )}
                  
                  {bathrooms !== undefined && (
                    <div className="flex flex-col sm:flex-row items-center sm:justify-center text-center">
                      <Bath className="w-3.5 h-3.5 sm:w-4 sm:h-4 mb-1 sm:mb-0 sm:mr-1" />
                      <span className="text-xs sm:text-xs font-medium">{bathrooms} {bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                    </div>
                  )}
                  
                  {area !== undefined && (
                    <div className="flex flex-col sm:flex-row items-center sm:justify-center text-center">
                      <Square className="w-3.5 h-3.5 sm:w-4 sm:h-4 mb-1 sm:mb-0 sm:mr-1" />
                      <span className="text-xs sm:text-xs font-medium">{area.toLocaleString()} sq ft</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
});

PropertyCard.displayName = "PropertyCard";

export default PropertyCard;
