
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Scale, Eye } from 'lucide-react';
import { Property } from '@/types/property';

interface PropertyComparisonBarProps {
  properties: Property[];
  onRemoveProperty: (propertyId: string) => void;
  onCompare: () => void;
  onClearAll: () => void;
}

const PropertyComparisonBar = ({ 
  properties, 
  onRemoveProperty, 
  onCompare, 
  onClearAll 
}: PropertyComparisonBarProps) => {
  if (properties.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Compare Properties</span>
            <Badge variant="outline">{properties.length}/3</Badge>
          </div>
          
          <div className="flex gap-2 max-w-md overflow-x-auto">
            {properties.map((property) => (
              <div 
                key={property.id} 
                className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1 whitespace-nowrap"
              >
                <span className="text-sm truncate max-w-24">{property.title}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 hover:bg-red-100"
                  onClick={() => onRemoveProperty(property.id)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onClearAll}>
            Clear All
          </Button>
          <Button 
            onClick={onCompare} 
            disabled={properties.length < 2}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Eye className="w-4 h-4 mr-2" />
            Compare ({properties.length})
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyComparisonBar;
