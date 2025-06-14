
import React from "react";
import { ShoppingCart } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { furnitureCategories } from "@/data/furnitureCategories";

interface FurnitureCartProps {
  cartItems: string[];
}

const FurnitureCart: React.FC<FurnitureCartProps> = ({ cartItems }) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline" className="relative" data-sheet-trigger="true">
        <ShoppingCart className="mr-2 h-4 w-4" />
        Cart
        {cartItems.length > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-estate-600">{cartItems.length}</Badge>
        )}
      </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
        <SheetDescription>
          {cartItems.length > 0 ? 
            `You have ${cartItems.length} items in your cart` : 
            "Your cart is empty"}
        </SheetDescription>
      </SheetHeader>
      {cartItems.length > 0 && (
        <div className="mt-6">
          <ul className="space-y-4">
            {cartItems.map((itemId, index) => {
              const item = furnitureCategories.flatMap(cat => cat.items).find(i => i.id === itemId);
              return (
                <li key={index} className="flex justify-between items-center border-b pb-2">
                  <span>{item?.name}</span>
                  <span className="font-medium">{item?.price}</span>
                </li>
              );
            })}
          </ul>
          <Button className="mt-6 w-full bg-estate-800 hover:bg-estate-700">
            Checkout
          </Button>
        </div>
      )}
    </SheetContent>
  </Sheet>
);

export default FurnitureCart;
