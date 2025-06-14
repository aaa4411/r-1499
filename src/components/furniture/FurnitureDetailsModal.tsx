
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, X } from "lucide-react";

interface FurnitureItem {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  dimensions: string;
  materials: string;
  features: string[];
  inStock: boolean;
}

interface FurnitureDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: FurnitureItem | null;
  onAddToCart: (id: string) => void;
}

const FurnitureDetailsModal: React.FC<FurnitureDetailsModalProps> = ({
  isOpen,
  onClose,
  item,
  onAddToCart,
}) => {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-estate-800">
            {item.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Price and Stock */}
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-estate-800">
                {item.price}
              </span>
              <Badge variant={item.inStock ? "default" : "secondary"}>
                {item.inStock ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    In Stock
                  </>
                ) : (
                  <>
                    <X className="w-4 h-4 mr-1" />
                    Out of Stock
                  </>
                )}
              </Badge>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>

            <Separator />

            {/* Specifications */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Specifications</h3>
              
              <div>
                <h4 className="font-medium mb-1">Dimensions</h4>
                <p className="text-gray-600">{item.dimensions}</p>
              </div>

              <div>
                <h4 className="font-medium mb-1">Materials</h4>
                <p className="text-gray-600">{item.materials}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Features</h4>
                <ul className="space-y-1">
                  {item.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                className="flex-1 bg-estate-800 hover:bg-estate-700"
                onClick={() => {
                  onAddToCart(item.id);
                  onClose();
                }}
                disabled={!item.inStock}
              >
                {item.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FurnitureDetailsModal;
