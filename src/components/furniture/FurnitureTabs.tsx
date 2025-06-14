
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { furnitureCategories } from "@/data/furnitureCategories";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"; // neutral stock

interface FurnitureTabsProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  filteredItems: any[];
  handleAddToCart: (id: string) => void;
}

const FurnitureTabs: React.FC<FurnitureTabsProps> = ({
  selectedCategory,
  setSelectedCategory,
  filteredItems,
  handleAddToCart,
}) => {
  // Helper to append cache-busting param
  const appendCacheBuster = (url: string) =>
    url.includes("?") ? `${url}&cb=${Date.now()}` : `${url}?cb=${Date.now()}`;

  return (
    <Tabs defaultValue={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
      <TabsList className="w-full justify-start mb-4 overflow-x-auto flex-nowrap">
        {furnitureCategories.map((category) => (
          <TabsTrigger key={category.id} value={category.id} className="flex items-center">
            <category.icon className="mr-2 h-4 w-4" />
            <span>{category.name}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      {furnitureCategories.map((category) => (
        <TabsContent key={category.id} value={category.id} className="mt-4">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    <img
                      src={appendCacheBuster(item.image)}
                      alt={item.name}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        // handle error and log
                        console.warn("Image failed to load:", item.image);
                        (e.currentTarget as HTMLImageElement).src = FALLBACK_IMG;
                      }}
                      onLoad={() => {
                        console.log("Image loaded:", item.image);
                      }}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-medium text-estate-800">{item.price}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" className="w-1/2 mr-2">
                      Details
                    </Button>
                    <Button
                      className="w-1/2 bg-estate-800 hover:bg-estate-700"
                      onClick={() => handleAddToCart(item.id)}
                    >
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-estate-500">No furniture items match your search.</p>
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default FurnitureTabs;

