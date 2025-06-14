
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, MapPin, Bed, Bath, Square, DollarSign } from 'lucide-react';
import { Property } from '@/types/property';

interface PropertyComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  onRemoveProperty: (propertyId: string) => void;
  onClearAll: () => void;
}

const PropertyComparisonModal = ({ 
  isOpen, 
  onClose, 
  properties, 
  onRemoveProperty, 
  onClearAll 
}: PropertyComparisonModalProps) => {
  const comparisonFields = [
    { key: 'price', label: 'Price', icon: DollarSign },
    { key: 'bedrooms', label: 'Bedrooms', icon: Bed },
    { key: 'bathrooms', label: 'Bathrooms', icon: Bath },
    { key: 'area', label: 'Area (sq ft)', icon: Square },
    { key: 'type', label: 'Type', icon: null },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Property Comparison
            <Button variant="outline" size="sm" onClick={onClearAll}>
              Clear All
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="border rounded-lg overflow-hidden">
              <div className="relative">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                  onClick={() => onRemoveProperty(property.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="p-4 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{property.title}</h3>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.location}
                  </div>
                </div>
                
                <div className="space-y-3">
                  {comparisonFields.map((field) => (
                    <div key={field.key} className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        {field.icon && <field.icon className="w-4 h-4 mr-2" />}
                        {field.label}
                      </div>
                      <div className="font-medium">
                        {field.key === 'type' ? (
                          <Badge variant="outline">
                            {property[field.key as keyof Property] === 'sale' ? 'For Sale' : 'For Rent'}
                          </Badge>
                        ) : field.key === 'area' ? (
                          `${(property[field.key as keyof Property] as number)?.toLocaleString() || 'N/A'}`
                        ) : (
                          property[field.key as keyof Property] || 'N/A'
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyComparisonModal;
