
import React, { useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { furnitureCategories } from "@/data/furnitureCategories";
import FurnitureSearchBar from "@/components/furniture/FurnitureSearchBar";
import FurnitureCart from "@/components/furniture/FurnitureCart";
import FurnitureServiceSheet from "@/components/furniture/FurnitureServiceSheet";
import FurnitureTabs from "@/components/furniture/FurnitureTabs";
import FurnitureServiceCard from "@/components/furniture/FurnitureServiceCard";
import { toast } from "@/hooks/use-toast";

// Main Furniture Page Refactored

const Furniture = () => {
  const [selectedCategory, setSelectedCategory] = useState("living");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<string[]>([]);
  const serviceTriggerRef = useRef<HTMLButtonElement>(null);

  const handleAddToCart = (itemId: string) => {
    setCartItems([...cartItems, itemId]);
    toast({
      title: "Added to cart",
      description: "Item has been added to your cart",
    });
  };

  // Filter items based on search
  const filteredItems = furnitureCategories
    .find(cat => cat.id === selectedCategory)?.items
    .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())) || [];

  // Clicking the sidebar button triggers the request service sheet
  const handleScheduleService = () => {
    // Find the first element with data-sheet-trigger="true"
    const triggerEl = document.querySelector('[data-sheet-trigger="true"]');
    if (
      triggerEl &&
      "click" in triggerEl &&
      typeof (triggerEl as HTMLElement).click === "function"
    ) {
      (triggerEl as HTMLElement).click();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-display text-estate-800 mb-4">
            Home Furniture Collection
          </h1>
          <p className="text-estate-500 text-lg">
            Browse our curated selection of premium furniture to transform your home
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-full md:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <FurnitureSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              <div className="flex items-center gap-2">
                <FurnitureCart cartItems={cartItems} />
                <FurnitureServiceSheet />
              </div>
            </div>
            <FurnitureTabs
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              filteredItems={filteredItems}
              handleAddToCart={handleAddToCart}
            />
          </div>
          <div className="w-full md:w-1/4">
            <FurnitureServiceCard onScheduleService={handleScheduleService} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Furniture;
